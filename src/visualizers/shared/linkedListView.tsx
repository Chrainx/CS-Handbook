'use client'

function ChainBead({
  value,
  variant = 'default',
}: {
  value: number
  variant?: 'default' | 'cursor' | 'target' | 'pending'
}) {
  const variantClasses =
    variant === 'target'
      ? 'bg-state-compare text-white border-state-compare'
      : variant === 'pending'
        ? 'border-2 border-dashed border-border-strong bg-card text-foreground shadow-none'
        : variant === 'cursor'
          ? 'bg-accent text-accent-foreground ring-2 ring-state-active ring-offset-1 ring-offset-card border-transparent'
          : 'bg-accent text-accent-foreground border-transparent'

  return (
    <div
      className={`ds-pop-in flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] font-bold shadow-sm ${
        variant === 'pending' ? '' : 'shadow-[inset_0_-4px_6px_rgba(0,0,0,0.12)]'
      } ${variantClasses}`}
    >
      {value}
    </div>
  )
}

function ChainLink() {
  return (
    <div className="relative h-1.5 w-5 shrink-0 bg-border-strong">
      <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
        ▸
      </span>
    </div>
  )
}

export default function LinkedListView({
  list,
  highlightValue,
  cursorIndex = null,
  targetIndex = null,
  pendingNode = null,
}: {
  list: number[]
  highlightValue?: number | null
  cursorIndex?: number | null
  targetIndex?: number | null
  pendingNode?: number | null
}) {
  return (
    <div className="mb-4 space-y-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="text-sm font-medium text-foreground">
        Linked List (Head → Tail)
      </div>

      {pendingNode !== null && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">new node:</span>
          <ChainBead value={pendingNode} variant="pending" />
          <span className="text-xs text-muted-foreground">
            (not yet linked into the list)
          </span>
        </div>
      )}

      {list.length === 0 ? (
        <span className="text-sm text-muted-foreground">List is empty</span>
      ) : (
        <div className="flex flex-wrap items-center gap-1">
          {list.map((value, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                {index === 0 && (
                  <span className="text-xs text-muted-foreground">head</span>
                )}
                <ChainBead
                  value={value}
                  variant={
                    index === targetIndex
                      ? 'target'
                      : index === cursorIndex ||
                          (highlightValue !== null &&
                            highlightValue !== undefined &&
                            value === highlightValue)
                        ? 'cursor'
                        : 'default'
                  }
                />
              </div>
              <ChainLink />
            </div>
          ))}

          <span className="rounded-md border border-dashed border-border px-2 py-1 text-xs text-muted-foreground">
            NULL
          </span>
        </div>
      )}
    </div>
  )
}
