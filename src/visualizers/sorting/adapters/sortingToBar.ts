import { SortingVisualState } from '../state/types'
import { BarVisualProps } from '@/visualizers/primitives/bars/types'

export function sortingStateToBars(state: SortingVisualState): BarVisualProps {
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
        return 'bg-state-swap'

      // ✅ last written (green) during merge
      if (
        lastWrittenIndex !== null &&
        lastWrittenIndex >= 0 &&
        i === lastWrittenIndex
      )
        return 'bg-state-swap'

      // ✅ base case
      if (state.baseIndex === i) return 'bg-state-base'

      // ✅ write position (purple) during merge
      if (state.writeIndex === i) return 'bg-state-pivot'

      // ✅ mark (selection min etc)
      if (state.markedIndex === i) return 'bg-state-mark'

      // ✅ pivot (quick)
      if (state.pivotIndex === i) return 'bg-state-pivot'

      // ✅ compare (ONLY when not merging)
      if (
        !inMerge &&
        state.compare &&
        (i === state.compare.i || i === state.compare.j)
      )
        return 'bg-state-compare'

      // ✅ boundary committed (quick)
      if (
        state.activeRange &&
        state.boundaryIndex !== null &&
        i >= state.activeRange.l &&
        i < state.boundaryIndex
      )
        return 'bg-state-boundary'

      // ✅ active range
      if (
        state.activeRange &&
        i >= state.activeRange.l &&
        i <= state.activeRange.r
      )
        return 'bg-state-active'

      return 'bg-state-default'
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
