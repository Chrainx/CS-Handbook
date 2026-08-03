import { describe, expect, it } from 'vitest'
import { heapVisualReducer, initialHeapVisualState } from './state'

describe('heapVisualReducer', () => {
  it('push appends the value', () => {
    const state = heapVisualReducer(initialHeapVisualState, {
      type: 'push',
      value: 5,
    })
    expect(state.array).toEqual([5])
  })

  it('compare sets the compare pair and clears swap', () => {
    const start = {
      ...initialHeapVisualState,
      array: [1, 2],
      swap: { i: 0, j: 1 },
    }
    const state = heapVisualReducer(start, { type: 'compare', i: 0, j: 1 })
    expect(state.compare).toEqual({ i: 0, j: 1 })
    expect(state.swap).toBeNull()
  })

  it('swap exchanges the two array entries and clears compare', () => {
    const start = { ...initialHeapVisualState, array: [1, 2, 3] }
    const state = heapVisualReducer(start, { type: 'swap', i: 0, j: 2 })
    expect(state.array).toEqual([3, 2, 1])
    expect(state.swap).toEqual({ i: 0, j: 2 })
    expect(state.compare).toBeNull()
  })

  it('pop-last removes the last array entry', () => {
    const start = { ...initialHeapVisualState, array: [1, 2, 3] }
    const state = heapVisualReducer(start, { type: 'pop-last' })
    expect(state.array).toEqual([1, 2])
  })

  it('done clears compare/swap', () => {
    const start = {
      ...initialHeapVisualState,
      array: [1, 2],
      compare: { i: 0, j: 1 },
      swap: { i: 0, j: 1 },
    }
    const state = heapVisualReducer(start, { type: 'done' })
    expect(state.compare).toBeNull()
    expect(state.swap).toBeNull()
  })
})
