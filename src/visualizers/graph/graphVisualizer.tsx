'use client'

import { useEffect, useReducer, useState } from 'react'
import AlgorithmSelectModal from '@/components/visualizer-ui/algorithmSelectModal'
import StepControls from '../stepControls'
import { describeStep } from '../describeStep'
import VisualizerLegend from '../legend/legend'

import { GraphAlgorithmId } from './state/types'

import QueueView from './components/queueView'
import StackView from './components/stackView'

import GraphCanvas from '../primitives/graph/grapchCanvas'
import { GraphData } from '@/visualizers/primitives/graph/types'
import { GraphStep } from '@/visualizers/steps/types'
import { graphReducer, initialGraphVisualState } from './state/reducer'

import { bfsSteps } from './steps/bfs'
import { dfsSteps } from './steps/dfs'

export const GRAPH_ALGORITHMS: {
  id: GraphAlgorithmId
  name: string
}[] = [
  { id: 'bfs', name: 'Breadth-First Search' },
  { id: 'dfs', name: 'Depth-First Search' },
]

export const GRAPH_ALGO_META: Record<
  GraphAlgorithmId,
  { structure: 'queue' | 'stack' }
> = {
  bfs: { structure: 'queue' },
  dfs: { structure: 'stack' },
}

const GRAPH_STEP_GENERATORS: Record<
  string,
  (graph: GraphData, start: string) => GraphStep[]
> = {
  bfs: bfsSteps,
  dfs: dfsSteps,
}

const DEFAULT_GRAPH: GraphData = {
  nodes: [
    { id: 'A', x: 300, y: 60 }, // root

    { id: 'B', x: 150, y: 160 },
    { id: 'C', x: 450, y: 160 },

    { id: 'D', x: 80, y: 280 },
    { id: 'E', x: 220, y: 280 },
    { id: 'F', x: 380, y: 280 },
    { id: 'G', x: 520, y: 280 },
  ],
  edges: [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },

    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },

    { from: 'C', to: 'F' },
    { from: 'C', to: 'G' },
  ],
}

export default function GraphVisualizer() {
  const [algorithm, setAlgorithm] = useState<GraphAlgorithmId | null>(null)
  const [open, setOpen] = useState(true)

  const [graph] = useState<GraphData>(DEFAULT_GRAPH)
  const [steps, setSteps] = useState<GraphStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)

  const [stepText, setStepText] = useState('')

  const [state, dispatch] = useReducer(graphReducer, initialGraphVisualState)

  function generateSteps(algo: string) {
    const generator = GRAPH_STEP_GENERATORS[algo]
    if (!generator) return

    const generated = generator(graph, 'A') // start node hardcoded for now
    setSteps(generated)
    setStepIndex(0)
  }

  function replayStepsUpTo(target: number) {
    dispatch({ type: 'reset' })

    for (let i = 0; i < target; i++) {
      dispatch(steps[i])
    }

    setStepIndex(target)
    setStepText(target > 0 ? describeStep(steps[target - 1]) : '')
  }

  function stepForward() {
    if (stepIndex >= steps.length) return

    const step = steps[stepIndex]
    dispatch(step)
    setStepText(describeStep(step))
    setStepIndex((i) => i + 1)
  }

  function stepBack() {
    if (stepIndex <= 0) return
    replayStepsUpTo(stepIndex - 1)
  }

  function reset() {
    replayStepsUpTo(0)
  }

  return (
    <>
      <AlgorithmSelectModal
        open={open}
        algorithms={GRAPH_ALGORITHMS}
        currentAlgorithm={algorithm}
        onSelect={(id) => {
          const algo = id as GraphAlgorithmId
          setAlgorithm(algo)
          setOpen(false)
          generateSteps(id)
          replayStepsUpTo(0)
          setStepText('')
        }}
        onClose={() => setOpen(false)}
      />

      {algorithm && (
        <>
          {/* Header */}
          <div className="mb-6 rounded border bg-gray-50 px-4 py-3">
            <div className="text-sm text-gray-500">Current Algorithm</div>
            <div className="text-lg font-semibold">
              {GRAPH_ALGORITHMS.find((a) => a.id === algorithm)?.name}
            </div>
            <div className="text-sm">
              Step <strong>{stepIndex}</strong> /{' '}
              <strong>{steps.length}</strong>
            </div>
          </div>

          {/* Graph */}
          {GRAPH_ALGO_META[algorithm]?.structure === 'queue' && (
            <QueueView queue={state.queue ?? []} />
          )}

          {GRAPH_ALGO_META[algorithm]?.structure === 'stack' && (
            <StackView stack={state.stack ?? []} />
          )}
          <GraphCanvas graph={graph} state={state} />

          <VisualizerLegend algorithm="graph" />

          {stepText && (
            <div className="my-3 rounded border bg-blue-50 px-4 py-2 text-sm">
              {stepText}
            </div>
          )}

          {/* Controls */}
          <StepControls
            canStepBack={stepIndex > 0}
            canStepForward={stepIndex < steps.length}
            onStepBack={stepBack}
            onStepForward={stepForward}
            onReset={reset}
          />
        </>
      )}
    </>
  )
}
