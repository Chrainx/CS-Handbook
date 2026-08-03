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
import { GraphStep } from './steps/types'
import { describeGraphStep } from './describeStep'

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
      'Traverses a graph level by level and finds shortest paths in unweighted graphs.',
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    description:
      'Explores a graph by going as deep as possible before backtracking.',
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra Algorithm',
    description:
      'Finds shortest paths from a source using greedy relaxation of edges.',
  },
  {
    id: 'topological',
    name: 'Topological Sort',
    description:
      'Orders nodes in a DAG so that all dependencies come before dependents.',
  },
  {
    id: 'bellman-ford',
    name: 'Bellman-Ford',
    description: 'Computes shortest paths even with negative edge weights.',
  },
  {
    id: 'prim',
    name: 'Prim Algorithm',
    description:
      'Builds a minimum spanning tree by growing from a starting node.',
  },
  {
    id: 'kruskal',
    name: 'Kruskal Algorithm',
    description:
      'Builds a minimum spanning tree by adding the smallest valid edges.',
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
    describeStep: describeGraphStep,
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
          <div className="mb-6 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
            <div className="text-sm text-muted-foreground">
              Current Algorithm
            </div>
            <div className="text-lg font-semibold text-foreground">
              {GRAPH_ALGORITHMS.find((a) => a.id === algorithm)?.name}
            </div>
            <div className="text-sm text-foreground">
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
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors"
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
            <div className="mb-2 text-sm font-semibold text-accent">
              Pass {currentBfPass} of Bellman–Ford
            </div>
          )}

          <GraphCanvas {...graphStateToCanvas(graph, state)} />

          <VisualizerLegend algorithm={algorithm} />

          {player.text && (
            <div className="my-3 rounded-xl border border-border bg-accent-soft px-4 py-2 text-sm text-foreground">
              {player.text}
            </div>
          )}

          {/* OUTPUT PANEL */}
          {output.type === 'order' && (
            <div className="my-4 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm">
              <div className="mb-2 font-semibold text-green-600 dark:text-green-400">
                Topological Order
              </div>

              <div className="flex flex-wrap gap-2">
                {output.nodes.map((n, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-green-500 px-2 py-1 font-mono text-white shadow-sm"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}

          {output.type === 'distances' && (
            <div className="my-4 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm">
              <div className="mb-2 font-semibold text-green-600 dark:text-green-400">
                Distances
              </div>

              <ul className="font-mono text-green-700 dark:text-green-300">
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
