import { Step } from './types'

export function insertionSortSteps(arr: number[]): Step[] {
  const a = [...arr]
  const steps: Step[] = []

  for (let i = 1; i < a.length; i++) {
    let j = i

    while (j > 0) {
      // 🔴 ALWAYS record comparison
      steps.push({ type: 'compare', i: j, j: j - 1 })

      if (a[j] < a[j - 1]) {
        // 🟣 Only swap if needed
        steps.push({ type: 'swap', i: j, j: j - 1 })
        ;[a[j], a[j - 1]] = [a[j - 1], a[j]]
        j--
      } else {
        // ❗ comparison happened but no swap → stop
        break
      }
    }
  }

  steps.push({ type: 'done' })
  return steps
}
