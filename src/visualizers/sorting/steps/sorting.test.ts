import { describe, expect, it } from 'vitest'
import { insertionSortSteps } from './insertion'
import { selectionSortSteps } from './selection'
import { mergeSortSteps } from './merge'
import { quickSortSteps } from './quick'
import { heapSortSteps } from './heap'
import { replaySortingSteps, sorted } from './testUtils'

const GENERATORS = {
  insertion: insertionSortSteps,
  selection: selectionSortSteps,
  merge: mergeSortSteps,
  quick: quickSortSteps,
  heap: heapSortSteps,
}

const CASES: Record<string, number[]> = {
  empty: [],
  single: [42],
  'already sorted': [1, 2, 3, 4, 5],
  'reverse sorted': [5, 4, 3, 2, 1],
  duplicates: [3, 1, 3, 2, 3, 1],
  'all equal': [7, 7, 7, 7],
  random: [8, 3, 9, 1, 6, 2, 7, 4, 5, 0],
  'two elements': [2, 1],
}

for (const [algoName, generate] of Object.entries(GENERATORS)) {
  describe(`${algoName}SortSteps`, () => {
    for (const [caseName, input] of Object.entries(CASES)) {
      it(`sorts correctly: ${caseName}`, () => {
        const steps = generate(input)
        const result = replaySortingSteps(input, steps)
        expect(result).toEqual(sorted(input))
      })
    }

    it('ends with a done step', () => {
      const steps = generate([3, 1, 2])
      expect(steps[steps.length - 1]).toEqual({ type: 'done' })
    })

    it('does not mutate the input array', () => {
      const input = [5, 3, 1, 4, 2]
      const original = [...input]
      generate(input)
      expect(input).toEqual(original)
    })
  })
}
