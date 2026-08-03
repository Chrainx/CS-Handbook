import { SortingStep } from './types'

export function insertionSortSteps(arr: number[]): SortingStep[] {
  const a = [...arr]
  const steps: SortingStep[] = []

  for (let i = 1; i < a.length; i++) {
    let j = i

    while (j > 0) {
      // compare current element with left
      steps.push({
        type: 'compare',
        i: j,
        j: j - 1,
        reason: `Checking whether ${a[j]} belongs before ${a[j - 1]}.`,
      })

      if (a[j] < a[j - 1]) {
        steps.push({
          type: 'swap',
          i: j,
          j: j - 1,
          reason: `${a[j]} is smaller than ${a[j - 1]}, so it shifts left.`,
        })
        ;[a[j], a[j - 1]] = [a[j - 1], a[j]]
        j--
      } else {
        break
      }
    }
  }

  steps.push({ type: 'done' })
  return steps
}
