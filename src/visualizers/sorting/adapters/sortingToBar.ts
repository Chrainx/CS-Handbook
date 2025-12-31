import { SortingVisualState } from '../state/types'
import { BarState } from '@/visualizers/primitives/bars/types'

export function sortingStateToBars(state: SortingVisualState): BarState {
  const inMerge = !!state.leftBuffer // merge is active when buffers exist
  const lastWrittenIndex =
    inMerge &&
    state.writeIndex !== null &&
    state.writeIndex > state.activeRange!.l // 👈 key guard
      ? state.writeIndex - 1
      : null

  return {
    values: state.array,

    colorByIndex: (i) => {
      // ✅ swap always top priority
      if (state.swap && (i === state.swap.i || i === state.swap.j))
        return 'bg-green-500'

      // ✅ last written (green) during merge
      if (
        lastWrittenIndex !== null &&
        lastWrittenIndex >= 0 &&
        i === lastWrittenIndex
      )
        return 'bg-green-500'

      // ✅ base case
      if (state.baseIndex === i) return 'bg-gray-400'

      // ✅ write position (purple) during merge
      if (state.writeIndex === i) return 'bg-purple-500'

      // ✅ mark (selection min etc)
      if (state.markedIndex === i) return 'bg-yellow-500'

      // ✅ pivot (quick)
      if (state.pivotIndex === i) return 'bg-purple-500'

      // ✅ compare (ONLY when not merging)
      if (
        !inMerge &&
        state.compare &&
        (i === state.compare.i || i === state.compare.j)
      )
        return 'bg-red-500'

      // ✅ boundary committed (quick)
      if (
        state.activeRange &&
        state.boundaryIndex !== null &&
        i >= state.activeRange.l &&
        i < state.boundaryIndex
      )
        return 'bg-orange-500'

      // ✅ active range
      if (
        state.activeRange &&
        i >= state.activeRange.l &&
        i <= state.activeRange.r
      )
        return 'bg-cyan-500'

      return 'bg-blue-500'
    },

    // if your BarState supports these (you already had splitStack before):
    splitStack: state.splitStack,
    activeRange: state.activeRange,

    // marker label for write (optional; color already handled above)
    markers: {
      top:
        state.writeIndex !== null
          ? [{ index: state.writeIndex, label: '↓ write' }]
          : undefined,
    },
  }
}
