import {GPT_OSS_120B_MODEL, GPT_OSS_20B_MODEL} from '@/models/consts'
import {createOllama} from 'ollama-ai-provider-v2'

export const getOllamaProvider = async () => {
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
    const hasGptOssRunning = psData.models?.some((model: any) => model.name?.includes('gpt-oss'))

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
        model: GPT_OSS_20B_MODEL,
        prompt: 'test',
        stream: false,
        options: {num_predict: 1}, // Very short response
      }),
    })

    if (!testResponse.ok) {
      throw new Error(`Model test failed (status: ${testResponse.status})`)
    }

    const localProvider = createOllama()
    return {provider: localProvider, model: GPT_OSS_20B_MODEL, isOffline: true}
  } catch {
    // Local Ollama not available, switch to online
    const cloudProvider = createOllama({
      baseURL: 'https://ollama.com/api',
      headers: {
        Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
      },
    })
    return {provider: cloudProvider, model: GPT_OSS_120B_MODEL, isOffline: false}
  }
}
