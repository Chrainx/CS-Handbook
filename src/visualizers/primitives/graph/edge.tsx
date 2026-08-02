'use client'

import { GraphEdge, GraphNode } from './data'
import { EdgeState } from '@/visualizers/graph/state/types'

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
      return { stroke: '#a855f7', strokeWidth: 3 } // purple
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
        strokeLinecap="round"
        style={{ transition: 'stroke 250ms ease, stroke-width 200ms ease' }}
      />

      {/* Optional weight */}
      {edge.weight !== undefined && (
        <text
          x={(fromNode.x + toNode.x) / 2}
          y={(fromNode.y + toNode.y) / 2 - 6}
          textAnchor="middle"
          fontSize="11"
          fontWeight={600}
          fill="#334155"
          stroke="white"
          strokeWidth={3}
          paintOrder="stroke"
        >
          {edge.weight}
        </text>
      )}
    </>
  )
}
