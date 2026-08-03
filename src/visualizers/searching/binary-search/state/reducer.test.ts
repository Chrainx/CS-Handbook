import { describe, expect, it } from 'vitest'
import { binarySearchReducer } from './reducer'
import { initialBinarySearchState } from './types'

describe('binarySearchReducer', () => {
  it('reset replaces state with a fresh initial state for the given array', () => {
    const state = binarySearchReducer(initialBinarySearchState([1, 2, 3]), {
      type: 'reset',
      array: [9, 8, 7],
    })
    expect(state).toEqual(initialBinarySearchState([9, 8, 7]))
  })

  it('bs-range narrows low/high/mid and eliminates indices outside the range', () => {
    const state = binarySearchReducer(initialBinarySearchState([1, 2, 3, 4, 5]), {
      type: 'bs-range',
      low: 2,
      high: 4,
      mid: 3,
    })
    expect(state.low).toBe(2)
    expect(state.high).toBe(4)
    expect(state.mid).toBe(3)
    expect(state.eliminated).toEqual(new Set([0, 1]))
  })

  it('bs-range accumulates eliminated indices across successive narrowings', () => {
    let state = binarySearchReducer(initialBinarySearchState([1, 2, 3, 4, 5]), {
      type: 'bs-range',
      low: 0,
      high: 4,
      mid: 2,
    })
    state = binarySearchReducer(state, {
      type: 'bs-range',
      low: 3,
      high: 4,
      mid: 3,
    })
    expect(state.eliminated).toEqual(new Set([0, 1, 2]))
  })

  it('bs-compare sets mid', () => {
    const state = binarySearchReducer(initialBinarySearchState([1, 2, 3]), {
      type: 'bs-compare',
      index: 1,
      value: 2,
      target: 2,
    })
    expect(state.mid).toBe(1)
  })

  it('bs-found sets foundIndex', () => {
    const state = binarySearchReducer(initialBinarySearchState([1, 2, 3]), {
      type: 'bs-found',
      index: 2,
    })
    expect(state.foundIndex).toBe(2)
  })

  it('bs-not-found clears low/high/mid/foundIndex', () => {
    const dirty = {
      ...initialBinarySearchState([1, 2, 3]),
      low: 0,
      high: 2,
      mid: 1,
      foundIndex: 1,
    }
    const state = binarySearchReducer(dirty, { type: 'bs-not-found' })
    expect(state.low).toBeNull()
    expect(state.high).toBeNull()
    expect(state.mid).toBeNull()
    expect(state.foundIndex).toBeNull()
  })
})
