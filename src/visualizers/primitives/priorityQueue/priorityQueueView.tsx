'use client'

import { PriorityQueueProps } from './types'

export default function PriorityQueueView({
  items,
  activeNode,
}: PriorityQueueProps) {
  return (
    <div className="rounded border bg-gray-50 px-4 py-3 mb-4 ">
      <div className="mb-2 text-sm font-semibold">Priority Queue</div>

      <div className="space-y-1">
        {items.length === 0 && (
          <div className="text-xs text-gray-400 italic">empty</div>
        )}

        {items.map((item, i) => {
          const isActive = item.node === activeNode

          return (
            <div
              key={`${item.node}-${i}`}
              className={`
                flex justify-between rounded px-2 py-1 text-sm
                ${isActive ? 'bg-purple-200 font-semibold' : 'bg-white'}
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
