import { SortingStep } from '../../steps/types'

export function quickSortSteps(arr: number[]): SortingStep[] {
  const steps: SortingStep[] = []
  const a = [...arr]

  function quickSort(l: number, r: number) {
    if (l >= r) {
      steps.push({ type: 'base', l, r })
      return
    }

    const pivotIndex = r
    const pivotValue = a[pivotIndex]

    // 1) choose pivot
    steps.push({
      type: 'pivot',
      pivotIndex,
      l,
      r,
    })

    let i = l // boundary (next left-group slot)

    // 2–9) compare and partition
    for (let j = l; j < r; j++) {
      steps.push({
        type: 'quick-compare',
        i,
        j,
        pivotIndex,
      })

      if (a[j] < pivotValue) {
        // 5 / 8) decision indicator
        steps.push({
          type: 'mark',
          index: j,
        })

        // 6 / 9) swap into boundary
        if (i !== j) {
          steps.push({
            type: 'swap',
            i,
            j,
          })
        }

        ;[a[i], a[j]] = [a[j], a[i]]
        i++ // boundary moves
      }
    }

    // 10) REQUIRED STEP: state that this is the pivot placement moment
    steps.push({
      type: 'pivot-final',
      pivotIndex: pivotIndex,
    })

    // 11) place pivot
    if (i !== pivotIndex) {
      steps.push({
        type: 'swap',
        i,
        j: pivotIndex,
        isPivotSwap: true,
      })
    }

    ;[a[i], a[pivotIndex]] = [a[pivotIndex], a[i]]

    // recurse
    quickSort(l, i - 1)
    quickSort(i + 1, r)
  }

  quickSort(0, a.length - 1)
  steps.push({ type: 'done' })

  return steps
}
