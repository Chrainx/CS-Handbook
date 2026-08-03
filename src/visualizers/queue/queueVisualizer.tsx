'use client'

import { useState } from 'react'
import StepControls from '@/visualizers/stepControls'
import QueueView from '@/visualizers/shared/queueView'
import { StepTextPanel } from '@/visualizers/shared/stepTextPanel'
import { useOperationHistory } from '@/visualizers/shared/useOperationHistory'
import {
  queueReducer,
  initialQueueState,
  describeQueueStep,
  QueueStep,
} from './types'

export default function QueueVisualizer() {
  const [input, setInput] = useState('')

  const { state, text, index, length, commit, back, forward, reset } =
    useOperationHistory<QueueStep, typeof initialQueueState>({
      reducer: queueReducer,
      initialState: initialQueueState,
      describeStep: describeQueueStep,
    })

  function enqueue() {
    const value = Number(input)
    if (input.trim() === '' || Number.isNaN(value)) return
    commit({ type: 'enqueue', value })
    setInput('')
  }

  function dequeue() {
    if (state.array.length === 0) return
    const value = state.array[0]
    commit({ type: 'dequeue', value })
  }

  return (
    <>
      <div className="mb-6 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="text-sm text-muted-foreground">Queue Visualizer</div>
        <div className="text-sm text-foreground">
          Step <strong>{index}</strong> / <strong>{length}</strong>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <label className="text-sm text-muted-foreground">Value</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enqueue()}
          className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
          placeholder="e.g. 7"
        />
        <button
          onClick={enqueue}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:opacity-90"
        >
          Enqueue
        </button>
        <button
          onClick={dequeue}
          disabled={state.array.length === 0}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
        >
          Dequeue
        </button>
      </div>

      <QueueView queue={state.array.map(String)} />

      <StepTextPanel text={text} />

      <StepControls
        canStepBack={index > 0}
        canStepForward={index < length}
        onStepBack={back}
        onStepForward={forward}
        onReset={reset}
      />
    </>
  )
}
