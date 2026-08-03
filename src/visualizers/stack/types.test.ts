import { describe, expect, it } from 'vitest'
import { stackReducer, initialStackState, describeStackStep } from './types'

describe('stackReducer', () => {
  it('push appends to the end of the array (the top of the stack)', () => {
    const state = stackReducer(initialStackState, { type: 'push', value: 5 })
    expect(state.array).toEqual([5])
  })

  it('pop removes the last element', () => {
    const state = stackReducer({ array: [1, 2, 3] }, { type: 'pop', value: 3 })
    expect(state.array).toEqual([1, 2])
  })

  it('pop on an empty stack is a no-op (stays empty)', () => {
    const state = stackReducer(initialStackState, { type: 'pop', value: 0 })
    expect(state.array).toEqual([])
  })
})

describe('describeStackStep', () => {
  it('describes push and pop with the operated-on value', () => {
    expect(describeStackStep({ type: 'push', value: 4 })).toContain('4')
    expect(describeStackStep({ type: 'pop', value: 4 })).toContain('4')
  })
})
