import { GraphData, GraphEdge } from '@/visualizers/primitives/graph/data'

export type AdjacencyEntry = {
  /** the node on the other end of the edge, relative to the node this entry is keyed under */
  to: string
  weight: number
  /** the edge exactly as stored in GraphData - always use this edge's own
   * from/to (not the traversal direction) when emitting steps, so the
   * edge-state key built from it matches how the canvas looks the edge up. */
  edge: GraphEdge
}

/**
 * Builds an adjacency list from GraphData. An edge is only traversable in
 * its stored from -> to direction when `directed` is true; otherwise both
 * endpoints get an entry, matching how bellmanFordSteps already treats
 * undirected edges.
 */
export function buildAdjacency(
  graph: GraphData
): Record<string, AdjacencyEntry[]> {
  const adj: Record<string, AdjacencyEntry[]> = {}
  for (const node of graph.nodes) adj[node.id] = []

  for (const edge of graph.edges) {
    const weight = edge.weight ?? 1

    adj[edge.from].push({ to: edge.to, weight, edge })

    if (edge.directed !== true) {
      adj[edge.to].push({ to: edge.from, weight, edge })
    }
  }

  return adj
}
