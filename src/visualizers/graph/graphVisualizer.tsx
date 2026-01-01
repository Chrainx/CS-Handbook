'use client'

import { useReducer, useState } from 'react'
import AlgorithmSelectModal from '@/components/visualizer-ui/algorithmSelectModal'
import StepControls from '../stepControls'
import VisualizerLegend from '../legend/legend'

import { GraphAlgorithmId } from './state/types'

import QueueView from './components/queueView'
import StackView from './components/stackView'
import PriorityQueueView from '../primitives/priorityQueue/priorityQueueView'

import GraphCanvas from '../primitives/graph/graphCanvas'
import { GraphData } from '../primitives/graph/data'
import { GraphStep } from '@/visualizers/steps/types'
import { describeStep } from '../describeStep'

import { graphReducer } from './state/reducer'
import { initialGraphState } from './state/types'

import { bfsSteps } from './steps/bfs'
import { dfsSteps } from './steps/dfs'
import { dijkstraSteps } from './steps/dijkstra'

import { graphStateToCanvas } from './adapter/graphToCanvas'
import { graphStateToPriorityQueue } from './adapter/graphToPriorityQueue'

import { GRAPH_PRESETS } from './preset'

export const GRAPH_ALGORITHMS: {
  id: GraphAlgorithmId
  name: string
  description: string
}[] = [
  { id: 'bfs', name: 'Breadth-First Search', description: 'desc' },
  { id: 'dfs', name: 'Depth-First Search', description: 'desc' },
  { id: 'dijkstra', name: 'Dijkstra Algortihm', description: 'desc' },
]

export const GRAPH_ALGO_META: Record<
  GraphAlgorithmId,
  { structure: 'queue' | 'stack' | 'pq' }
> = {
  bfs: { structure: 'queue' },
  dfs: { structure: 'stack' },
  dijkstra: {
    structure: 'pq',
  },
  topological: {
    structure: 'queue',
  },
  prim: {
    structure: 'queue',
  },
  kruskal: {
    structure: 'queue',
  },
}

const GRAPH_STEP_GENERATORS: Record<
  string,
  (graph: GraphData, start: string) => GraphStep[]
> = {
  bfs: bfsSteps,
  dfs: dfsSteps,
  dijkstra: dijkstraSteps,
}

const GRAPH_PRESET_BY_ALGO: Record<
  GraphAlgorithmId,
  keyof typeof GRAPH_PRESETS
> = {
  bfs: 'tree',
  dfs: 'tree',
  topological: 'tree',

  dijkstra: 'weighted',
  prim: 'weighted',
  kruskal: 'weighted',
}

export default function GraphVisualizer() {
  const [algorithm, setAlgorithm] = useState<GraphAlgorithmId | null>(null)
  const [open, setOpen] = useState(true)

  const [graph, setGraph] = useState<GraphData>(GRAPH_PRESETS.tree)

  const [steps, setSteps] = useState<GraphStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)

  const [stepText, setStepText] = useState('')

  const [state, dispatch] = useReducer(graphReducer, initialGraphState)

  function generateSteps(algo: string, graph: GraphData) {
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
          const presetKey = GRAPH_PRESET_BY_ALGO[algo]
          const presetGraph = GRAPH_PRESETS[presetKey]
          setGraph(presetGraph)
          setAlgorithm(algo)
          setOpen(false)
          generateSteps(id, presetGraph)
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

          {/* Controls */}
          <div className="mb-4 flex gap-4">
            <button
              onClick={() => {
                setSteps([])
                setStepIndex(0)
                setStepText('')
                setOpen(true)
              }}
              className="rounded border px-3 py-1 text-sm"
            >
              Change Algorithm
            </button>
          </div>

          {/* Graph */}
          {GRAPH_ALGO_META[algorithm]?.structure === 'queue' && (
            <QueueView queue={state.queue ?? []} />
          )}

          {GRAPH_ALGO_META[algorithm]?.structure === 'stack' && (
            <StackView stack={state.stack ?? []} />
          )}

          {GRAPH_ALGO_META[algorithm]?.structure === 'pq' && (
            <PriorityQueueView {...graphStateToPriorityQueue(state)} />
          )}
          <GraphCanvas {...graphStateToCanvas(graph, state)} />

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
