'use client'

import { useState } from 'react'
import StepControls from '@/visualizers/stepControls'
import GraphCanvas from '@/visualizers/primitives/graph/graphCanvas'
import { StepTextPanel } from '@/visualizers/shared/stepTextPanel'
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

export default function TreeVisualizer() {
  const [input, setInput] = useState('')

  const { state, text, index, length, commitMany, back, forward, reset } =
    useOperationHistory<TreeStep, typeof initialTreeVisualState>({
      reducer: treeReducer,
      initialState: initialTreeVisualState,
      describeStep: describeTreeStep,
    })

  function insert() {
    const value = Number(input)
    if (input.trim() === '' || Number.isNaN(value)) return
    commitMany(bstInsertSteps(state.root, value))
    setInput('')
  }

  function traverse(order: TraversalOrder) {
    if (!state.root) return
    commitMany(bstTraverseSteps(state.root, order))
  }

  return (
    <>
      <div className="mb-6 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="text-sm text-muted-foreground">
          Binary Search Tree Visualizer
        </div>
        <div className="text-sm text-foreground">
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

        <p className="w-full text-xs text-muted-foreground">
          Each Insert or Traverse queues its comparisons/visits - use Next
          Step to watch them play out one at a time.
        </p>
      </div>

      {!state.root ? (
        <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-sm">
          Tree is empty
        </div>
      ) : (
        <GraphCanvas {...treeStateToGraph(state)} />
      )}

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
