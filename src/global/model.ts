import { createOpenRouter } from '@openrouter/ai-sdk-provider'

/**
 * 获取模型
 */
export const getModel = (model = 'meta-llama/llama-3.1-8b-instruct:free') => {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY
  })
  return openrouter(model)
}
