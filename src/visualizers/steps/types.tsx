/* ============================================================================
 * Sorting steps (ALL sorting algorithms)
 * ========================================================================== */
export type SortingStep =
  | { type: 'compare'; i: number; j: number }
  | { type: 'swap'; i: number; j: number; isPivotSwap?: boolean }
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
  | { type: 'pivot'; pivotIndex: number; l: number; r: number }
  | { type: 'quick-compare'; i: number; j: number; pivotIndex: number }
  | { type: 'pivot-final'; pivotIndex: number }
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

  // Optional: highlight the current node (DFS stack / BFS queue head)
  | {
      type: 'set-active-node'
      node: string | null
    }

  // Algorithm finished
  | {
      type: 'done'
    }

/* ============================================================================
 * Unified Step type (the visualization language)
 * ========================================================================== */
export type Step = SortingStep | BinarySearchStep | GraphStep
