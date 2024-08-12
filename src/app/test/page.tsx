'use client'

export default function Test() {
  const handleClick = async () => {
    const result = await fetch('/api/obj?food=apple')
    // console.log(await fetch('/api/node'))
    console.log(await result.json())
  }

  return (
    <button type="button" onClick={handleClick}>
      你好
    </button>
  )
}
