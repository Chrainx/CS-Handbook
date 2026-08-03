import { SortingStep } from './types'

export function selectionSortSteps(arr: number[]): SortingStep[] {
  const a = [...arr]
  const steps: SortingStep[] = []

  for (let i = 0; i < a.length; i++) {
    let min = i
    steps.push({
      type: 'mark',
      index: min,
      reason: `Assuming ${a[min]} is the minimum for now.`,
    })

    for (let j = i + 1; j < a.length; j++) {
      steps.push({
        type: 'compare',
        i: j,
        j: min,
        reason: `Checking whether ${a[j]} is smaller than the current minimum ${a[min]}.`,
      })

      if (a[j] < a[min]) {
        min = j
        steps.push({
          type: 'mark',
          index: min,
          reason: `${a[min]} is smaller, so it's the new minimum.`,
        })
      }
    }

    if (min !== i) {
      steps.push({
        type: 'swap',
        i,
        j: min,
        reason: `Placing the minimum ${a[min]} into its sorted position.`,
      })
      ;[a[i], a[min]] = [a[min], a[i]]
    }
  }

  steps.push({ type: 'done' })
  return steps
}
