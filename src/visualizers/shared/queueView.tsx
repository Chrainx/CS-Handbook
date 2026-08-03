'use client'

const BOX_WIDTH = 48

export default function QueueView({ queue }: { queue: string[] }) {
  if (queue.length === 0) {
    return (
      <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
        Queue is empty
      </div>
    )
  }

  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="mb-3 text-sm font-medium text-foreground">
        Queue - array-based, <code className="text-xs">front</code> leaves
        first
      </div>

      <div className="inline-flex flex-col">
        {/* front/rear pointer row */}
        <div className="flex">
          {queue.map((_, i) => (
            <div
              key={i}
              style={{ width: BOX_WIDTH }}
              className="flex h-5 shrink-0 items-end justify-center gap-1"
            >
              {i === 0 && (
                <span className="text-xs font-semibold text-accent">
                  ▼ front
                </span>
              )}
              {i === queue.length - 1 && queue.length > 1 && (
                <span className="text-xs font-semibold text-accent">
                  ▼ rear
                </span>
              )}
              {i === 0 && queue.length === 1 && (
                <span className="text-xs font-semibold text-accent">
                  ▼ front/rear
                </span>
              )}
            </div>
          ))}
        </div>

        {/* value cells */}
        <div className="flex">
          {queue.map((value, i) => (
            <div key={i} style={{ width: BOX_WIDTH }} className="shrink-0 px-0.5">
              <div
                className={`ds-pop-in relative flex h-12 items-center justify-center overflow-hidden rounded-lg font-semibold shadow-sm ${
                  i === 0
                    ? 'bg-accent text-accent-foreground ring-2 ring-accent ring-offset-1 ring-offset-card'
                    : 'border border-border bg-muted text-foreground'
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-white/0 to-black/5" />
                <span className="relative">{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* index labels */}
        <div className="mt-1 flex">
          {queue.map((_, i) => (
            <div
              key={i}
              style={{ width: BOX_WIDTH }}
              className="shrink-0 text-center text-[10px] text-muted-foreground"
            >
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
