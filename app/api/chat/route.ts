import {streamText} from 'ai'
import {NextRequest, NextResponse} from 'next/server'
import {createOllama} from 'ollama-ai-provider-v2'

const getOllamaProvider = async () => {
  // Default to offline: try local Ollama first
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 500) // 0.5 second timeout

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

    clearTimeout(timeoutId)

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

    const localProvider = createOllama({
      baseURL: 'http://localhost:11434/api',
    })
    return {provider: localProvider, model: 'gpt-oss:20b', isOffline: true}
  } catch (error) {
    // Local Ollama not available, switch to online

    const cloudProvider = createOllama({
      baseURL: 'https://ollama.com/api',
      headers: {
        Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
      },
    })
    return {provider: cloudProvider, model: 'gpt-oss:120b', isOffline: false}
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {messages, model: requestedModel} = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({error: 'Messages array is required'}, {status: 400})
    }

    const {provider, model, isOffline} = await getOllamaProvider()

    const result = await streamText({
      model: provider(requestedModel || model),
      messages: messages,
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
    console.error('Chat API error:', error)

    return NextResponse.json(
      {
        error: 'Failed to generate response',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      {status: 500}
    )
  }
}
