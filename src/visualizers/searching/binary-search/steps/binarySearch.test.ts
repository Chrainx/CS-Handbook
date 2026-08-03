import { describe, expect, it } from 'vitest'
import { binarySearchSteps } from './binarySearch'

describe('binarySearchSteps', () => {
  const sorted = [2, 4, 6, 8, 10, 12, 14]

  it('finds a present target', () => {
    const steps = binarySearchSteps(sorted, 10)
    const last = steps[steps.length - 1]
    expect(last).toEqual({ type: 'bs-found', index: sorted.indexOf(10) })
  })

  it('finds the first element', () => {
    const steps = binarySearchSteps(sorted, 2)
    expect(steps[steps.length - 1]).toEqual({ type: 'bs-found', index: 0 })
  })

  it('finds the last element', () => {
    const steps = binarySearchSteps(sorted, 14)
    expect(steps[steps.length - 1]).toEqual({
      type: 'bs-found',
      index: sorted.length - 1,
    })
  })

  it('reports not-found for a missing target', () => {
    const steps = binarySearchSteps(sorted, 5)
    expect(steps[steps.length - 1]).toEqual({ type: 'bs-not-found' })
  })

  it('handles an empty array', () => {
    const steps = binarySearchSteps([], 5)
    expect(steps).toEqual([{ type: 'bs-not-found' }])
  })

  it('handles a single-element array (found)', () => {
    const steps = binarySearchSteps([7], 7)
    expect(steps[steps.length - 1]).toEqual({ type: 'bs-found', index: 0 })
  })

  it('handles a single-element array (not found)', () => {
    const steps = binarySearchSteps([7], 1)
    expect(steps[steps.length - 1]).toEqual({ type: 'bs-not-found' })
  })

  it('every bs-compare step only inspects indices within the narrowing range', () => {
    const steps = binarySearchSteps(sorted, 999)
    for (const step of steps) {
      if (step.type === 'bs-range') {
        expect(step.mid).toBeGreaterThanOrEqual(step.low)
        expect(step.mid).toBeLessThanOrEqual(step.high)
      }
    }
  })
})
