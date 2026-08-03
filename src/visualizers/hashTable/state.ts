import { Entry, HashTableStep, emptyBuckets } from './steps'

export type HashTableVisualState = {
  buckets: Entry[][]
  highlightIndex: number | null
}

export const initialHashTableState: HashTableVisualState = {
  buckets: emptyBuckets(),
  highlightIndex: null,
}

function updateOrAppend(bucket: Entry[], key: string, value: string): Entry[] {
  const index = bucket.findIndex((e) => e.key === key)
  if (index === -1) return [...bucket, { key, value }]
  return bucket.map((e, i) => (i === index ? { key, value } : e))
}

export function hashTableReducer(
  state: HashTableVisualState,
  step: HashTableStep
): HashTableVisualState {
  switch (step.type) {
    case 'hash':
      return { ...state, highlightIndex: step.index }

    case 'insert': {
      const buckets = state.buckets.map((bucket, i) =>
        i === step.index ? updateOrAppend(bucket, step.key, step.value) : bucket
      )
      return { ...state, buckets, highlightIndex: step.index }
    }

    case 'delete': {
      const buckets = state.buckets.map((bucket, i) =>
        i === step.index ? bucket.filter((e) => e.key !== step.key) : bucket
      )
      return { ...state, buckets, highlightIndex: step.index }
    }

    default:
      return state
  }
}
