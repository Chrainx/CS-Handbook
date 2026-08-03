import { describe, expect, it } from 'vitest'
import {
  linkedListReducer,
  linkedListInsertHeadSteps,
  linkedListInsertTailSteps,
  linkedListDeleteSteps,
  initialLinkedListState,
  describeLinkedListStep,
  LinkedListState,
} from './types'

function replay(state: LinkedListState, steps: ReturnType<typeof linkedListInsertHeadSteps>) {
  return steps.reduce(linkedListReducer, state)
}

describe('linkedListInsertHeadSteps', () => {
  it('prepends the value with no traversal (head is a direct reference)', () => {
    const steps = linkedListInsertHeadSteps([2, 3], 1)
    expect(steps.some((s) => s.type === 'traverse')).toBe(false)
    const result = replay({ ...initialLinkedListState, list: [2, 3] }, steps)
    expect(result.list).toEqual([1, 2, 3])
    expect(result.pendingNode).toBeNull()
  })

  it('works on an empty list', () => {
    const steps = linkedListInsertHeadSteps([], 1)
    const result = replay(initialLinkedListState, steps)
    expect(result.list).toEqual([1])
  })
})

describe('linkedListInsertTailSteps', () => {
  it('hops from node to node to reach the last one before appending', () => {
    const steps = linkedListInsertTailSteps([1, 2, 3], 4)
    const traverses = steps.filter((s) => s.type === 'traverse')
    expect(traverses).toEqual([
      { type: 'traverse', index: 1 },
      { type: 'traverse', index: 2 },
    ])
    const result = replay({ ...initialLinkedListState, list: [1, 2, 3] }, steps)
    expect(result.list).toEqual([1, 2, 3, 4])
  })

  it('needs no hops when the list has a single node (already the last one)', () => {
    const steps = linkedListInsertTailSteps([1], 2)
    expect(steps.some((s) => s.type === 'traverse')).toBe(false)
  })

  it('appends with no traversal on an empty list', () => {
    const steps = linkedListInsertTailSteps([], 1)
    expect(steps.some((s) => s.type === 'traverse')).toBe(false)
    const result = replay(initialLinkedListState, steps)
    expect(result.list).toEqual([1])
  })
})

describe('linkedListDeleteSteps', () => {
  it('hops node to node to reach the target, then removes it', () => {
    const steps = linkedListDeleteSteps([1, 2, 3, 4], 3)
    const traverses = steps.filter((s) => s.type === 'traverse')
    expect(traverses).toEqual([
      { type: 'traverse', index: 1 },
      { type: 'traverse', index: 2 },
    ])
    expect(steps.some((s) => s.type === 'mark-target')).toBe(true)
    const result = replay({ ...initialLinkedListState, list: [1, 2, 3, 4] }, steps)
    expect(result.list).toEqual([1, 2, 4])
    expect(result.targetIndex).toBeNull()
  })

  it('removing the head requires no traversal', () => {
    const steps = linkedListDeleteSteps([1, 2, 3], 1)
    expect(steps.some((s) => s.type === 'traverse')).toBe(false)
    const result = replay({ ...initialLinkedListState, list: [1, 2, 3] }, steps)
    expect(result.list).toEqual([2, 3])
  })

  it('reports not-found after traversing the whole list', () => {
    const steps = linkedListDeleteSteps([1, 2, 3], 99)
    expect(steps.filter((s) => s.type === 'traverse')).toHaveLength(2)
    expect(steps.some((s) => s.type === 'not-found')).toBe(true)
    const result = replay({ ...initialLinkedListState, list: [1, 2, 3] }, steps)
    expect(result.list).toEqual([1, 2, 3])
  })

  it('is a no-op traversal-only sequence on an empty list', () => {
    const steps = linkedListDeleteSteps([], 1)
    expect(steps.some((s) => s.type === 'traverse')).toBe(false)
    expect(steps.some((s) => s.type === 'not-found')).toBe(true)
  })
})

describe('describeLinkedListStep', () => {
  it('describes create-node and traverse with the relevant value/index', () => {
    expect(describeLinkedListStep({ type: 'create-node', value: 4 })).toContain('4')
    expect(describeLinkedListStep({ type: 'traverse', index: 2 })).toContain('2')
  })
})
