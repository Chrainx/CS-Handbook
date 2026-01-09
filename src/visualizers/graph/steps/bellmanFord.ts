import { GraphData } from '@/visualizers/primitives/graph/data'
import { GraphStep } from '@/visualizers/steps/types'

export function bellmanFordSteps(graph: GraphData, start: string): GraphStep[] {
  const steps: GraphStep[] = []

  const dist: Record<string, number> = {}
  const prev: Record<string, string | null> = {}

  // ---------- INIT ----------
  for (const node of graph.nodes) {
    dist[node.id] = Infinity
    prev[node.id] = null
  }

  dist[start] = 0

  steps.push({
    type: 'set-distance',
    node: start,
    distance: 0,
    from: null,
  })

  const V = graph.nodes.length

  const edgesByFrom: Record<string, typeof graph.edges> = {}

  for (const node of graph.nodes) {
    edgesByFrom[node.id] = []
  }

  for (const edge of graph.edges) {
    edgesByFrom[edge.from].push(edge)
  }

  for (const u in edgesByFrom) {
    edgesByFrom[u].sort((a, b) => a.to.localeCompare(b.to))
  }

  // ---------- RELAX EDGES (V - 1 PASSES) ----------
  for (let pass = 1; pass <= V - 1; pass++) {
    steps.push({ type: 'bf-pass', pass })
    for (const u of graph.nodes.map((n) => n.id)) {
      for (const edge of edgesByFrom[u]) {
        const v = edge.to
        const w = edge.weight ?? 1
        const directed = edge.directed === true

        steps.push({ type: 'activate-edge', from: u, to: v })

        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w

          steps.push({
            type: 'relax-edge',
            from: u,
            to: v,
            newDist: dist[v],
          })

          steps.push({
            type: 'set-distance',
            node: v,
            distance: dist[v],
            from: u,
          })
        }

        if (!directed) {
          steps.push({ type: 'activate-edge', from: v, to: u })

          if (dist[v] !== Infinity && dist[v] + w < dist[u]) {
            dist[u] = dist[v] + w

            steps.push({
              type: 'relax-edge',
              from: v,
              to: u,
              newDist: dist[u],
            })

            steps.push({
              type: 'set-distance',
              node: u,
              distance: dist[u],
              from: v,
            })
          }
        }
      }
    }
  }

  steps.push({ type: 'done' })
  return steps
}
