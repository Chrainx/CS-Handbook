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
import { useAlgorithmSelectUrlSync } from '../shared/useAlgorithmSelectUrlSync'
import { AlgorithmHeaderCard } from '../shared/algorithmHeaderCard'
import { StepTextPanel } from '../shared/stepTextPanel'

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
  GraphAlgorithmId,
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
  const [graph, setGraph] = useState<GraphData>(GRAPH_PRESETS.tree)
  const [steps, setSteps] = useState<GraphStep[]>([])

  const [state, dispatch] = useReducer(graphReducer, initialGraphState)

  const { algorithm, open, setOpen, selectAlgorithm, closeModal } =
    useAlgorithmSelectUrlSync<GraphAlgorithmId>({
      validIds: Object.keys(GRAPH_STEP_GENERATORS) as GraphAlgorithmId[],
      onAlgorithmChosen: (algo) => {
        const presetGraph = GRAPH_PRESETS[GRAPH_PRESET_BY_ALGO[algo]]
        setGraph(presetGraph)
        setSteps(GRAPH_STEP_GENERATORS[algo](presetGraph, 'A'))
      },
    })

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

  // Reset the player whenever a (new) algorithm is loaded, once `steps` and
  // `algorithm` have both settled from the same selection.
  useEffect(() => {
    player.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm, steps])

  const safeIndex = Math.min(player.index, steps.length)

  const { output, currentBfPass, kruskalEdges, kruskalActiveIndex } =
    useGraphDerivedState({
      steps,
      index: safeIndex,
      algorithm,
    })

  return (
    <>
      <AlgorithmSelectModal
        open={open}
        algorithms={GRAPH_ALGORITHMS}
        currentAlgorithm={algorithm}
        onSelect={(id) => selectAlgorithm(id as GraphAlgorithmId)}
        onClose={closeModal}
      />

      {algorithm && (
        <>
          <AlgorithmHeaderCard
            name={GRAPH_ALGORITHMS.find((a) => a.id === algorithm)!.name}
            stepIndex={safeIndex}
            stepLength={player.length}
            onChangeAlgorithm={() => setOpen(true)}
          />

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

          <StepTextPanel text={player.text} />

          {/* OUTPUT PANEL */}
          {output.type === 'order' && output.nodes.length > 0 && (
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

          {output.type === 'distances' &&
            Object.keys(output.values).length > 0 && (
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
