// visualizers/sorting/state/reducer.ts
import { SortingStep } from '@/visualizers/steps/types'
import { SortingVisualState, initialSortingVisualState } from './types'

export function sortingReducer(
  state: SortingVisualState,
  step: SortingStep
): SortingVisualState {
  switch (step.type) {
    case 'reset':
      return initialSortingVisualState(step.array)

    case 'compare':
      return {
        ...state,
        compare: { i: step.i, j: step.j },
        swap: null,
      }

    case 'swap': {
      const array = [...state.array]
      ;[array[step.i], array[step.j]] = [array[step.j], array[step.i]]

      return {
        ...state,
        array,
        swap: { i: step.i, j: step.j },
        compare: null,
        markedIndex: null, // ✅ clear after swap
      }
    }

    case 'mark':
      return {
        ...state,
        markedIndex: step.index,
        compare: null,
        swap: null,
      }

    case 'split':
      return {
        ...state,
        splitStack: [
          ...state.splitStack,
          { l: step.l, r: step.r, mid: step.mid },
        ],
        activeRange: { l: step.l, r: step.r, mid: step.mid },
        baseIndex: null,
      }

    case 'base':
      return {
        ...state,
        baseIndex: step.index,
        activeRange: null,
      }

    case 'buffer-init':
      return {
        ...state,
        leftBuffer: step.left,
        rightBuffer: step.right,
        leftPtr: 0,
        rightPtr: 0,
        writeIndex: step.writeIndex,

        compare: null,
        swap: null,
        baseIndex: null,
      }

    case 'buffer-compare':
      return {
        ...state,
        compare: {
          i: step.leftIndex,
          j: step.rightIndex,
        },
      }

    case 'buffer-write': {
      const array = [...state.array]
      array[step.writeIndex] = step.value

      return {
        ...state,
        array,
        writeIndex: step.writeIndex,
        leftPtr: step.from === 'left' ? state.leftPtr + 1 : state.leftPtr,
        rightPtr: step.from === 'right' ? state.rightPtr + 1 : state.rightPtr,
      }
    }

    case 'merge-done':
      return {
        ...state,
        // pop one split when a merge finishes
        splitStack: state.splitStack.slice(0, -1),
        activeRange:
          state.splitStack.length > 1
            ? state.splitStack[state.splitStack.length - 2]
            : null,
        baseIndex: null,
        writeIndex: null,
      }

    case 'pivot': {
      return {
        ...state,
        activeRange: {
          l: step.l,
          r: step.r,
          mid: Math.floor((step.l + step.r) / 2),
        }, // mid not important for quick, but satisfies type
        pivotIndex: step.pivotIndex,
        boundaryIndex: step.l, // boundary starts at l in Lomuto
        compare: null,
        swap: null,
        markedIndex: null,
      }
    }

    case 'quick-boundary': {
      return {
        ...state,
        boundaryIndex: step.index,
      }
    }

    case 'pivot-final': {
      return {
        ...state,
        markedIndex: step.pivotIndex, // optional: show pivot final as yellow
        pivotIndex: null,
        boundaryIndex: null,
        compare: null,
        swap: null,
      }
    }

    case 'done':
      return {
        ...state,
        compare: null,
        swap: null,
        markedIndex: null,
        activeRange: null,
        splitStack: [],
        baseIndex: null,
        leftBuffer: null,
        rightBuffer: null,
        leftPtr: 0,
        rightPtr: 0,
        writeIndex: null,
        pivotIndex: null,
        boundaryIndex: null,
      }

    default:
      return state
  }
}
