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
        return `Element at index ${step.index} is identified as belonging to the left side of the pivot.`
      }

      if (context?.algorithm === 'selection') {
        return `Marking index ${step.index} as the current minimum.`
      }

      return `Marking index ${step.index}.`
    }

    case 'split':
      return `Splitting array range [${step.l}, ${step.r}] with mid at ${step.mid}.`

    case 'base':
      if (step.l > step.r) {
        return `Base case reached: empty subarray (no elements to sort).`
      }

      if (step.l === step.r) {
        return `Base case reached: single element at index ${step.l}.`
      }

      return `Base case reached for range [${step.l}, ${step.r}].`

    case 'buffer-init':
      return `Creating left and right buffers for merge.`

    case 'merge-compare':
      return `Comparing elements from left and right buffers.`

    case 'merge-write':
      return `Writing value ${step.value} from ${step.from} buffer into index ${step.index}.`

    case 'pivot':
      return `Choosing pivot at index ${step.pivotIndex} for range [${step.l}, ${step.r}].`

    case 'quick-compare':
      return `Comparing element at index ${step.j} with pivot at index ${step.pivotIndex}.`

    case 'pivot-final':
      return `Placing pivot into its final position at index ${step.pivotIndex}.`

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

    /* ===================== SAFETY ===================== */

    default: {
      const _exhaustive: never = step
      return _exhaustive
    }
  }
}
