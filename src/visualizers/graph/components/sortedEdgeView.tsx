'use client'

type Edge = {
  from: string
  to: string
  weight: number
}

type SortedEdgesViewProps = {
  edges: Edge[]
  activeIndex: number | null
}

export default function SortedEdgesView({
  edges,
  activeIndex,
}: SortedEdgesViewProps) {
  return (
    <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="mb-2 text-sm font-semibold text-foreground">
        Sorted Edges (by weight)
      </div>

      <div className="space-y-1 text-sm font-mono">
        {edges.map((e, i) => {
          const isActive = i === activeIndex
          const isPast = activeIndex !== null && i < activeIndex

          return (
            <div
              key={`${e.from}-${e.to}-${i}`}
              className={`
                flex justify-between rounded-md px-2 py-1 text-foreground transition-colors
                ${
                  isActive
                    ? 'bg-accent-soft font-semibold text-accent border-l-2 border-accent'
                    : 'bg-muted'
                }
                ${isPast ? 'opacity-50' : ''}
              `}
            >
              <span>
                {e.from} — {e.to}
              </span>
              <span>{e.weight}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
