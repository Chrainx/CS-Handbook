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
      return `Sorting completed.`

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

    case 'visit-node':
      return `Visiting node ${step.node}.`

    case 'mark-visited':
      return `Node ${step.node} marked as visited.`

    case 'activate-edge':
      return `Exploring edge ${step.from} → ${step.to}.`

    case 'relax-edge':
      return `Relaxing edge ${step.from} → ${step.to}.`

    case 'choose-edge':
      return `Edge ${step.from} → ${step.to} chosen as part of result.`

    case 'set-active-node':
      return step.node
        ? `Current active node is ${step.node}.`
        : `No active node.`

    /* ===================== SAFETY ===================== */

    default: {
      const _exhaustive: never = step
      return _exhaustive
    }
  }
}
