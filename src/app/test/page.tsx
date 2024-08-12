'use client'

export default function Test() {
  const handleClick = () => {
    fetch('/api/node')
  }

  return (
    <button type="button" onClick={handleClick}>
      你好
    </button>
  )
}
