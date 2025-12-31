export type SortingVisualState = {
  array: number[]
  compare: { i: number; j: number } | null
  swap: { i: number; j: number } | null
  markedIndex: number | null
  activeRange: { l: number; r: number; mid: number } | null
  splitStack: { l: number; r: number; mid: number }[]
  baseIndex: number | null

  leftBuffer: number[] | null
  rightBuffer: number[] | null
  leftPtr: number
  rightPtr: number
  writeIndex: number | null

  pivotIndex: number | null
  boundaryIndex: number | null
}

export const initialSortingVisualState = (
  array: number[]
): SortingVisualState => ({
  array: [...array],

  compare: null,
  swap: null,
  markedIndex: null,

  activeRange: null,
  splitStack: [],
  baseIndex: null,

  leftBuffer: null,
  rightBuffer: null,
  leftPtr: 0,
  rightPtr: 0,
  writeIndex: null,

  pivotIndex: null,
  boundaryIndex: null,
})

export type SortingAlgorithmId = 'insertion' | 'selection' | 'merge' | 'quick'
