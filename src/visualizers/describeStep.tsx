import { Step } from './steps/types'

export function describeStep(
  step: Step,
  context?: {
    target?: number
    algorithm?: string | null
  }
): string {
  switch (step.type) {
    /* ===================== SORTING ===================== */

    case 'compare':
      return `Comparing elements at indices ${step.i} and ${step.j}.`

    case 'swap':
      return `Swapping elements at indices ${step.i} and ${step.j}.`

    case 'mark': {
      if (context?.algorithm === 'quick') {
        return `Marking index ${step.index} relative to pivot.`
      }

      if (context?.algorithm === 'selection') {
        return `Marking index ${step.index} as current minimum.`
      }

      return `Marking index ${step.index}.`
    }

    case 'split':
      return `Splitting array range [${step.l}, ${step.r}] into [${step.l}, ${
        step.mid
      }] and [${step.mid + 1}, ${step.r}].`

    case 'base':
      return `Base case reached at index ${step.index} (cannot be split further).`

    case 'merge-start':
      return `Merging range [${step.l}, ${step.r}].`

    case 'range-enter':
      return `Processing range [${step.l}, ${step.r}].`

    case 'buffer-init':
      return `Preparing merge buffers. Writing back starting at index ${step.writeIndex}.`

    case 'buffer-compare':
      return `Comparing next elements from left and right buffers.`

    case 'buffer-write':
      return `Writing value ${step.value} from ${step.from} buffer into index ${step.writeIndex}.`

    case 'merge-done':
      return `Successfully merged range [${step.l}, ${step.r}].`
    case 'pivot':
      return `Choosing pivot at index ${step.pivotIndex} for range [${step.l}, ${step.r}].`

    case 'quick-boundary':
      return `Boundary moved to index ${step.index}. Elements left of it are ≤ pivot.`

    case 'pivot-final':
      return `Pivot placed into its final position at index ${step.pivotIndex}.`

    case 'reset':
      return '' // IMPORTANT: render nothing

    case 'done':
      return `Algorihm completed.`

    /* ===================== BINARY SEARCH ===================== */

    case 'bs-range':
      return `Search range is now [${step.low}, ${step.high}]. Mid is at index ${step.mid}.`

    case 'bs-compare':
      return `Comparing target ${
        context?.target ?? ''
      } with middle element at index ${step.index}.`

    case 'bs-found':
      return `Target found at index ${step.index}.`

    case 'bs-not-found':
      return `Target is not present in the array.`

    /* ===================== GRAPH ===================== */

    case 'enqueue':
      return `Add node ${step.node} to the queue.`

    case 'dequeue':
      return `Remove node ${step.node} from the queue.`

    case 'push-stack':
      return `Push node ${step.node} onto the stack.`

    case 'pop-stack':
      return `Pop node from the stack.`

    case 'pq-push':
      switch (context?.algorithm) {
        case 'dijkstra':
          return `Insert node ${step.item.node} with updated distance ${step.item.priority}.`
        case 'prim':
          return `Insert node ${step.item.node} with connection cost ${step.item.priority}.`
        default:
          return `Insert ${step.item.node} into the priority queue.`
      }

    case 'pq-pop':
      switch (context?.algorithm) {
        case 'dijkstra':
          return `Select node ${step.node} with the smallest known distance.`
        case 'prim':
          return `Select node ${step.node} with the cheapest connection to the MST.`
        default:
          return `Remove ${step.node} from the priority queue.`
      }

    case 'pq-skip-stale':
      return `Discard outdated entry for node ${step.node} (distance ${step.priority}), a shorter path already exists.`

    case 'set-distance':
      return step.from
        ? `Update distance of node ${step.node} to ${step.distance} via ${step.from}.`
        : `Set initial distance of node ${step.node} to ${step.distance}.`

    case 'visit-node':
      switch (context?.algorithm) {
        case 'bfs':
          return `Process node ${step.node} from the queue.`
        case 'dfs':
          return `Process node ${step.node} from the stack.`
        case 'dijkstra':
          return `Finalize shortest distance for node ${step.node}.`
        case 'prim':
          return `Add node ${step.node} to the minimum spanning tree.`
        default:
          return `Visiting node ${step.node}.`
      }

    case 'mark-visited':
      switch (context?.algorithm) {
        case 'bfs':
        case 'dfs':
          return `Node ${step.node} will not be revisited.`
        case 'dijkstra':
          return `Shortest path to node ${step.node} is finalized.`
        case 'prim':
          return `Node ${step.node} is now part of the MST.`
        default:
          return `Node ${step.node} marked as visited.`
      }

    case 'activate-edge':
      return `Examine edge ${step.from} → ${step.to}.`

    case 'relax-edge':
      switch (context?.algorithm) {
        case 'dijkstra':
          return `Edge ${step.from} → ${step.to} improves the shortest distance.`
        case 'bellman-ford':
          return `Edge ${step.from} → ${step.to} improves a distance during this pass.`
        case 'prim':
          return `Edge ${step.from} → ${step.to} becomes the best known connection to the MST.`
        default:
          return `Relaxing edge ${step.from} → ${step.to}.`
      }

    case 'choose-edge':
      switch (context?.algorithm) {
        case 'prim':
          return `Edge ${step.from} → ${step.to} is selected into the MST.`
        case 'kruskal':
          return `Edge ${step.from} → ${step.to} connects two components and is added to the MST.`
        default:
          return `Edge ${step.from} → ${step.to} chosen.`
      }

    case 'bf-pass':
      return `Bellman–Ford: starting relaxation pass ${step.pass}.`

    case 'kruskal-edge':
      return `Considering edge ${step.from} → ${step.to} (weight ${step.weight})`

    /* ===================== SAFETY ===================== */

    default: {
      const _exhaustive: never = step
      return _exhaustive
    }
  }
}
