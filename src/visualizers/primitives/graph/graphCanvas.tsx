'use client'
import Node from './node'
import Edge from './edge'

import { GraphCanvasProps } from './types'

type Props = GraphCanvasProps

export default function GraphCanvas({ nodes, edges }: Props) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  const PADDING = 60

  const xs = nodes.map((n) => n.x)
  const ys = nodes.map((n) => n.y)

  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const viewWidth = maxX - minX + PADDING * 2
  const viewHeight = maxY - minY + PADDING * 2

  return (
    <svg
      viewBox={`${minX - PADDING} ${minY - PADDING} ${viewWidth} ${viewHeight}`}
      className="w-full max-h-80 border rounded bg-white"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Edges */}
      {edges.map((edge) => {
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
            state={edge.state}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <Node key={node.id} node={node} state={node.state} />
      ))}
    </svg>
  )
}
