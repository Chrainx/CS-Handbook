'use client'

import { useReducer, useState } from 'react'
import AlgorithmSelectModal from '@/components/visualizer-ui/algorithmSelectModal'
import StepControls from '../stepControls'
import VisualizerLegend from '../legend/legend'

import {
  GraphAlgorithmId,
  GraphOutput,
  GRAPH_ALGO_CATEGORY,
} from './state/types'

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
import { topologicalSortSteps } from './steps/topological'
import { bellmanFordSteps } from './steps/bellmanFord'

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
  { id: 'topological', name: 'Topological Sort', description: 'desc' },
  { id: 'bellman-ford', name: 'Bellman Ford', description: 'desc' },
]

export const GRAPH_ALGO_META: Record<
  GraphAlgorithmId,
  { structure?: 'queue' | 'stack' | 'pq' }
> = {
  bfs: { structure: 'queue' },
  dfs: { structure: 'stack' },
  dijkstra: {
    structure: 'pq',
  },
  topological: {
    structure: 'queue',
  },
  'bellman-ford': {},
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
  topological: topologicalSortSteps,
  'bellman-ford': bellmanFordSteps,
}

const GRAPH_PRESET_BY_ALGO: Record<
  GraphAlgorithmId,
  keyof typeof GRAPH_PRESETS
> = {
  bfs: 'tree',
  dfs: 'tree',
  topological: 'dependency',
  'bellman-ford': 'bellmanFord',
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

  const [output, setOutput] = useState<GraphOutput>({ type: 'none' })

  const category = algorithm ? GRAPH_ALGO_CATEGORY[algorithm] : null

  const currentBfPass =
    algorithm === 'bellman-ford'
      ? deriveBellmanFordPass(steps, stepIndex)
      : null

  function deriveTopoOrder(steps: GraphStep[], upto: number): string[] {
    const order: string[] = []

    for (let i = 0; i < upto; i++) {
      const s = steps[i]
      if (s.type === 'mark-visited') {
        order.push(s.node)
      }
    }

    return order
  }

  function deriveDistances(steps: GraphStep[], upto: number) {
    const dist: Record<string, number> = {}

    for (let i = 0; i < upto; i++) {
      const s = steps[i]
      if (s.type === 'set-distance') {
        dist[s.node] = s.distance
      }
    }

    return dist
  }

  function deriveBellmanFordPass(
    steps: GraphStep[],
    upto: number
  ): number | null {
    let pass: number | null = null

    for (let i = 0; i < upto; i++) {
      const s = steps[i]
      if (s.type === 'bf-pass') {
        pass = s.pass
      }
    }

    return pass
  }

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

    if (category === 'dependency') {
      setOutput({
        type: 'order',
        nodes: deriveTopoOrder(steps, target),
      })
    } else if (category === 'shortest-path') {
      setOutput({
        type: 'distances',
        values: deriveDistances(steps, target),
      })
    } else {
      setOutput({ type: 'none' })
    }
  }

  function stepForward() {
    if (stepIndex >= steps.length) return

    const step = steps[stepIndex]
    dispatch({ ...step, algorithm: algorithm ?? undefined })

    const nextIndex = stepIndex + 1
    setStepIndex(nextIndex)
    setStepText(describeStep(step))

    if (category === 'dependency') {
      setOutput({
        type: 'order',
        nodes: deriveTopoOrder(steps, nextIndex),
      })
    }

    if (category === 'shortest-path' && step.type === 'set-distance') {
      setOutput({
        type: 'distances',
        values: deriveDistances(steps, nextIndex),
      })
    }
  }

  function stepBack() {
    if (stepIndex <= 0) return
    replayStepsUpTo(stepIndex - 1)
  }

  function reset() {
    replayStepsUpTo(0)
    setOutput({ type: 'none' })
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
          setOutput({ type: 'none' })
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
          {(category === 'traversal' || category === 'dependency') &&
            GRAPH_ALGO_META[algorithm]?.structure === 'queue' && (
              <QueueView queue={state.queue ?? []} />
            )}

          {category === 'traversal' &&
            GRAPH_ALGO_META[algorithm]?.structure === 'stack' && (
              <StackView stack={state.stack ?? []} />
            )}

          {category === 'shortest-path' &&
            GRAPH_ALGO_META[algorithm]?.structure === 'pq' &&
            state.pq && (
              <PriorityQueueView {...graphStateToPriorityQueue(state)} />
            )}

          {currentBfPass !== null && (
            <div className="mb-2 text-sm font-semibold text-purple-600">
              Pass {currentBfPass} of Bellman–Ford
            </div>
          )}

          <GraphCanvas {...graphStateToCanvas(graph, state)} />

          <VisualizerLegend algorithm="graph" />

          {stepText && (
            <div className="my-3 rounded border bg-blue-50 px-4 py-2 text-sm">
              {stepText}
            </div>
          )}

          {/* OUTPUT PANEL */}
          {output.type === 'order' && (
            <div className="my-4 rounded border border-green-500 bg-green-50 px-4 py-3 text-sm">
              <div className="mb-2 font-semibold text-green-700">
                Topological Order
              </div>

              <div className="flex flex-wrap gap-2">
                {output.nodes.map((n, i) => (
                  <span
                    key={i}
                    className="rounded bg-green-500 px-2 py-1 font-mono text-white"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}

          {output.type === 'distances' && (
            <div className="my-4 rounded border border-green-500 bg-green-50 px-4 py-3 text-sm">
              <div className="mb-2 font-semibold text-green-700">Distances</div>

              <ul className="font-mono text-green-800">
                {Object.entries(output.values).map(([node, dist]) => (
                  <li key={node}>
                    {node}: {dist}
                  </li>
                ))}
              </ul>
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
