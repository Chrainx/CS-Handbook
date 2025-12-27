/* ============================================================================
 * Sorting steps (ALL sorting algorithms, including merge sort)
 * ========================================================================== */
export type SortingStep =
  | { type: 'compare'; i: number; j: number }
  | { type: 'swap'; i: number; j: number }
  | { type: 'mark'; index: number }
  | { type: 'split'; l: number; r: number; mid: number }
  | { type: 'base'; l: number; r: number }
  | {
      type: 'merge-compare'
      leftIndex: number
      rightIndex: number
    }
  | {
      type: 'merge-write'
      index: number
      value: number
      from: 'left' | 'right'
    }
  | {
      type: 'buffer-init'
      left: number[]
      right: number[]
      l: number
      r: number
      mid: number
    }
  | { type: 'done' }

/* ============================================================================
 * Binary search steps
 * ========================================================================== */
export type BinarySearchStep =
  | {
      type: 'bs-range'
      low: number
      high: number
      mid: number
    }
  | {
      type: 'bs-compare'
      index: number
      value: number
      target: number
    }
  | {
      type: 'bs-found'
      index: number
    }
  | {
      type: 'bs-not-found'
    }

/* ============================================================================
 * Unified Step type (the visualization language)
 * ========================================================================== */
export type Step = SortingStep | BinarySearchStep
