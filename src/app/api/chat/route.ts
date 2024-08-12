import { streamText, StreamData } from 'ai'
import { getModel } from '@/global/model'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const data = new StreamData()
  data.append({ test: 'value' })

  const result = await streamText({
    model: getModel(),
    messages,
    onFinish() {
      data.close()
    }
  })

  return result.toDataStreamResponse({ data })
}
