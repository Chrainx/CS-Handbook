import { useState } from 'react'

/**
 * Drives an interactive (user-triggered, not precomputed) data structure
 * visualizer. Unlike useStepPlayer - which replays a fixed, pre-generated
 * step array for an algorithm run - here the step history grows as the user
 * performs operations, and committing a new step while stepped back into
 * history discards the discarded-then-overwritten "future" steps (standard
 * undo/redo semantics). State is derived by folding the reducer over the
 * visible history slice rather than tracked separately, so back/forward
 * needs no replay-via-dispatch loop.
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

  const state = history.slice(0, index).reduce(reducer, initialState)
  const text = index > 0 ? describeStep(history[index - 1]) : ''

  function commit(step: TStep) {
    const next = [...history.slice(0, index), step]
    setHistory(next)
    setIndex(next.length)
  }

  /** Appends a whole batch of steps (e.g. every compare/swap of a single
   * heap insert) without advancing past them, so the caller can step
   * through the batch one sub-step at a time via forward(). */
  function commitMany(steps: TStep[]) {
    const next = [...history.slice(0, index), ...steps]
    setHistory(next)
  }

  function back() {
    setIndex((i) => Math.max(0, i - 1))
  }

  function forward() {
    setIndex((i) => Math.min(history.length, i + 1))
  }

  function reset() {
    setHistory([])
    setIndex(0)
  }

  return {
    state,
    text,
    index,
    length: history.length,
    commit,
    commitMany,
    back,
    forward,
    reset,
  }
}
