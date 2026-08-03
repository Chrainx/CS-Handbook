'use client'

export default function QueueView({ queue }: { queue: string[] }) {
  return (
    <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm">
      <div className="mb-1 font-medium text-foreground">Queue</div>

      <div className="flex items-center gap-2">
        {queue.length === 0 && (
          <span className="text-muted-foreground">empty</span>
        )}

        {queue.map((node, index) => (
          <div
            key={index}
            className="rounded-md bg-accent-soft px-2 py-1 font-medium text-accent"
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  )
}
