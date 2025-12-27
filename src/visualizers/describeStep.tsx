import { Step } from './sorting/steps/types'

export function describeStep(step: Step, algorithm: string): string {
  switch (step.type) {
    case 'compare':
      return `Comparing elements at index ${step.i} and ${step.j}.`

    case 'swap':
      return `Swapping elements at index ${step.i} and ${step.j}.`

    case 'mark':
      return `Marking index ${step.index} as the current minimum.`

    case 'done':
      return `Algorithm completed. The array is now sorted.`

    case 'split':
      return `Splitting the array into two parts: [${step.l}..${
        step.mid
      }] and [${step.mid + 1}..${step.r}].`

    case 'base':
      return step.l === step.r
        ? `Base case: single element at index ${step.l}`
        : `Base case: empty range`

    case 'buffer-init':
      return `Create buffers for range [${step.l}, ${step.r}]`

    case 'merge-compare':
      return `Compare ${step.leftIndex}-th element of left buffer with ${step.rightIndex}-th element of right buffer`

    case 'merge-write':
      return `Write ${step.value} from the ${step.from} subarray into position ${step.index}`

    default:
      return ''
  }
}
