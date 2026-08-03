'use client'

function NodeBox({
  value,
  variant = 'default',
}: {
  value: number
  variant?: 'default' | 'cursor' | 'target' | 'pending'
}) {
  const valueClasses =
    variant === 'target'
      ? 'bg-state-compare text-white'
      : variant === 'pending'
        ? 'bg-card text-foreground'
        : 'bg-accent text-accent-foreground'

  return (
    <div
      className={`ds-pop-in flex overflow-hidden rounded-md shadow-sm ${
        variant === 'cursor' ? 'ring-2 ring-state-active ring-offset-1' : ''
      } ${variant === 'pending' ? 'border border-dashed border-border' : ''}`}
    >
      {/* value cell */}
      <div
        className={`flex h-10 w-10 items-center justify-center font-semibold ${valueClasses}`}
      >
        {value}
      </div>
      {/* pointer cell - the node's "next" field */}
      <div className="flex h-10 w-6 items-center justify-center border-l border-border/60 bg-muted text-muted-foreground">
        •
      </div>
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
          <NodeBox value={pendingNode} variant="pending" />
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
            <div key={index} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-1">
                {index === 0 && (
                  <span className="text-xs text-muted-foreground">head</span>
                )}
                <NodeBox
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
              <span className="text-muted-foreground">→</span>
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
