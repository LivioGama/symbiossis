const checkOllamaConnection = async () => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 500)

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
        options: {num_predict: 1},
      }),
    })

    if (!testResponse.ok) {
      throw new Error(`Model test failed (status: ${testResponse.status})`)
    }

    clearTimeout(timeoutId)
    return {isOffline: true, mode: 'offline'}
  } catch (error) {
    return {isOffline: false, mode: 'online-turbo'}
  }
}

export const GET = async () => {
  const {isOffline, mode} = await checkOllamaConnection()

  return new Response(JSON.stringify({isOffline, mode}), {
    headers: {
      'Content-Type': 'application/json',
      'X-Ollama-Mode': mode,
      'Access-Control-Allow-Origin': '*',
    },
  })
}
