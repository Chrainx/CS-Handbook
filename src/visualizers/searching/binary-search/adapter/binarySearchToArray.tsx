// visualizers/searching/binary-search/adapters/binarySearchToArray.ts

import { BinarySearchVisualState } from '../state/types'
import { ArrayVisualProps } from '@/visualizers/primitives/arrayView/types'

export function binarySearchStateToArray(
  state: BinarySearchVisualState
): ArrayVisualProps {
  return {
    values: state.array,

    colorByIndex: (i) => {
      if (state.foundIndex === i) return 'bg-green-500 text-white'
      if (state.mid === i) return 'bg-red-500 text-white'

      if (
        state.low !== null &&
        state.high !== null &&
        (i < state.low || i > state.high)
      )
        return 'bg-gray-200 text-gray-400'

      return 'bg-blue-500 text-black'
    },

    markers: {
      top:
        state.mid !== null ? [{ index: state.mid, label: 'mid' }] : undefined,
    },
  }
}
