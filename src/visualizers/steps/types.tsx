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
  // A node is discovered / focused (frontier)
  | {
      type: 'visit-node'
      node: string
    }

  // A node is fully processed
  | {
      type: 'mark-visited'
      node: string
    }

  // An edge becomes active (currently being explored)
  | {
      type: 'activate-edge'
      from: string
      to: string
    }

  // An edge relaxation attempt (Dijkstra / Bellman-Ford)
  | {
      type: 'relax-edge'
      from: string
      to: string
    }

  // An edge is chosen as part of final structure (MST, shortest path tree)
  | {
      type: 'choose-edge'
      from: string
      to: string
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

  // Optional: highlight the current node (DFS stack / BFS queue head)
  | {
      type: 'set-active-node'
      node: string | null
    }
  | { type: 'reset' }

  // Algorithm finished
  | { type: 'done' }

/* ============================================================================
 * Unified Step type (the visualization language)
 * ========================================================================== */
export type Step = SortingStep | BinarySearchStep | GraphStep
