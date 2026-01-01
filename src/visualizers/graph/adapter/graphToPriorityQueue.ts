import { GraphState } from '../state/types'
import { PriorityQueueProps } from '@/visualizers/primitives/priorityQueue/types'

export function graphStateToPriorityQueue(
  state: GraphState
): PriorityQueueProps {
  if (!state.pq) {
    return { items: [], activeNode: state.activeNode ?? undefined }
  }
  const items = state.pq
    .map((item) => ({
      ...item,
      stale: item.priority > state.distances[item.node],
    }))
    .sort((a, b) => a.priority - b.priority)

  return {
    items,
    activeNode: undefined,
  }
}
