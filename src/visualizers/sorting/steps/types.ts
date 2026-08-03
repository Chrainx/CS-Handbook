export type SortingStep =
  | { type: 'compare'; i: number; j: number; reason?: string }
  | { type: 'swap'; i: number; j: number; reason?: string }
  | { type: 'mark'; index: number; reason?: string }
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
      reason?: string
    }
  | {
      type: 'merge-done'
      l: number
      r: number
    }
  | { type: 'pivot'; l: number; r: number; pivotIndex: number }
  | { type: 'quick-boundary'; index: number } // boundary pointer i
  | { type: 'pivot-final'; pivotIndex: number }
