import { SortingStep } from '@/visualizers/steps/types'

export function quickSortSteps(arr: number[]): SortingStep[] {
  const a = [...arr]
  const steps: SortingStep[] = []

  function partition(l: number, r: number): number {
    const pivotIndex = r
    const pivot = a[pivotIndex]

    steps.push({ type: 'pivot', l, r, pivotIndex })

    let i = l // boundary index

    for (let j = l; j < r; j++) {
      // 1️⃣ compare j with pivot
      steps.push({ type: 'compare', i: j, j: pivotIndex })

      if (a[j] <= pivot) {
        // 2️⃣ commit element to left side
        if (i !== j) {
          steps.push({ type: 'swap', i, j })
          ;[a[i], a[j]] = [a[j], a[i]]
        }

        i++

        // 🔑 emit NEW boundary (after increment)
        steps.push({ type: 'quick-boundary', index: i })
      }
    }

    // 3️⃣ final pivot swap
    if (i !== pivotIndex) {
      steps.push({ type: 'swap', i, j: pivotIndex })
      ;[a[i], a[pivotIndex]] = [a[pivotIndex], a[i]]
    }

    steps.push({ type: 'pivot-final', pivotIndex: i })
    return i
  }

  function quickSort(l: number, r: number) {
    if (l >= r) return
    const p = partition(l, r)
    quickSort(l, p - 1)
    quickSort(p + 1, r)
  }

  quickSort(0, a.length - 1)
  steps.push({ type: 'done' })

  return steps
}
