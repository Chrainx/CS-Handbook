import { describe, expect, it } from 'vitest'
import { sortingReducer } from './reducer'
import { initialSortingVisualState } from './types'

describe('sortingReducer', () => {
  it('reset replaces state with a fresh initial state for the given array', () => {
    const state = sortingReducer(initialSortingVisualState([1, 2, 3]), {
      type: 'reset',
      array: [9, 8, 7],
    })
    expect(state).toEqual(initialSortingVisualState([9, 8, 7]))
  })

  it('compare sets the compare pair and clears swap', () => {
    const start = { ...initialSortingVisualState([1, 2, 3]), swap: { i: 0, j: 1 } }
    const state = sortingReducer(start, { type: 'compare', i: 1, j: 2 })
    expect(state.compare).toEqual({ i: 1, j: 2 })
    expect(state.swap).toBeNull()
  })

  it('swap actually swaps the two array entries and clears markedIndex', () => {
    const start = {
      ...initialSortingVisualState([1, 2, 3]),
      markedIndex: 0,
    }
    const state = sortingReducer(start, { type: 'swap', i: 0, j: 2 })
    expect(state.array).toEqual([3, 2, 1])
    expect(state.swap).toEqual({ i: 0, j: 2 })
    expect(state.compare).toBeNull()
    expect(state.markedIndex).toBeNull()
  })

  it('mark sets markedIndex and clears compare/swap', () => {
    const start = {
      ...initialSortingVisualState([1, 2, 3]),
      compare: { i: 0, j: 1 },
      swap: { i: 0, j: 1 },
    }
    const state = sortingReducer(start, { type: 'mark', index: 2 })
    expect(state.markedIndex).toBe(2)
    expect(state.compare).toBeNull()
    expect(state.swap).toBeNull()
  })

  it('buffer-write writes the value at writeIndex and advances writeIndex + the matching pointer', () => {
    const start = {
      ...initialSortingVisualState([0, 0, 0]),
      writeIndex: 0,
      leftPtr: 0,
      rightPtr: 0,
    }
    const state = sortingReducer(start, {
      type: 'buffer-write',
      value: 5,
      writeIndex: 0,
      from: 'left',
    })
    expect(state.array).toEqual([5, 0, 0])
    expect(state.writeIndex).toBe(1)
    expect(state.leftPtr).toBe(1)
    expect(state.rightPtr).toBe(0)
  })

  it('done clears all transient visual state', () => {
    const dirty = {
      ...initialSortingVisualState([1, 2, 3]),
      compare: { i: 0, j: 1 },
      swap: { i: 0, j: 1 },
      markedIndex: 1,
      pivotIndex: 2,
      boundaryIndex: 0,
    }
    const state = sortingReducer(dirty, { type: 'done' })
    expect(state.compare).toBeNull()
    expect(state.swap).toBeNull()
    expect(state.markedIndex).toBeNull()
    expect(state.pivotIndex).toBeNull()
    expect(state.boundaryIndex).toBeNull()
  })

  it('an unknown step type is a no-op', () => {
    const start = initialSortingVisualState([1, 2, 3])
    // @ts-expect-error deliberately invalid step type for the no-op branch
    const state = sortingReducer(start, { type: 'not-a-real-step' })
    expect(state).toBe(start)
  })
})
