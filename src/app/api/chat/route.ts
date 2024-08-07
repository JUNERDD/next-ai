import { streamText, StreamData } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

export async function POST(req: Request) {
  const { messages } = await req.json();

  const data = new StreamData();
  data.append({ test: 'value' });

  const result = await streamText({
    model: openrouter('openai/gpt-3.5-turbo'),
    messages,
    onFinish() {
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}