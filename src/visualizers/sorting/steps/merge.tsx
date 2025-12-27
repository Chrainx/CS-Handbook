import { Step } from './types'

export function mergeSortSteps(arr: number[]): Step[] {
  const steps: Step[] = []
  const a = [...arr]

  function mergeSort(l: number, r: number) {
    // ✅ BASE CASE: range of size 0 or 1
    if (l >= r) {
      steps.push({ type: 'base', l, r })
      return
    }

    const mid = Math.floor((l + r) / 2)

    steps.push({ type: 'split', l, r, mid })

    mergeSort(l, mid)
    mergeSort(mid + 1, r)

    const left = a.slice(l, mid + 1)
    const right = a.slice(mid + 1, r + 1)

    // Buffer init
    steps.push({
      type: 'buffer-init',
      left: [...left],
      right: [...right],
      l,
      r,
      mid,
    })

    let i = 0
    let j = 0
    let k = l

    while (i < left.length && j < right.length) {
      steps.push({
        type: 'merge-compare',
        leftIndex: i,
        rightIndex: j,
      })

      if (left[i] <= right[j]) {
        steps.push({
          type: 'merge-write',
          index: k,
          value: left[i],
          from: 'left',
        })
        a[k++] = left[i++]
      } else {
        steps.push({
          type: 'merge-write',
          index: k,
          value: right[j],
          from: 'right',
        })
        a[k++] = right[j++]
      }
    }

    while (i < left.length) {
      steps.push({
        type: 'merge-write',
        index: k,
        value: left[i],
        from: 'left',
      })
      a[k++] = left[i++]
    }

    while (j < right.length) {
      steps.push({
        type: 'merge-write',
        index: k,
        value: right[j],
        from: 'right',
      })
      a[k++] = right[j++]
    }
  }

  mergeSort(0, a.length - 1)
  steps.push({ type: 'done' })
  return steps
}
