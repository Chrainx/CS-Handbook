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
    <div className="mb-4 rounded border bg-gray-50 px-4 py-3">
      <div className="mb-2 text-sm font-semibold">Sorted Edges (by weight)</div>

      <div className="space-y-1 text-sm font-mono">
        {edges.map((e, i) => {
          const isActive = i === activeIndex
          const isPast = activeIndex !== null && i < activeIndex

          return (
            <div
              key={`${e.from}-${e.to}-${i}`}
              className={`
                flex justify-between rounded px-2 py-1
                ${isActive ? 'bg-purple-200 font-semibold' : ''}
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
