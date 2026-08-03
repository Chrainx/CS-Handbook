import { BinarySearchStep } from './steps/types'

export function describeBinarySearchStep(
  step: BinarySearchStep,
  context?: { target?: number }
): string {
  switch (step.type) {
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

    case 'reset':
      return ''

    default: {
      const _exhaustive: never = step
      return _exhaustive
    }
  }
}
