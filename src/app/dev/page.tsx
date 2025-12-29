'use client'

import GraphCanvas from '@/visualizers/primitives/graph/grapchCanvas'
import Node from '@/visualizers/primitives/graph/node'
import { GraphData, GraphNode } from '@/visualizers/primitives/graph/types'
import { GraphVisualState } from '@/visualizers/graph/state/types'

export default function GraphTestPage() {
  const nodeA: GraphNode = { id: 'A', x: 150, y: 80 }
  const nodeB: GraphNode = { id: 'B', x: 350, y: 80 }
  const nodeC: GraphNode = { id: 'C', x: 250, y: 220 }

  const graph: GraphData = {
    nodes: [nodeA, nodeB, nodeC],
    edges: [
      { from: 'A', to: 'B', weight: 3 },
      { from: 'B', to: 'C', weight: 2 },
      { from: 'A', to: 'C', weight: 5 },
    ],
  }

  const testState: GraphVisualState = {
    nodes: {
      A: 'visited',
      B: 'visiting',
      C: 'active',
    },
    edges: {
      'A->B': 'chosen',
      'B->C': 'active',
      'A->C': 'relaxed',
    },
    activeNode: 'C',
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Graph Canvas Test</h1>

      {/* Test GraphCanvas */}
      <GraphCanvas graph={graph} state={testState} />

      {/* Test Node primitives directly */}
      <svg width={500} height={200} className="border rounded">
        <Node node={{ ...nodeA, x: 100, y: 100 }} state="visited" />
        <Node node={{ ...nodeB, x: 250, y: 100 }} state="visiting" />
        <Node node={{ ...nodeC, x: 400, y: 100 }} state="active" />
      </svg>
    </div>
  )
}
