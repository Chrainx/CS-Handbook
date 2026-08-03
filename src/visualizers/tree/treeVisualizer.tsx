'use client'

import { useState } from 'react'
import GraphCanvas from '@/visualizers/primitives/graph/graphCanvas'
import { StepTextPanel, StepTextVariant } from '@/visualizers/shared/stepTextPanel'
import { OperationControls } from '@/visualizers/shared/operationControls'
import { useOperationHistory } from '@/visualizers/shared/useOperationHistory'
import {
  bstInsertSteps,
  bstTraverseSteps,
  describeTreeStep,
  TreeStep,
  TraversalOrder,
} from './bst'
import { treeReducer, initialTreeVisualState } from './state'
import { treeStateToGraph } from './treeToGraph'

const TRAVERSAL_LABELS: Record<TraversalOrder, string> = {
  pre: 'Pre-order',
  in: 'In-order',
  post: 'Post-order',
}

function stepVariant(step: TreeStep | null): StepTextVariant {
  if (step?.type === 'duplicate') return 'warning'
  return 'default'
}

export default function TreeVisualizer() {
  const [input, setInput] = useState('')

  const {
    state,
    text,
    lastStep,
    index,
    length,
    playing,
    run,
    play,
    pause,
    back,
    forward,
    reset,
  } = useOperationHistory<TreeStep, typeof initialTreeVisualState>({
    reducer: treeReducer,
    initialState: initialTreeVisualState,
    describeStep: describeTreeStep,
  })

  function insert() {
    const value = Number(input)
    if (input.trim() === '' || Number.isNaN(value)) return
    run(bstInsertSteps(state.root, value))
    setInput('')
  }

  function traverse(order: TraversalOrder) {
    if (!state.root) return
    run(bstTraverseSteps(state.root, order))
  }

  return (
    <>
      <div className="mb-6 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="text-sm text-muted-foreground">
          Binary Search Tree Visualizer
        </div>
        <p className="mt-1 text-sm text-foreground">
          <strong>Insert</strong> walks down comparing against each node
          until it finds an empty spot; the traversal buttons walk the
          whole tree in that order. Each comparison or visit plays
          automatically - use Pause to stop and inspect, or Step
          Back/Forward to move manually.
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
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <label className="text-sm text-muted-foreground">Traverse</label>
        {(Object.keys(TRAVERSAL_LABELS) as TraversalOrder[]).map((order) => (
          <button
            key={order}
            onClick={() => traverse(order)}
            disabled={!state.root}
            className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
          >
            {TRAVERSAL_LABELS[order]}
          </button>
        ))}
      </div>

      {!state.root ? (
        <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
          Tree is empty
        </div>
      ) : (
        <GraphCanvas {...treeStateToGraph(state)} />
      )}

      <StepTextPanel text={text} variant={stepVariant(lastStep)} />

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
