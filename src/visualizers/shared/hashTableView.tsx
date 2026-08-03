'use client'

import { Entry } from '@/visualizers/hashTable/steps'

function DrawerTab({ entryKey, value }: { entryKey: string; value: string }) {
  return (
    <span className="ds-pop-in rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground shadow-sm">
      {entryKey}: {value}
    </span>
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

      {/* Bucket-level view: each bucket is a drawer - a labeled index,
       * a handle, and a tab sticking out for every chained entry - so a
       * bucket with a collision reads as "this drawer has two things in
       * it" rather than needing the linked-list chain metaphor repeated
       * here too. */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="mb-3 text-sm font-medium text-foreground">
          Buckets ({buckets.length})
        </div>

        <div className="flex flex-col gap-2">
          {buckets.map((bucket, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 rounded-lg border px-3.5 py-2 transition-colors ${
                index === highlightIndex
                  ? 'border-accent bg-accent-soft'
                  : 'border-border bg-muted'
              }`}
            >
              <span className="w-4 shrink-0 font-mono text-xs font-bold text-muted-foreground">
                {index}
              </span>
              <span className="h-1.5 w-7 shrink-0 rounded bg-border-strong" />

              {bucket.length === 0 ? (
                <span className="text-xs italic text-muted-foreground">
                  empty
                </span>
              ) : (
                <div className="flex flex-wrap items-center gap-1.5">
                  {bucket.map((entry) => (
                    <DrawerTab
                      key={entry.key}
                      entryKey={entry.key}
                      value={entry.value}
                    />
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
