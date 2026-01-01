import { GraphData } from '@/visualizers/primitives/graph/data'
import { GraphCanvasProps } from '@/visualizers/primitives/graph/types'
import { GraphState } from '../state/types'

export function graphStateToCanvas(
  graph: GraphData,
  state: GraphState
): GraphCanvasProps {
  return {
    nodes: graph.nodes.map((n) => ({
      ...n,
      state: state.nodes[n.id] ?? 'default',
    })),

    edges: graph.edges.map((e) => {
      const key = `${e.from}->${e.to}`
      return {
        ...e,
        state: state.edges[key] ?? 'default',
      }
    }),
  }
}
