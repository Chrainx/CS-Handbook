'use client'

import { GraphEdge, EdgeState, GraphNode } from './types'

type Props = {
  edge: GraphEdge
  fromNode: GraphNode
  toNode: GraphNode
  state?: EdgeState
}

function getEdgeStyle(state: EdgeState | undefined) {
  switch (state) {
    case 'active':
      return { stroke: '#f97316', strokeWidth: 3 } // orange
    case 'chosen':
      return { stroke: '#22c55e', strokeWidth: 3 } // green
    case 'relaxed':
      return { stroke: '#3b82f6', strokeWidth: 3 } // blue
    case 'default':
    default:
      return { stroke: '#64748b', strokeWidth: 2 } // slate
  }
}

export default function Edge({
  edge,
  fromNode,
  toNode,
  state = 'default',
}: Props) {
  const style = getEdgeStyle(state)
  return (
    <>
      {/* Edge line */}
      <line
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        stroke={style.stroke}
        strokeWidth={style.strokeWidth}
      />

      {/* Optional weight */}
      {edge.weight !== undefined && (
        <text
          x={(fromNode.x + toNode.x) / 2}
          y={(fromNode.y + toNode.y) / 2 - 5}
          textAnchor="middle"
          fontSize="12"
          fill="#334155"
        >
          {edge.weight}
        </text>
      )}
    </>
  )
}
