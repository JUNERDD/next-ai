'use client'

import { type CoreMessage } from 'ai'
import { useState } from 'react'
import { continueConversation } from './actions'
import { readStreamableValue } from 'ai/rsc'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([])
  const [input, setInput] = useState('')
  const [data, setData] = useState<any>()
  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {messages.map((m, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content as string}
        </div>
      ))}

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const newMessages: CoreMessage[] = [...messages, { content: input, role: 'user' }]

          setMessages(newMessages)
          setInput('')

          const result = await continueConversation(newMessages)
          setData(result.data)

          for await (const content of readStreamableValue(result.message)) {
            setMessages([
              ...newMessages,
              {
                role: 'assistant',
                content: content as string
              }
            ])
          }
        }}
      >
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded-md border p-2 shadow-xl"
          value={input}
          placeholder="说点什么..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  )
}
