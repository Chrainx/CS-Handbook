import { hashKey, TABLE_SIZE } from './hash'

export type Entry = { key: string; value: string }

export type HashTableStep =
  | { type: 'hash'; key: string; index: number }
  | {
      type: 'insert'
      index: number
      key: string
      value: string
      kind: 'fresh' | 'collision' | 'update'
    }
  | { type: 'delete'; index: number; key: string; found: boolean }

export function emptyBuckets(): Entry[][] {
  return Array.from({ length: TABLE_SIZE }, () => [])
}

/** Pure - `buckets` is treated as read-only. */
export function hashTableInsertSteps(
  buckets: Entry[][],
  key: string,
  value: string
): HashTableStep[] {
  const index = hashKey(key)
  const bucket = buckets[index]
  const existing = bucket.some((e) => e.key === key)

  const kind: 'fresh' | 'collision' | 'update' = existing
    ? 'update'
    : bucket.length > 0
      ? 'collision'
      : 'fresh'

  return [
    { type: 'hash', key, index },
    { type: 'insert', index, key, value, kind },
  ]
}

/** Pure - `buckets` is treated as read-only. */
export function hashTableDeleteSteps(
  buckets: Entry[][],
  key: string
): HashTableStep[] {
  const index = hashKey(key)
  const found = buckets[index].some((e) => e.key === key)

  return [
    { type: 'hash', key, index },
    { type: 'delete', index, key, found },
  ]
}

export function describeHashTableStep(step: HashTableStep): string {
  switch (step.type) {
    case 'hash':
      return `Hashed key "${step.key}" to bucket ${step.index}.`
    case 'insert':
      switch (step.kind) {
        case 'update':
          return `Key "${step.key}" already exists in bucket ${step.index}; updated its value.`
        case 'collision':
          return `Bucket ${step.index} was already occupied; chained "${step.key}" onto it.`
        case 'fresh':
          return `Inserted "${step.key}" into empty bucket ${step.index}.`
      }
      break
    case 'delete':
      return step.found
        ? `Removed "${step.key}" from bucket ${step.index}.`
        : `"${step.key}" was not found in bucket ${step.index} - nothing to delete.`
  }
}
