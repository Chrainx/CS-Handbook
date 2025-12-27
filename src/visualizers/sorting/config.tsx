import { AlgorithmOption } from '@/components/visualizer-ui/types'

export const SORTING_ALGORITHMS: AlgorithmOption[] = [
  {
    id: 'insertion',
    name: 'Insertion Sort',
    description: 'Builds the sorted array incrementally by inserting elements',
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    description:
      'Selects the minimum element repeatedly and places it at the front',
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    description:
      'Divides the array into halves and merges them in sorted order',
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    description: 'Partitions the array around a pivot element',
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    description: 'Uses a heap data structure to sort elements',
  },
]
