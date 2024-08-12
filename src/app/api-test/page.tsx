'use client'

import { useChat } from 'ai/react'

export default function ApiTest() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat()
  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded-md border p-2 shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
