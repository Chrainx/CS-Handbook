import { BinarySearchStep } from '@/visualizers/steps/types'
import { BinarySearchVisualState, initialBinarySearchState } from './types'

export function binarySearchReducer(
  state: BinarySearchVisualState,
  step: BinarySearchStep
): BinarySearchVisualState {
  switch (step.type) {
    case 'reset':
      return initialBinarySearchState(step.array)

    case 'bs-range': {
      const eliminated = new Set(state.eliminated)

      // eliminate everything outside new range
      state.array.forEach((_, i) => {
        if (i < step.low || i > step.high) eliminated.add(i)
      })

      return {
        ...state,
        low: step.low,
        high: step.high,
        mid: step.mid,
        eliminated,
      }
    }

    case 'bs-compare': {
      return {
        ...state,
        mid: step.index,
      }
    }

    case 'bs-found': {
      return {
        ...state,
        foundIndex: step.index,
      }
    }

    case 'bs-not-found':
      return {
        ...state,
        low: null,
        high: null,
        mid: null,
        foundIndex: null,
      }

    default:
      return state
  }
}
