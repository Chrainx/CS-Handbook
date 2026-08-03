// visualizers/searching/binary-search/adapters/binarySearchToArray.ts

import { BinarySearchVisualState } from '../state/types'
import { ArrayVisualProps } from '@/visualizers/primitives/arrayView/types'

export function binarySearchStateToArray(
  state: BinarySearchVisualState
): ArrayVisualProps {
  return {
    values: state.array,

    colorByIndex: (i) => {
      if (state.foundIndex === i) return 'bg-state-swap text-white'
      if (state.mid === i) return 'bg-state-compare text-white'

      if (
        state.low !== null &&
        state.high !== null &&
        (i < state.low || i > state.high)
      )
        return 'bg-state-eliminated text-state-eliminated-foreground'

      return 'bg-state-default text-white'
    },

    markers: {
      top:
        state.mid !== null ? [{ index: state.mid, label: 'mid' }] : undefined,
    },
  }
}
