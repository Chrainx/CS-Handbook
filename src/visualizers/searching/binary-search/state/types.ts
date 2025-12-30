export type BinarySearchVisualState = {
  array: number[]

  low: number | null
  high: number | null
  mid: number | null

  foundIndex: number | null
  eliminated: Set<number>
}

export const initialBinarySearchState = (
  array: number[]
): BinarySearchVisualState => ({
  array: [...array],

  low: null,
  high: null,
  mid: null,

  foundIndex: null,
  eliminated: new Set(),
})
