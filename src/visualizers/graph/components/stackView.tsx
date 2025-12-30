'use client'

type Props = {
  stack: string[]
}

export default function StackView({ stack }: Props) {
  if (!stack || stack.length === 0) {
    return (
      <div className="mb-4 rounded border bg-gray-50 px-4 py-3 text-sm text-gray-500">
        Stack is empty
      </div>
    )
  }

  return (
    <div className="mb-4 rounded border bg-gray-50 px-4 py-3">
      <div className="mb-2 text-sm font-medium text-gray-700">
        Stack (Top → Bottom)
      </div>

      <div className="flex gap-2">
        {[...stack].reverse().map((item, index) => (
          <div
            key={index}
            className="flex h-10 w-10 items-center justify-center rounded border bg-purple-500 text-white font-semibold"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
