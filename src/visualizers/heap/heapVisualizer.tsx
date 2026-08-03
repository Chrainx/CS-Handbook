'use client'

import { useState } from 'react'
import Bars from '@/visualizers/primitives/bars/bars'
import { StepTextPanel } from '@/visualizers/shared/stepTextPanel'
import { OperationControls } from '@/visualizers/shared/operationControls'
import { useOperationHistory } from '@/visualizers/shared/useOperationHistory'
import { heapInsertSteps, heapExtractMaxSteps, describeHeapStep, HeapStep } from './steps'
import { heapVisualReducer, initialHeapVisualState } from './state'
import { heapStateToBars } from './heapToBars'

export default function HeapVisualizer() {
  const [input, setInput] = useState('')

  const {
    state,
    text,
    index,
    length,
    playing,
    run,
    play,
    pause,
    back,
    forward,
    reset,
  } = useOperationHistory<HeapStep, typeof initialHeapVisualState>({
    reducer: heapVisualReducer,
    initialState: initialHeapVisualState,
    describeStep: describeHeapStep,
  })

  function insert() {
    const value = Number(input)
    if (input.trim() === '' || Number.isNaN(value)) return
    run(heapInsertSteps(state.array, value))
    setInput('')
  }

  function extractMax() {
    if (state.array.length === 0) return
    run(heapExtractMaxSteps(state.array))
  }

  return (
    <>
      <div className="mb-6 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="text-sm text-muted-foreground">
          Max-Heap Visualizer
        </div>
        <p className="mt-1 text-sm text-foreground">
          <strong>Insert</strong> adds a value and sifts it up until the
          heap property holds; <strong>Extract Max</strong> removes the
          root and sifts the last leaf down to replace it. Each comparison
          and swap plays automatically - use Pause to stop and inspect, or
          Step Back/Forward to move manually.
        </p>
        <div className="mt-2 text-sm text-muted-foreground">
          Step <strong>{index}</strong> / <strong>{length}</strong>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <label className="text-sm text-muted-foreground">Value</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && insert()}
          className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
          placeholder="e.g. 7"
        />
        <button
          onClick={insert}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:opacity-90"
        >
          Insert
        </button>
        <button
          onClick={extractMax}
          disabled={state.array.length === 0}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
        >
          Extract Max
        </button>
      </div>

      {state.array.length === 0 ? (
        <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
          Heap is empty
        </div>
      ) : (
        <Bars {...heapStateToBars(state)} />
      )}

      <StepTextPanel text={text} />

      <OperationControls
        playing={playing}
        canStepBack={index > 0}
        canStepForward={index < length}
        onPlay={play}
        onPause={pause}
        onStepBack={back}
        onStepForward={forward}
        onReset={reset}
      />
    </>
  )
}
