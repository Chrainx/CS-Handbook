import { SortingStep } from './types'

/** Replays swap/buffer-write steps against a copy of `arr` to reconstruct
 * the final sorted array, so generators can be verified against real sort
 * output without depending on their internal (index-only) step shape. */
export function replaySortingSteps(arr: number[], steps: SortingStep[]) {
  const a = [...arr]
  for (const step of steps) {
    if (step.type === 'swap') {
      ;[a[step.i], a[step.j]] = [a[step.j], a[step.i]]
    } else if (step.type === 'buffer-write') {
      a[step.writeIndex] = step.value
    }
  }
  return a
}

export function sorted(arr: number[]) {
  return [...arr].sort((x, y) => x - y)
}
