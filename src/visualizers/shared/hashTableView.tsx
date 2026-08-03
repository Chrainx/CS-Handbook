'use client'

import { Entry } from '@/visualizers/hashTable/steps'

export default function HashTableView({
  buckets,
  highlightIndex,
}: {
  buckets: Entry[][]
  highlightIndex: number | null
}) {
  return (
    <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <div className="mb-2 text-sm font-medium text-foreground">
        Hash Table ({buckets.length} buckets)
      </div>

      <div className="space-y-2">
        {buckets.map((bucket, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
                index === highlightIndex
                  ? 'bg-state-active text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index}
            </div>

            {bucket.length === 0 ? (
              <span className="text-xs text-muted-foreground">empty</span>
            ) : (
              <div className="flex flex-wrap items-center gap-1">
                {bucket.map((entry, i) => (
                  <div key={entry.key} className="flex items-center gap-1">
                    <div className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                      {entry.key}: {entry.value}
                    </div>
                    {i < bucket.length - 1 && (
                      <span className="text-muted-foreground">→</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
