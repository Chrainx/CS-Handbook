export type HeapStep =
  | { type: 'push'; value: number }
  | { type: 'compare'; i: number; j: number }
  | { type: 'swap'; i: number; j: number }
  | { type: 'extract-root'; value: number }
  | { type: 'pop-last' }
  | { type: 'done' }

/** Insert `value` into a max-heap and sift it up until the heap property
 * is restored. `heap` is treated as read-only. */
export function heapInsertSteps(heap: number[], value: number): HeapStep[] {
  const a = [...heap]
  const steps: HeapStep[] = []

  a.push(value)
  steps.push({ type: 'push', value })

  let i = a.length - 1
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2)
    steps.push({ type: 'compare', i: parent, j: i })

    if (a[parent] < a[i]) {
      steps.push({ type: 'swap', i: parent, j: i })
      ;[a[parent], a[i]] = [a[i], a[parent]]
      i = parent
    } else {
      break
    }
  }

  steps.push({ type: 'done' })
  return steps
}

/** Remove and return the max of a max-heap: move the last element to the
 * root, then sift it down until the heap property is restored. `heap` is
 * treated as read-only. No-op (empty steps) on an empty heap. */
export function heapExtractMaxSteps(heap: number[]): HeapStep[] {
  const a = [...heap]
  const steps: HeapStep[] = []

  if (a.length === 0) return steps

  steps.push({ type: 'extract-root', value: a[0] })

  const last = a.length - 1
  if (last > 0) {
    steps.push({ type: 'swap', i: 0, j: last })
    ;[a[0], a[last]] = [a[last], a[0]]
  }

  steps.push({ type: 'pop-last' })
  a.pop()

  let i = 0
  const n = a.length
  while (true) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    let largest = i

    if (left < n) {
      steps.push({ type: 'compare', i: largest, j: left })
      if (a[left] > a[largest]) largest = left
    }

    if (right < n) {
      steps.push({ type: 'compare', i: largest, j: right })
      if (a[right] > a[largest]) largest = right
    }

    if (largest === i) break

    steps.push({ type: 'swap', i, j: largest })
    ;[a[i], a[largest]] = [a[largest], a[i]]
    i = largest
  }

  steps.push({ type: 'done' })
  return steps
}

export function describeHeapStep(step: HeapStep): string {
  switch (step.type) {
    case 'push':
      return `Inserted ${step.value} at the next open leaf position.`
    case 'compare':
      return `Comparing the node at index ${step.i} with the node at index ${step.j}.`
    case 'swap':
      return `Swapping the nodes at indices ${step.i} and ${step.j}.`
    case 'extract-root':
      return `Extracted ${step.value} as the maximum (the root).`
    case 'pop-last':
      return 'Moved the last leaf to the root, then removed the old last leaf.'
    case 'done':
      return 'Heap property restored.'
  }
}
