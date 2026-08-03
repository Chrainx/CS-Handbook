import { describe, expect, it } from 'vitest'
import { queueReducer, initialQueueState, describeQueueStep } from './types'

describe('queueReducer', () => {
  it('enqueue appends to the rear of the array', () => {
    const state = queueReducer(initialQueueState, {
      type: 'enqueue',
      value: 5,
    })
    expect(state.array).toEqual([5])
  })

  it('dequeue removes the front element', () => {
    const state = queueReducer(
      { array: [1, 2, 3] },
      { type: 'dequeue', value: 1 }
    )
    expect(state.array).toEqual([2, 3])
  })

  it('dequeue on an empty queue is a no-op (stays empty)', () => {
    const state = queueReducer(initialQueueState, {
      type: 'dequeue',
      value: 0,
    })
    expect(state.array).toEqual([])
  })
})

describe('describeQueueStep', () => {
  it('describes enqueue and dequeue with the operated-on value', () => {
    expect(describeQueueStep({ type: 'enqueue', value: 4 })).toContain('4')
    expect(describeQueueStep({ type: 'dequeue', value: 4 })).toContain('4')
  })
})
