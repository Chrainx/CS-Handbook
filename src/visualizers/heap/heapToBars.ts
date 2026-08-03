import { HeapVisualState } from './state'
import { BarVisualProps } from '@/visualizers/primitives/bars/types'

export function heapStateToBars(state: HeapVisualState): BarVisualProps {
  return {
    values: state.array,

    colorByIndex: (i) => {
      if (state.swap && (i === state.swap.i || i === state.swap.j))
        return 'bg-state-swap'

      if (state.compare && (i === state.compare.i || i === state.compare.j))
        return 'bg-state-compare'

      if (i === 0) return 'bg-state-pivot'

      return 'bg-state-default'
    },

    isComparing: (i) =>
      !!state.compare && (i === state.compare.i || i === state.compare.j),

    splitStack: [],
    activeRange: null,
  }
}
