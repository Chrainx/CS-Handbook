'use client'

import { PriorityQueueProps } from './types'

export default function PriorityQueueView({
  items,
  activeNode,
}: PriorityQueueProps) {
  const staleCount = items.filter((item) => item.stale).length
  const minIndex = items.findIndex((item) => !item.stale)

  return (
    <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="mb-2 text-sm font-semibold text-foreground">
        Priority Queue
      </div>

      {items.length === 0 ? (
        <div className="text-xs italic text-muted-foreground">empty</div>
      ) : (
        <>
          {/* Sorted by priority and wrapped horizontally instead of one
           * row per push, with a fixed max-height and its own scrollbar -
           * this can never grow to dominate the page, however many
           * entries a dense graph pushes through it. */}
          <div className="flex max-h-[168px] flex-wrap content-start gap-1.5 overflow-y-auto p-0.5">
            {items.map((item, i) => {
              const isMin = i === minIndex
              const isActive = item.node === activeNode

              return (
                <div
                  key={`${item.node}-${i}`}
                  className={`ds-pop-in flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm transition-colors ${
                    isMin
                      ? 'border-accent bg-accent-soft text-accent'
                      : 'border-border bg-muted text-foreground'
                  } ${isActive ? 'ring-2 ring-state-active ring-offset-1 ring-offset-card' : ''} ${
                    item.stale ? 'opacity-45 line-through' : ''
                  }`}
                >
                  <span className="font-semibold">{item.node}</span>
                  <span className="font-mono text-muted-foreground">
                    {item.priority}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>
              {items.length} {items.length === 1 ? 'entry' : 'entries'}
              {staleCount > 0 ? `, ${staleCount} stale` : ''}
            </span>
            <span>sorted by priority</span>
          </div>
        </>
      )}
    </div>
  )
}
