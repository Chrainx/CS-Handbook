'use client'

import { useEffect, useReducer, useState } from 'react'
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

import { useSearchParams } from 'next/navigation'

export const GRAPH_ALGORITHMS: {
  id: GraphAlgorithmId
  name: string
  description: string
}[] = [
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    description:
      'Explores a graph level by level from a starting node. Breadth-First Search guarantees the shortest path in unweighted graphs and is commonly used for traversal, connectivity checks, and shortest path problems.',
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    description:
      'Traverses a graph by exploring as deep as possible along each branch before backtracking. Depth-First Search is useful for cycle detection, topological sorting, and exploring connected components.',
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra Algorithm',
    description:
      'Computes the shortest path from a source node to all other nodes in a graph with non-negative edge weights. It greedily selects the closest unvisited node and relaxes its outgoing edges.',
  },
  {
    id: 'topological',
    name: 'Topological Sort',
    description:
      'Produces a linear ordering of vertices in a directed acyclic graph (DAG) such that every directed edge goes from earlier to later in the ordering. Commonly used for scheduling and dependency resolution.',
  },
  {
    id: 'bellman-ford',
    name: 'Bellman-Ford',
    description:
      'Finds shortest paths from a single source even when negative edge weights are present. Unlike Dijkstra’s algorithm, it can detect negative-weight cycles but runs slower.',
  },
  {
    id: 'prim',
    name: 'Prim Algorithm',
    description:
      'Constructs a minimum spanning tree by starting from an arbitrary node and repeatedly adding the lowest-weight edge that connects the tree to a new vertex.',
  },
  {
    id: 'kruskal',
    name: 'Kruskal Algorithm',
    description:
      'Builds a minimum spanning tree by sorting all edges by weight and adding them one by one, skipping edges that would form a cycle. Often implemented using a union-find data structure.',
  },
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
  const searchParams = useSearchParams()
  const algoFromUrl = searchParams.get('algo') as GraphAlgorithmId | null

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

  useEffect(() => {
    if (!algoFromUrl) return
    if (!GRAPH_STEP_GENERATORS[algoFromUrl]) return

    const presetKey = GRAPH_PRESET_BY_ALGO[algoFromUrl]
    const presetGraph = GRAPH_PRESETS[presetKey]

    setGraph(presetGraph)
    setAlgorithm(algoFromUrl)
    setOpen(false)

    const generated = GRAPH_STEP_GENERATORS[algoFromUrl](presetGraph, 'A')
    setSteps(generated)

    dispatch({ type: 'reset' })
    player.reset()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

          const params = new URLSearchParams(window.location.search)
          params.set('algo', algo)
          window.history.replaceState(null, '', `?${params.toString()}`)
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
