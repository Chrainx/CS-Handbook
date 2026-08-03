import { HeapStep } from './steps'

export type HeapVisualState = {
  array: number[]
  compare: { i: number; j: number } | null
  swap: { i: number; j: number } | null
}

export const initialHeapVisualState: HeapVisualState = {
  array: [],
  compare: null,
  swap: null,
}

export function heapVisualReducer(
  state: HeapVisualState,
  step: HeapStep
): HeapVisualState {
  switch (step.type) {
    case 'push':
      return { ...state, array: [...state.array, step.value], compare: null, swap: null }

    case 'compare':
      return { ...state, compare: { i: step.i, j: step.j }, swap: null }

    case 'swap': {
      const array = [...state.array]
      ;[array[step.i], array[step.j]] = [array[step.j], array[step.i]]
      return { ...state, array, swap: { i: step.i, j: step.j }, compare: null }
    }

    case 'pop-last':
      return { ...state, array: state.array.slice(0, -1) }

    case 'extract-root':
      return { ...state, compare: null, swap: null }

    case 'done':
      return { ...state, compare: null, swap: null }

    default:
      return state
  }
}
