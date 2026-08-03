import { describe, expect, it } from 'vitest'
import {
  linkedListReducer,
  initialLinkedListState,
  describeLinkedListStep,
} from './types'

describe('linkedListReducer', () => {
  it('insert-head prepends the value', () => {
    const state = linkedListReducer(
      { list: [2, 3] },
      { type: 'insert-head', value: 1 }
    )
    expect(state.list).toEqual([1, 2, 3])
  })

  it('insert-tail appends the value', () => {
    const state = linkedListReducer(
      { list: [1, 2] },
      { type: 'insert-tail', value: 3 }
    )
    expect(state.list).toEqual([1, 2, 3])
  })

  it('delete removes the first node with a matching value', () => {
    const state = linkedListReducer(
      { list: [1, 2, 3, 2] },
      { type: 'delete', value: 2 }
    )
    expect(state.list).toEqual([1, 3, 2])
  })

  it('delete on a value not present is a no-op', () => {
    const start = { list: [1, 2, 3] }
    const state = linkedListReducer(start, { type: 'delete', value: 99 })
    expect(state.list).toEqual([1, 2, 3])
  })

  it('delete on an empty list is a no-op', () => {
    const state = linkedListReducer(initialLinkedListState, {
      type: 'delete',
      value: 1,
    })
    expect(state.list).toEqual([])
  })
})

describe('describeLinkedListStep', () => {
  it('describes each step with the operated-on value', () => {
    expect(describeLinkedListStep({ type: 'insert-head', value: 4 })).toContain('4')
    expect(describeLinkedListStep({ type: 'insert-tail', value: 4 })).toContain('4')
    expect(describeLinkedListStep({ type: 'delete', value: 4 })).toContain('4')
  })
})
