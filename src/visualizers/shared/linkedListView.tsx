'use client'

export default function LinkedListView({
  list,
  highlightValue,
}: {
  list: number[]
  highlightValue?: number | null
}) {
  if (list.length === 0) {
    return (
      <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
        List is empty
      </div>
    )
  }

  return (
    <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="mb-2 text-sm font-medium text-foreground">
        Linked List (Head → Tail)
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {list.map((value, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="flex flex-col items-center gap-1">
              {index === 0 && (
                <span className="text-xs text-muted-foreground">head</span>
              )}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-md font-semibold shadow-sm ${
                  value === highlightValue
                    ? 'bg-state-active text-white'
                    : 'bg-accent text-accent-foreground'
                }`}
              >
                {value}
              </div>
            </div>
            <span className="text-muted-foreground">→</span>
          </div>
        ))}

        <span className="rounded-md border border-dashed border-border px-2 py-1 text-xs text-muted-foreground">
          NULL
        </span>
      </div>
    </div>
  )
}
