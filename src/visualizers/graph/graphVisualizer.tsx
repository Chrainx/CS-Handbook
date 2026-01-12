'use client'

import { useReducer, useState } from 'react'
import AlgorithmSelectModal from '@/components/visualizer-ui/algorithmSelectModal'
import StepControls from '../stepControls'
import VisualizerLegend from '../legend/legend'

import { GraphAlgorithmId } from './state/types'

import QueueView from './components/queueView'
import StackView from './components/stackView'
import SortedEdgesView from './components/sortedEdgeView'
import PriorityQueueView from '../primitives/priorityQueue/priorityQueueView'

import GraphCanvas from '../primitives/graph/graphCanvas'
import { GraphData } from '../primitives/graph/data'
import { GraphStep } from '@/visualizers/steps/types'
import { describeStep } from '../describeStep'

import { useGraphDerivedState } from './hooks/useGraphDerivedState'

import { graphReducer } from './state/reducer'
import { initialGraphState } from './state/types'

import { bfsSteps } from './steps/bfs'
import { dfsSteps } from './steps/dfs'
import { dijkstraSteps } from './steps/dijkstra'
import { topologicalSortSteps } from './steps/topological'
import { bellmanFordSteps } from './steps/bellmanFord'
import { primSteps } from './steps/prim'
import { kruskalSteps } from './steps/kruskal'

import { graphStateToCanvas } from './adapter/graphToCanvas'
import { graphStateToPriorityQueue } from './adapter/graphToPriorityQueue'

import { GRAPH_PRESETS } from './preset'

import { useStepPlayer } from '../shared/useStepPlayer'

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
  { id: 'prim', name: 'Prim Algorithm', description: 'desc' },
  { id: 'kruskal', name: 'Kruskal Algorithm', description: 'desc' },
]

export const GRAPH_ALGO_META: Record<
  GraphAlgorithmId,
  { structure?: 'queue' | 'stack' | 'pq' | 'sortedEdge' }
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
    structure: 'pq',
  },
  kruskal: {
    structure: 'sortedEdge',
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
  prim: primSteps,
  kruskal: kruskalSteps,
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

  const [state, dispatch] = useReducer(graphReducer, initialGraphState)

  const player = useStepPlayer<
    GraphStep,
    GraphStep & { algorithm?: GraphAlgorithmId },
    { algorithm: GraphAlgorithmId | null }
  >({
    steps,
    dispatch,
    describeStep,
    describeContext: { algorithm },
    resetAction: { type: 'reset' },
  })

  const safeIndex = Math.min(player.index, steps.length)

  const { output, currentBfPass, kruskalEdges, kruskalActiveIndex } =
    useGraphDerivedState({
      steps,
      index: safeIndex,
      algorithm,
    })

  function generateSteps(algo: string, graph: GraphData) {
    const generator = GRAPH_STEP_GENERATORS[algo]
    if (!generator) return

    player.reset()
    const generated = generator(graph, 'A') // start node hardcoded for now
    setSteps(generated)
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
        }}
        onClose={() => {
          if (algorithm !== null) {
            setOpen(false)
          }
        }}
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
              Step <strong>{safeIndex}</strong> /{' '}
              <strong>{player.length}</strong>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-4 flex gap-4">
            <button
              onClick={() => {
                setOpen(true)
              }}
              className="rounded border px-3 py-1 text-sm"
            >
              Change Algorithm
            </button>
          </div>

          {/* Graph */}
          {/* Data structure visualization */}
          {GRAPH_ALGO_META[algorithm]?.structure === 'queue' && (
            <QueueView queue={state.queue ?? []} />
          )}

          {GRAPH_ALGO_META[algorithm]?.structure === 'stack' && (
            <StackView stack={state.stack ?? []} />
          )}

          {GRAPH_ALGO_META[algorithm]?.structure === 'pq' && state.pq && (
            <PriorityQueueView {...graphStateToPriorityQueue(state)} />
          )}

          {GRAPH_ALGO_META[algorithm]?.structure === 'sortedEdge' && (
            <SortedEdgesView
              edges={kruskalEdges}
              activeIndex={kruskalActiveIndex}
            />
          )}

          {currentBfPass !== null && (
            <div className="mb-2 text-sm font-semibold text-purple-600">
              Pass {currentBfPass} of Bellman–Ford
            </div>
          )}

          <GraphCanvas {...graphStateToCanvas(graph, state)} />

          <VisualizerLegend algorithm={algorithm} />

          {player.text && (
            <div className="my-3 rounded border bg-blue-50 px-4 py-2 text-sm">
              {player.text}
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
            canStepBack={safeIndex > 0}
            canStepForward={safeIndex < player.length}
            onStepBack={player.back}
            onStepForward={player.forward}
            onReset={player.reset}
          />
        </>
      )}
    </>
  )
}
