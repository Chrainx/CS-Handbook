import { SortingStep } from '../../steps/types'

export function heapSortSteps(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = []
  const a = [...arr]
  const n = a.length

  function heapify(size: number, root: number) {
    let largest = root
    const left = 2 * root + 1
    const right = 2 * root + 2

    if (left < size) {
      steps.push({ type: 'compare', i: root, j: left })
      if (a[left] > a[largest]) largest = left
    }

    if (right < size) {
      steps.push({ type: 'compare', i: largest, j: right })
      if (a[right] > a[largest]) largest = right
    }

    if (largest !== root) {
      steps.push({ type: 'swap', i: root, j: largest })
      ;[a[root], a[largest]] = [a[largest], a[root]]
      heapify(size, largest)
    }
  }

  // 1️⃣ Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }

  // 2️⃣ Extract elements one by one
  for (let end = n - 1; end > 0; end--) {
    // Move max to end
    steps.push({ type: 'swap', i: 0, j: end })
    ;[a[0], a[end]] = [a[end], a[0]]

    // Mark sorted
    steps.push({ type: 'mark', index: end })

    // Restore heap
    heapify(end, 0)
  }

  // Final element
  steps.push({ type: 'mark', index: 0 })
  steps.push({ type: 'done' })

  return steps
}
