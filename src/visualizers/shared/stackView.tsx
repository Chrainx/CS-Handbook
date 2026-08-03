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

  const topIndex = stack.length - 1

  return (
    <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="mb-3 text-sm font-medium text-foreground">
        Stack - push/pop only ever touch the <span className="text-accent">top</span>
      </div>

      <div className="flex flex-col items-center">
        {/* boxes, stacked bottom (index 0) to top (last index) */}
        <div className="flex flex-col-reverse items-center gap-1">
          {stack.map((value, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`ds-pop-in relative flex h-12 w-28 items-center justify-center overflow-hidden rounded-lg font-semibold shadow-sm ${
                  i === topIndex
                    ? 'bg-accent text-accent-foreground ring-2 ring-accent ring-offset-1 ring-offset-card'
                    : 'border border-border bg-muted text-foreground'
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-white/0 to-black/5" />
                <span className="relative">{value}</span>
              </div>
              {i === topIndex && (
                <span className="text-xs font-semibold text-accent">
                  ← top (push/pop here)
                </span>
              )}
            </div>
          ))}
        </div>

        {/* floor */}
        <div className="mt-1 h-1.5 w-32 rounded-full bg-border" />
      </div>
    </div>
  )
}
