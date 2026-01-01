/* ============================================================================
 * Graph rendering props (DUMB, NO LOGIC)
 * ========================================================================== */

import { NodeState, EdgeState } from '@/visualizers/graph/state/types'

export type GraphCanvasProps = {
  nodes: {
    id: string
    x: number
    y: number
    label?: string
    state?: NodeState
  }[]

  edges: {
    from: string
    to: string
    state?: EdgeState
    directed?: boolean
    weight?: number
  }[]
}
