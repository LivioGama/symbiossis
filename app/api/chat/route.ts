import CommunicationAdapter from '@/lib/adapters/CommunicationAdapter'
import {getOllamaProvider} from '@/lib/helpers/getOllamaProvider'
import {getSystemInstructionsFor} from '@/lib/helpers/personality'
import therapeuticCore from '@/lib/models/TherapeuticCore'
import {isDev} from '@/models/consts'
import {convertToModelMessages, streamText, UIMessage} from 'ai'

export const maxDuration = 120

export const POST = async (req: Request) => {
  try {
    const {messages, selectedType = null}: {messages: UIMessage[]; selectedType?: string | null} =
      await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({error: 'Messages array is required'}), {
        status: 400,
        headers: {'Content-Type': 'application/json'},
      })
    }

    const {provider, model, isOffline} = await getOllamaProvider()
    console.log(
      '🚀 Starting chat with mode:',
      isOffline ? 'OFFLINE' : 'ONLINE-TURBO',
      'Model:',
      model,
    )

    let systemPrompt
    let result

    if (selectedType) {
      const userInput = (messages[messages.length - 1] as any)?.content || ''

      const problemAnalysis = therapeuticCore.analyzeProblem(userInput)
      const baseResponse = therapeuticCore.generateResponse(problemAnalysis, selectedType)

      const archetype = CommunicationAdapter.getArchetypeFromMBTI(selectedType)
      const adapter = new CommunicationAdapter()
      const adaptedResponse = adapter.adaptResponse(baseResponse.content, archetype)

      systemPrompt = 'Respond with the following: ' + adaptedResponse.content
      systemPrompt = getSystemInstructionsFor(selectedType) //new system
      if (isDev) console.log(systemPrompt)
      result = streamText({
        model: provider(model),
        system: systemPrompt,
        messages: convertToModelMessages(messages),
        temperature: 0.5,
      })
    } else {
      systemPrompt =
        'You are a thoughtful AI companion focused on self-reflection and personal growth. Provide empathetic, insightful responses that help users understand themselves better and develop actionable strategies for their challenges.'
      result = streamText({
        model: provider(model),
        system: systemPrompt,
        messages: convertToModelMessages(messages),
        temperature: 0.5,
      })
    }

    return result.toUIMessageStreamResponse({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'X-Ollama-Mode': isOffline ? 'offline' : 'online-turbo',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to generate response',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  }
}
