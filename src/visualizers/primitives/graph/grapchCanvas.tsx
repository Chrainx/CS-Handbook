'use client'

import { GraphData } from './types'
import { GraphVisualState } from '@/visualizers/graph/state/types'
import Node from './node'
import Edge from './edge'

type Props = {
  graph: GraphData
  state: GraphVisualState
}

export default function GraphCanvas({ graph, state }: Props) {
  const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]))

  const PADDING = 60

  const xs = graph.nodes.map((n) => n.x)
  const ys = graph.nodes.map((n) => n.y)

  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const viewWidth = maxX - minX + PADDING * 2
  const viewHeight = maxY - minY + PADDING * 2

  return (
    <svg
      viewBox={`${minX - PADDING} ${minY - PADDING} ${viewWidth} ${viewHeight}`}
      className="w-full max-h-[320px] border rounded bg-white"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Edges */}
      {graph.edges.map((edge) => {
        const fromNode = nodeMap.get(edge.from)
        const toNode = nodeMap.get(edge.to)
        if (!fromNode || !toNode) return null

        const key = `${edge.from}->${edge.to}`

        return (
          <Edge
            key={key}
            edge={edge}
            fromNode={fromNode}
            toNode={toNode}
            state={state.edges?.[key] ?? 'default'}
          />
        )
      })}

      {/* Nodes */}
      {graph.nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          state={
            state.nodes?.[node.id] ??
            (state.activeNode === node.id ? 'active' : 'default')
          }
        />
      ))}
    </svg>
  )
}
