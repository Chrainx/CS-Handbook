'use client'

type Props = {
  stack: string[]
}

export default function StackView({ stack }: Props) {
  if (!stack || stack.length === 0) {
    return (
      <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
        Stack is empty
      </div>
    )
  }

  return (
    <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="mb-2 text-sm font-medium text-foreground">
        Stack (Top → Bottom)
      </div>

      <div className="flex gap-2">
        {[...stack].reverse().map((item, index) => (
          <div
            key={index}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground font-semibold shadow-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
