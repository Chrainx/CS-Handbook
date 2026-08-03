import { SortingStep } from './steps/types'

export function describeSortingStep(
  step: SortingStep,
  context?: { algorithm?: string | null }
): string {
  switch (step.type) {
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

    default: {
      const _exhaustive: never = step
      return _exhaustive
    }
  }
}
