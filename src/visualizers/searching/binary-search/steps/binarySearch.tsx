import { BinarySearchStep } from '@/visualizers/steps/types'

export function binarySearchSteps(
  arr: number[],
  target: number
): BinarySearchStep[] {
  const steps: BinarySearchStep[] = []

  let low = 0
  let high = arr.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)

    steps.push({
      type: 'bs-range',
      low,
      high,
      mid,
    })

    steps.push({
      type: 'bs-compare',
      index: mid,
      value: arr[mid],
      target,
    })

    if (arr[mid] === target) {
      steps.push({
        type: 'bs-found',
        index: mid,
      })
      return steps
    }

    if (arr[mid] < target) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  steps.push({ type: 'bs-not-found' })
  return steps
}
