'use client'

import { PriorityQueueProps } from './types'

export default function PriorityQueueView({
  items,
  activeNode,
}: PriorityQueueProps) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3 mb-4 shadow-sm">
      <div className="mb-2 text-sm font-semibold text-foreground">
        Priority Queue
      </div>

      <div className="space-y-1">
        {items.length === 0 && (
          <div className="text-xs text-muted-foreground italic">empty</div>
        )}

        {items.map((item, i) => {
          const isActive = item.node === activeNode

          return (
            <div
              key={`${item.node}-${i}`}
              className={`
                flex justify-between rounded-md px-2 py-1 text-sm transition-colors
                ${
                  isActive
                    ? 'bg-accent-soft font-semibold text-accent border-l-2 border-accent'
                    : 'bg-muted text-foreground'
                }
                ${item.stale ? 'opacity-40 line-through' : ''}
              `}
            >
              <span>{item.node}</span>
              <span>{item.priority}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
