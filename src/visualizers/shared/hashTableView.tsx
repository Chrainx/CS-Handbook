'use client'

import { Entry } from '@/visualizers/hashTable/steps'

function ChainNode({ entryKey, value }: { entryKey: string; value: string }) {
  return (
    <div className="ds-pop-in flex h-10 shrink-0 overflow-hidden rounded-md shadow-sm">
      <div className="flex items-center justify-center bg-accent px-2 font-mono text-xs font-semibold text-accent-foreground">
        {entryKey}
      </div>
      <div className="flex items-center justify-center border-l border-border/60 bg-accent-soft px-2 font-mono text-xs text-accent">
        {value}
      </div>
      <div className="flex h-10 w-5 items-center justify-center border-l border-border/60 bg-muted text-muted-foreground">
        •
      </div>
    </div>
  )
}

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

      {/* Bucket-level view: an array of slots, each slot a small linked
       * list (separate chaining) - the same key|value|next node style the
       * Linked List visualizer uses, so a bucket with a collision reads
       * exactly like a chain of nodes ending in NULL. */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="mb-3 text-sm font-medium text-foreground">
          Buckets ({buckets.length}) - array of chains, separate chaining
        </div>

        <div className="space-y-2">
          {buckets.map((bucket, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                  index === highlightIndex
                    ? 'bg-state-active text-white ring-2 ring-state-active ring-offset-1 ring-offset-card'
                    : 'border border-border bg-muted text-muted-foreground'
                }`}
              >
                {index}
              </div>
              <span className="shrink-0 text-muted-foreground">→</span>

              {bucket.length === 0 ? (
                <span className="shrink-0 rounded-md border border-dashed border-border px-2 py-1 text-xs text-muted-foreground">
                  NULL
                </span>
              ) : (
                <div className="flex items-center gap-1">
                  {bucket.map((entry, i) => (
                    <div key={entry.key} className="flex items-center gap-1">
                      <ChainNode entryKey={entry.key} value={entry.value} />
                      <span className="shrink-0 text-muted-foreground">→</span>
                      {i === bucket.length - 1 && (
                        <span className="shrink-0 rounded-md border border-dashed border-border px-2 py-1 text-xs text-muted-foreground">
                          NULL
                        </span>
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
