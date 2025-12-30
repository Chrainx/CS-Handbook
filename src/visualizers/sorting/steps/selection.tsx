import { SortingStep } from '@/visualizers/steps/types'

export function selectionSortSteps(arr: number[]): SortingStep[] {
  const a = [...arr]
  const steps: SortingStep[] = []

  for (let i = 0; i < a.length; i++) {
    let min = i
    steps.push({ type: 'mark', index: min })

    for (let j = i + 1; j < a.length; j++) {
      steps.push({ type: 'compare', i: j, j: min })

      if (a[j] < a[min]) {
        min = j
        steps.push({ type: 'mark', index: min })
      }
    }

    if (min !== i) {
      steps.push({ type: 'swap', i, j: min })
      ;[a[i], a[min]] = [a[min], a[i]]
    }
  }

  steps.push({ type: 'done' })
  return steps
}
