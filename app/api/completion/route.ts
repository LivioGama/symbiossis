import CommunicationAdapter from '@/lib/adapters/CommunicationAdapter'
import therapeuticCore from '@/lib/models/TherapeuticCore'
import {streamText} from 'ai'
import {createOllama} from 'ollama-ai-provider-v2'

const getOllamaProvider = async () => {
  // Only use local Ollama for 100% privacy
  try {
    const localProvider = createOllama({
      baseURL: 'http://localhost:11434/api',
    })
    // Test if local Ollama is available and has gpt-oss model
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 500) // 0.5 second timeout

    // Check if Ollama is running and has gpt-oss model loaded
    const psResponse = await fetch('http://localhost:11434/api/ps', {
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!psResponse.ok) {
      throw new Error(`Local Ollama not responding (status: ${psResponse.status})`)
    }

    const psData = await psResponse.json()

    // Check if gpt-oss model is currently running/loaded
    const hasGptOssRunning = psData.models?.some(
      (model: any) => model.name?.includes('gpt-oss') || model.name?.includes('gpt2')
    )

    if (!hasGptOssRunning) {
      throw new Error('gpt-oss model not currently loaded/running')
    }

    // Verify the model can actually be used by making a test call
    const testResponse = await fetch('http://localhost:11434/api/generate', {
      signal: controller.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-oss:20b',
        prompt: 'test',
        stream: false,
        options: {num_predict: 1}, // Very short response
      }),
    })

    if (!testResponse.ok) {
      throw new Error(`Model test failed (status: ${testResponse.status})`)
    }

    clearTimeout(timeoutId)

    return {provider: localProvider, model: 'gpt-oss:20b', isOffline: true}
  } catch (error) {
    // Local Ollama not available, switch to online Ollama Turbo
    const cloudProvider = createOllama({
      baseURL: 'https://ollama.com/api',
      headers: {
        Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
      },
    })
    return {provider: cloudProvider, model: 'gpt-oss:120b', isOffline: false}
  }
}

export const runtime = 'edge'

export const POST = async (req: Request) => {
  try {
    const {messages, selectedType = null} = await req.json()
    const {provider, model, isOffline} = await getOllamaProvider()

    // Use therapeutic core for personality-specific responses
    if (selectedType) {
      const userInput = messages[messages.length - 1]?.content || ''

      // Generate therapeutic response using two-part architecture
      const problemAnalysis = therapeuticCore.analyzeProblem(userInput, [])
      const baseResponse = therapeuticCore.generateResponse(problemAnalysis, selectedType)

      // Adapt communication style
      const archetype = CommunicationAdapter.getArchetypeFromMBTI(selectedType)
      const adapter = new CommunicationAdapter()
      const adaptedResponse = adapter.adaptResponse(baseResponse.content, archetype)

      // Return therapeutic response directly
      return new Response(adaptedResponse.content, {
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'X-Ollama-Mode': isOffline ? 'offline' : 'online-turbo',
        },
      })
    }

    // Fallback to AI model for generic responses
    const systemPrompt =
      'You are a thoughtful AI companion focused on self-reflection and personal growth. Provide empathetic, insightful responses that help users understand themselves better and develop actionable strategies for their challenges.'
    const formattedMessages = [{role: 'system', content: systemPrompt}, ...messages]

    const result = await streamText({
      model: provider(model) as any,
      messages: formattedMessages,
      temperature: 0.5,
    })

    return result.toTextStreamResponse({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'X-Ollama-Mode': isOffline ? 'offline' : 'online-turbo',
      },
    })
  } catch (error) {
    console.error('❌ API Route Error:', error)
    return new Response(
      JSON.stringify({
        error: 'An error occurred',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
}
