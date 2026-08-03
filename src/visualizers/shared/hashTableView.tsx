'use client'

import { Entry } from '@/visualizers/hashTable/steps'

export default function HashTableView({
  buckets,
  highlightIndex,
}: {
  buckets: Entry[][]
  highlightIndex: number | null
}) {
  const allEntries = buckets.flatMap((bucket, index) =>
    bucket.map((entry) => ({ ...entry, bucketIndex: index }))
  )

  return (
    <div className="mb-4 space-y-4">
      {/* Conventional "map" view: every entry currently stored, in bucket
       * order, so the table's contents read like a normal key -> value
       * list rather than only as buckets. */}
      <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="mb-2 text-sm font-medium text-foreground">
          Entries ({allEntries.length})
        </div>

        {allEntries.length === 0 ? (
          <span className="text-xs text-muted-foreground">
            No entries yet - insert a key/value pair below.
          </span>
        ) : (
          <ul className="space-y-1">
            {allEntries.map((entry) => (
              <li
                key={entry.key}
                className={`ds-pop-in flex items-center gap-2 rounded-md px-2 py-1 text-sm ${
                  entry.bucketIndex === highlightIndex
                    ? 'bg-state-active/20 text-foreground'
                    : 'text-foreground'
                }`}
              >
                <span className="font-mono font-medium">{entry.key}</span>
                <span className="text-muted-foreground">→</span>
                <span className="font-mono">{entry.value}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  bucket {entry.bucketIndex}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bucket-level view: shows *why* each entry landed where it did,
       * including collisions chained within the same bucket. */}
      <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="mb-2 text-sm font-medium text-foreground">
          Buckets ({buckets.length})
        </div>

        <div className="space-y-2">
          {buckets.map((bucket, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold transition-colors ${
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
                      <div className="ds-pop-in rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
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
    </div>
  )
}
