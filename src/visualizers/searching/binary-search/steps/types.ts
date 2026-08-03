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
