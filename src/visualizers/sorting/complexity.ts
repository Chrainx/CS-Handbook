import { ComplexityInfo } from '../shared/complexityBadge'
import { SortingAlgorithmId } from './state/types'

export const SORTING_COMPLEXITY: Record<SortingAlgorithmId, ComplexityInfo> = {
  insertion: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    note: 'Stable',
  },
  selection: {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    note: 'Not stable',
  },
  merge: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    note: 'Stable',
  },
  quick: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    note: 'Not stable',
  },
  heap: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
    note: 'Not stable',
  },
}
