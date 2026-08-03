import { describe, expect, it } from 'vitest'
import { hashTableReducer, initialHashTableState } from './state'
import { emptyBuckets } from './steps'

describe('hashTableReducer', () => {
  it('hash sets the highlightIndex without changing buckets', () => {
    const state = hashTableReducer(initialHashTableState, {
      type: 'hash',
      key: 'a',
      index: 3,
    })
    expect(state.highlightIndex).toBe(3)
    expect(state.buckets).toEqual(emptyBuckets())
  })

  it('insert appends a new entry into the target bucket', () => {
    const state = hashTableReducer(initialHashTableState, {
      type: 'insert',
      index: 2,
      key: 'a',
      value: '1',
      kind: 'fresh',
    })
    expect(state.buckets[2]).toEqual([{ key: 'a', value: '1' }])
    expect(state.highlightIndex).toBe(2)
  })

  it('insert with an existing key updates its value in place instead of duplicating', () => {
    const start = {
      ...initialHashTableState,
      buckets: initialHashTableState.buckets.map((b, i) =>
        i === 2 ? [{ key: 'a', value: '1' }] : b
      ),
    }
    const state = hashTableReducer(start, {
      type: 'insert',
      index: 2,
      key: 'a',
      value: '99',
      kind: 'update',
    })
    expect(state.buckets[2]).toEqual([{ key: 'a', value: '99' }])
  })

  it('insert on an occupied bucket chains (appends) rather than replacing', () => {
    const start = {
      ...initialHashTableState,
      buckets: initialHashTableState.buckets.map((b, i) =>
        i === 2 ? [{ key: 'x', value: '1' }] : b
      ),
    }
    const state = hashTableReducer(start, {
      type: 'insert',
      index: 2,
      key: 'y',
      value: '2',
      kind: 'collision',
    })
    expect(state.buckets[2]).toEqual([
      { key: 'x', value: '1' },
      { key: 'y', value: '2' },
    ])
  })

  it('delete removes only the matching entry from the target bucket', () => {
    const start = {
      ...initialHashTableState,
      buckets: initialHashTableState.buckets.map((b, i) =>
        i === 2
          ? [
              { key: 'x', value: '1' },
              { key: 'y', value: '2' },
            ]
          : b
      ),
    }
    const state = hashTableReducer(start, {
      type: 'delete',
      index: 2,
      key: 'x',
      found: true,
    })
    expect(state.buckets[2]).toEqual([{ key: 'y', value: '2' }])
  })
})
