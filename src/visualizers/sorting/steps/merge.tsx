import { SortingStep } from '@/visualizers/steps/types'

export function mergeSortSteps(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = []
  const a = [...arr]

  function mergeSort(l: number, r: number) {
    steps.push({ type: 'range-enter', l, r })
    if (l === r) {
      steps.push({ type: 'base', index: l })
      return
    }

    const mid = Math.floor((l + r) / 2)
    steps.push({ type: 'split', l, r, mid })

    mergeSort(l, mid)
    mergeSort(mid + 1, r)

    steps.push({ type: 'merge-start', l, r })

    const left = a.slice(l, mid + 1)
    const right = a.slice(mid + 1, r + 1)

    steps.push({
      type: 'buffer-init',
      left,
      right,
      writeIndex: l,
    })

    let i = 0
    let j = 0
    let k = l

    while (i < left.length && j < right.length) {
      steps.push({
        type: 'buffer-compare',
        leftIndex: i,
        rightIndex: j,
      })

      if (left[i] <= right[j]) {
        steps.push({
          type: 'buffer-write',
          value: left[i],
          writeIndex: k,
          from: 'left',
        })
        a[k++] = left[i++]
      } else {
        steps.push({
          type: 'buffer-write',
          value: right[j],
          writeIndex: k,
          from: 'right',
        })
        a[k++] = right[j++]
      }
    }

    while (i < left.length) {
      steps.push({
        type: 'buffer-write',
        value: left[i],
        writeIndex: k,
        from: 'left',
      })
      a[k++] = left[i++]
    }

    while (j < right.length) {
      steps.push({
        type: 'buffer-write',
        value: right[j],
        writeIndex: k,
        from: 'right',
      })
      a[k++] = right[j++]
    }

    steps.push({ type: 'merge-done', l, r })
  }

  mergeSort(0, a.length - 1)
  steps.push({ type: 'done' })
  return steps
}
