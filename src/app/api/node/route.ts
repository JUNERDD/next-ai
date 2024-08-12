import { getModel } from '@/global/model'
import { streamText } from 'ai'

export async function GET(req: Request) {
  const result = await streamText({
    model: getModel(),
    prompt: 'Hello, how are you?',
    onFinish(e) {
      console.log(e)
    }
  })

  const reader = result.textStream.getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }

    process.stdout.write(value)
  }

  return Response.json({ done: true })
}
