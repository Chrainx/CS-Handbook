import { useEffect, useState } from 'react'

const STEP_DELAY_MS = 1000

/**
 * Drives an interactive (user-triggered, not precomputed) data structure
 * visualizer. Unlike useStepPlayer - which replays a fixed, pre-generated
 * step array for an algorithm run - here the step history grows as the user
 * performs operations, and running a new operation while stepped back into
 * history discards the discarded-then-overwritten "future" steps (standard
 * undo/redo semantics). State is derived by folding the reducer over the
 * visible history slice rather than tracked separately, so back/forward
 * needs no replay-via-dispatch loop.
 *
 * Every operation - whether it's a single push or a multi-step sift/hash -
 * auto-plays through its own steps one at a time as soon as it's run,
 * rather than snapping straight to the end state or requiring a manual
 * first click to see anything happen. Play/pause and manual step-back/
 * forward are available for inspecting at your own pace.
 */
export function useOperationHistory<TStep, TState>({
  reducer,
  initialState,
  describeStep,
}: {
  reducer: (state: TState, step: TStep) => TState
  initialState: TState
  describeStep: (step: TStep) => string
}) {
  const [history, setHistory] = useState<TStep[]>([])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)

  const state = history.slice(0, index).reduce(reducer, initialState)
  const lastStep = index > 0 ? history[index - 1] : null
  const text = lastStep !== null ? describeStep(lastStep) : ''

  // Reaching the end of the queued steps naturally stops the timer below
  // from ever being scheduled again, so `playing` doesn't need to be
  // reset here - `isPlaying` below derives the end state instead.
  const isPlaying = playing && index < history.length

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setIndex((i) => Math.min(history.length, i + 1))
    }, STEP_DELAY_MS)

    return () => clearTimeout(timer)
    // `index` must stay a dependency (even though the timeout only reads
    // it via the updater form) so the timer reschedules after every step -
    // otherwise the effect never re-runs once `isPlaying` itself stops
    // changing value between renders.
  }, [isPlaying, history.length, index])

  /** Queues one or more new steps (discarding any un-replayed "future"
   * steps from a previous operation), reveals the first one immediately -
   * so the triggering click always shows *something* happen right away -
   * and auto-plays through any remaining ones. */
  function run(steps: TStep[]) {
    if (steps.length === 0) return
    const next = [...history.slice(0, index), ...steps]
    setHistory(next)
    setIndex(index + 1)
    setPlaying(next.length > index + 1)
  }

  function play() {
    if (index < history.length) setPlaying(true)
  }

  function pause() {
    setPlaying(false)
  }

  function back() {
    setPlaying(false)
    setIndex((i) => Math.max(0, i - 1))
  }

  function forward() {
    setPlaying(false)
    setIndex((i) => Math.min(history.length, i + 1))
  }

  function reset() {
    setPlaying(false)
    setHistory([])
    setIndex(0)
  }

  return {
    state,
    text,
    lastStep,
    index,
    length: history.length,
    playing: isPlaying,
    run,
    play,
    pause,
    back,
    forward,
    reset,
  }
}
