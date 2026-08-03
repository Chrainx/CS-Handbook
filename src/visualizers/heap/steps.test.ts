import { describe, expect, it } from 'vitest'
import { heapInsertSteps, heapExtractMaxSteps, HeapStep } from './steps'

function replay(heap: number[], steps: HeapStep[]): number[] {
  const a = [...heap]
  for (const step of steps) {
    if (step.type === 'push') a.push(step.value)
    else if (step.type === 'swap') [a[step.i], a[step.j]] = [a[step.j], a[step.i]]
    else if (step.type === 'pop-last') a.pop()
  }
  return a
}

function isMaxHeap(a: number[]): boolean {
  for (let i = 0; i < a.length; i++) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    if (left < a.length && a[left] > a[i]) return false
    if (right < a.length && a[right] > a[i]) return false
  }
  return true
}

describe('heapInsertSteps', () => {
  it('inserting into an empty heap produces a single-element heap', () => {
    const result = replay([], heapInsertSteps([], 5))
    expect(result).toEqual([5])
  })

  it('sifts a new max up to the root', () => {
    const heap = [5, 3, 4]
    const result = replay(heap, heapInsertSteps(heap, 10))
    expect(result[0]).toBe(10)
    expect(isMaxHeap(result)).toBe(true)
  })

  it('does not move a value that already satisfies the heap property', () => {
    const heap = [10, 5, 4]
    const result = replay(heap, heapInsertSteps(heap, 1))
    expect(isMaxHeap(result)).toBe(true)
    expect(result).toContain(1)
  })

  it('ends with a done step', () => {
    const steps = heapInsertSteps([1, 2, 3], 4)
    expect(steps[steps.length - 1]).toEqual({ type: 'done' })
  })

  it('maintains the heap property across repeated random insertions', () => {
    let heap: number[] = []
    for (const v of [8, 3, 9, 1, 6, 2, 7, 4, 5, 0]) {
      heap = replay(heap, heapInsertSteps(heap, v))
      expect(isMaxHeap(heap)).toBe(true)
    }
  })
})

describe('heapExtractMaxSteps', () => {
  it('extracts the maximum value', () => {
    const heap = [9, 5, 8, 1, 4, 7, 6]
    const steps = heapExtractMaxSteps(heap)
    const extractStep = steps.find((s) => s.type === 'extract-root')
    expect(extractStep).toEqual({ type: 'extract-root', value: 9 })
  })

  it('leaves a valid max-heap after extraction', () => {
    const heap = [9, 5, 8, 1, 4, 7, 6]
    const result = replay(heap, heapExtractMaxSteps(heap))
    expect(result).toHaveLength(heap.length - 1)
    expect(isMaxHeap(result)).toBe(true)
  })

  it('handles a single-element heap', () => {
    const result = replay([5], heapExtractMaxSteps([5]))
    expect(result).toEqual([])
  })

  it('is a no-op on an empty heap', () => {
    expect(heapExtractMaxSteps([])).toEqual([])
  })

  it('repeated extraction yields values in descending order', () => {
    let heap: number[] = []
    for (const v of [8, 3, 9, 1, 6, 2, 7, 4, 5, 0]) {
      heap = replay(heap, heapInsertSteps(heap, v))
    }

    const extracted: number[] = []
    while (heap.length > 0) {
      const steps = heapExtractMaxSteps(heap)
      const value = (
        steps.find((s) => s.type === 'extract-root') as Extract<
          HeapStep,
          { type: 'extract-root' }
        >
      ).value
      extracted.push(value)
      heap = replay(heap, steps)
      expect(isMaxHeap(heap)).toBe(true)
    }

    expect(extracted).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
  })
})
