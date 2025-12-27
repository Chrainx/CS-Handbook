import { Step } from './types'

export function selectionSortSteps(arr: number[]): Step[] {
  const steps: Step[] = []
  const a = [...arr]
  const n = a.length

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i

    // Mark initial minimum
    steps.push({ type: 'mark', index: minIndex })

    for (let j = i + 1; j < n; j++) {
      steps.push({ type: 'compare', i: minIndex, j })

      if (a[j] < a[minIndex]) {
        minIndex = j
        steps.push({ type: 'mark', index: minIndex }) // 👈 new minimum
      }
    }

    if (minIndex !== i) {
      steps.push({ type: 'swap', i, j: minIndex })
      ;[a[i], a[minIndex]] = [a[minIndex], a[i]]
    }
  }
  steps.push({ type: 'done' })
  return steps
}
