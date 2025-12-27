export type Step =
  | { type: 'compare'; i: number; j: number }
  | { type: 'swap'; i: number; j: number }
  | { type: 'mark'; index: number }
  | { type: 'split'; l: number; r: number; mid: number }
  | {
      type: 'merge-compare'
      leftIndex: number
      rightIndex: number
    }
  | { type: 'base'; l: number; r: number }
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
