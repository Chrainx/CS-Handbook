import { SortingStep } from './types'

export function heapSortSteps(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = []
  const a = [...arr]
  const n = a.length

  function heapify(size: number, root: number) {
    let largest = root
    const left = 2 * root + 1
    const right = 2 * root + 2

    if (left < size) {
      steps.push({
        type: 'compare',
        i: root,
        j: left,
        reason: `Checking whether the left child ${a[left]} is bigger than ${a[largest]}.`,
      })
      if (a[left] > a[largest]) largest = left
    }

    if (right < size) {
      steps.push({
        type: 'compare',
        i: largest,
        j: right,
        reason: `Checking whether the right child ${a[right]} is bigger than the current largest ${a[largest]}.`,
      })
      if (a[right] > a[largest]) largest = right
    }

    if (largest !== root) {
      steps.push({
        type: 'swap',
        i: root,
        j: largest,
        reason: `${a[largest]} is bigger than its parent, so it moves up to restore the heap property.`,
      })
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
    steps.push({
      type: 'swap',
      i: 0,
      j: end,
      reason: `${a[0]} is the largest remaining element, so it moves to the end.`,
    })
    ;[a[0], a[end]] = [a[end], a[0]]

    // Mark sorted
    steps.push({
      type: 'mark',
      index: end,
      reason: `${a[end]} is now in its final sorted position.`,
    })

    // Restore heap
    heapify(end, 0)
  }

  // Final element
  steps.push({
    type: 'mark',
    index: 0,
    reason: `${a[0]} is the last remaining element, already in sorted position.`,
  })
  steps.push({ type: 'done' })

  return steps
}
