import { useState } from 'react'

export function useStepPlayer<TStep, TAction, TContext = undefined>({
  steps,
  dispatch,
  describeStep,
  describeContext,
  resetAction,
}: {
  steps: TStep[]
  dispatch: (action: TAction) => void
  describeStep: (step: TStep, ctx: TContext) => string
  describeContext: TContext
  resetAction: TAction
}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')

  if (index > steps.length) {
    setIndex(0)
    dispatch(resetAction)
  }

  function replay(upto: number) {
    dispatch(resetAction)

    for (let i = 0; i < upto; i++) {
      dispatch(steps[i] as unknown as TAction)
    }

    setIndex(upto)
    setText(upto > 0 ? describeStep(steps[upto - 1], describeContext) : '')
  }

  function forward() {
    if (index >= steps.length) return
    const step = steps[index]
    dispatch(step as unknown as TAction)
    setText(describeStep(step, describeContext))
    setIndex(index + 1)
  }

  function back() {
    if (index <= 0) return
    replay(index - 1)
  }

  function reset() {
    replay(0)
  }

  return {
    index,
    text,
    length: steps.length,
    forward,
    back,
    reset,
    replay,
  }
}
