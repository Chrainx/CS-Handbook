import { Step } from './steps/types'

export function describeStep(
  step: Step,
  context?: {
    target?: number
  }
): string {
  switch (step.type) {
    /* ===================== SORTING ===================== */

    case 'compare':
      return `Comparing elements at indices ${step.i} and ${step.j}.`

    case 'swap':
      return `Swapping elements at indices ${step.i} and ${step.j}.`

    case 'mark':
      return `Marking index ${step.index} as placed correctly.`

    case 'split':
      return `Splitting array range [${step.l}, ${step.r}] with mid at ${step.mid}.`

    case 'base':
      return `Base case reached for range [${step.l}, ${step.r}].`

    case 'buffer-init':
      return `Creating left and right buffers for merge.`

    case 'merge-compare':
      return `Comparing elements from left and right buffers.`

    case 'merge-write':
      return `Writing value ${step.value} from ${step.from} buffer into index ${step.index}.`

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
