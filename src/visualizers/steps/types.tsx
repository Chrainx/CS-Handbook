/* ============================================================================
 * Sorting steps (ALL sorting algorithms)
 * ========================================================================== */
export type SortingStep =
  | { type: 'compare'; i: number; j: number }
  | { type: 'swap'; i: number; j: number }
  | { type: 'mark'; index: number }
  | { type: 'reset'; array: number[] }
  | { type: 'done' }
  | { type: 'split'; l: number; r: number; mid: number }
  | { type: 'base'; index: number }
  | { type: 'range-enter'; l: number; r: number }
  | { type: 'merge-start'; l: number; r: number }
  | {
      type: 'buffer-init'
      left: number[]
      right: number[]
      writeIndex: number
    }
  | {
      type: 'buffer-compare'
      leftIndex: number
      rightIndex: number
    }
  | {
      type: 'buffer-write'
      value: number
      writeIndex: number
      from: 'left' | 'right'
    }
  | {
      type: 'merge-done'
      l: number
      r: number
    }
  | { type: 'pivot'; l: number; r: number; pivotIndex: number }
  | { type: 'quick-boundary'; index: number } // boundary pointer i
  | { type: 'pivot-final'; pivotIndex: number }

/* ============================================================================
 * Binary search steps
 * ========================================================================== */
export type BinarySearchStep =
  | { type: 'reset'; array: number[] }
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
 * Graph visualization steps
 * This is the "visual language" for ALL graph algorithms.
 * ========================================================================== */

export type GraphStep =
  | { type: 'reset' }
  | {
      type: 'visit-node'
      node: string
    }
  | {
      type: 'mark-visited'
      node: string
    }
  | {
      type: 'activate-edge'
      from: string
      to: string
    }
  | {
      type: 'relax-edge'
      from: string
      to: string
      newDist: number
    }
  | {
      type: 'choose-edge'
      from: string
      to: string
    }
  | {
      type: 'set-distance'
      node: string
      distance: number
      from: string | null
    }
  | { type: 'enqueue'; node: string }
  | { type: 'dequeue'; node: string }
  | {
      type: 'push-stack'
      node: string
    }
  | {
      type: 'pop-stack'
    }
  | {
      type: 'pq-push'
      item: { node: string; priority: number }
    }
  | {
      type: 'pq-pop'
      node: string
      priority: number
    }
  | { type: 'pq-skip-stale'; node: string; priority: number }
  | {
      type: 'set-active-node'
      node: string | null
    }
  | { type: 'done' }

/* ============================================================================
 * Unified Step type (the visualization language)
 * ========================================================================== */
export type Step = SortingStep | BinarySearchStep | GraphStep
