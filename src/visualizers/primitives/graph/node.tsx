'use client'

import { GraphNode } from './data'
import { NodeState } from '@/visualizers/graph/state/types'

type Props = {
  node: GraphNode
  state?: NodeState
  radius?: number
}

function getNodeColor(state: NodeState | undefined) {
  switch (state) {
    case 'active':
      return '#f97316' // orange-500
    case 'visiting':
      return '#eab308' // yellow-500
    case 'visited':
      return '#22c55e' // green-500
    case 'default':
    default:
      return '#4f46e5' // accent (indigo-600)
  }
}

export default function Node({ node, state = 'default', radius = 18 }: Props) {
  return (
    <>
      {/* Node circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r={radius}
        fill={getNodeColor(state)}
        stroke="white"
        strokeWidth={2}
        style={{
          transition: 'fill 250ms ease, r 200ms ease',
          filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))',
        }}
      />

      {/* Node label */}
      <text
        x={node.x}
        y={node.y + 5}
        textAnchor="middle"
        fontSize="12"
        fontWeight={600}
        fill="white"
        pointerEvents="none"
      >
        {node.label ?? node.id}
      </text>
    </>
  )
}
