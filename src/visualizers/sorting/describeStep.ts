import { SortingStep } from './steps/types'

function withReason(text: string, reason?: string): string {
  return reason ? `${text} ${reason}` : text
}

export function describeSortingStep(
  step: SortingStep,
  context?: { algorithm?: string | null }
): string {
  switch (step.type) {
    case 'compare':
      return withReason(
        `Comparing elements at indices ${step.i} and ${step.j}.`,
        step.reason
      )

    case 'swap':
      return withReason(
        `Swapping elements at indices ${step.i} and ${step.j}.`,
        step.reason
      )

    case 'mark': {
      if (context?.algorithm === 'quick') {
        return withReason(
          `Marking index ${step.index} relative to pivot.`,
          step.reason
        )
      }

      if (context?.algorithm === 'selection') {
        return withReason(
          `Marking index ${step.index} as current minimum.`,
          step.reason
        )
      }

      return withReason(`Marking index ${step.index}.`, step.reason)
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
      return withReason(
        `Writing value ${step.value} from ${step.from} buffer into index ${step.writeIndex}.`,
        step.reason
      )

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
