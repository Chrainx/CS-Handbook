import { GraphData } from '@/visualizers/primitives/graph/data'
import { GraphStep } from '@/visualizers/steps/types'

export function bellmanFordSteps(graph: GraphData, start: string): GraphStep[] {
  const steps: GraphStep[] = []

  const dist: Record<string, number> = {}

  /* ================= INIT ================= */

  for (const node of graph.nodes) {
    dist[node.id] = Infinity
  }

  dist[start] = 0

  steps.push({
    type: 'set-distance',
    node: start,
    distance: 0,
    from: null,
  })

  const V = graph.nodes.length

  /* ================= MAIN RELAXATION ================= */
  /* Bellman–Ford runs |V| − 1 full passes over ALL edges */

  for (let pass = 1; pass <= V - 1; pass++) {
    for (const edge of graph.edges) {
      const u = edge.from
      const v = edge.to
      const w = edge.weight ?? 1

      // show edge being considered
      steps.push({
        type: 'activate-edge',
        from: u,
        to: v,
      })

      // relaxation check
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w

        // successful relaxation
        steps.push({
          type: 'relax-edge',
          from: u,
          to: v,
          newDist: dist[v],
        } as GraphStep)

        // update distance table
        steps.push({
          type: 'set-distance',
          node: v,
          distance: dist[v],
          from: u,
        })
      }
    }
  }

  /* ================= NEGATIVE CYCLE CHECK ================= */
  /* One extra pass to detect further relaxation */

  for (const edge of graph.edges) {
    const u = edge.from
    const v = edge.to
    const w = edge.weight ?? 1

    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      // highlight problematic edge
      steps.push({
        type: 'activate-edge',
        from: u,
        to: v,
      })
      // (optional later: negative-cycle step)
    }
  }

  steps.push({ type: 'done' })
  return steps
}
