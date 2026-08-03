import { GraphData, GraphEdge } from '@/visualizers/primitives/graph/data'
import { GraphStep } from '@/visualizers/steps/types'
import { buildAdjacency } from '../adjacency'

type PQItem = {
  node: string
  priority: number
}

export function primSteps(graph: GraphData, start: string): GraphStep[] {
  const steps: GraphStep[] = []

  const visited = new Set<string>()
  const key: Record<string, number> = {}
  const parentEdge: Record<string, GraphEdge | null> = {}
  const pq: PQItem[] = []
  const adjacency = buildAdjacency(graph)

  // ---------- INIT ----------
  for (const node of graph.nodes) {
    key[node.id] = Infinity
    parentEdge[node.id] = null
  }

  key[start] = 0
  pq.push({ node: start, priority: 0 })

  steps.push({
    type: 'pq-push',
    item: { node: start, priority: 0 },
  })

  // ---------- MAIN LOOP ----------
  while (pq.length > 0) {
    pq.sort((a, b) => a.priority - b.priority)
    const { node: u, priority: ku } = pq.shift()!

    steps.push({
      type: 'pq-pop',
      node: u,
      priority: ku,
    })

    // stale entry
    if (visited.has(u) || ku !== key[u]) continue

    // accept node
    if (parentEdge[u]) {
      steps.push({
        type: 'choose-edge',
        from: parentEdge[u]!.from,
        to: parentEdge[u]!.to,
      })
    }

    steps.push({ type: 'visit-node', node: u })
    visited.add(u)
    steps.push({ type: 'mark-visited', node: u })

    // relax edges to unvisited neighbors
    for (const { to: v, weight: w, edge } of adjacency[u]) {
      if (visited.has(v)) continue

      steps.push({
        type: 'activate-edge',
        from: edge.from,
        to: edge.to,
      })

      if (w < key[v]) {
        key[v] = w
        parentEdge[v] = edge

        steps.push({
          type: 'relax-edge',
          from: edge.from,
          to: edge.to,
          newDist: w,
        })

        steps.push({
          type: 'set-distance',
          node: v,
          distance: w,
          from: u,
        })

        pq.push({ node: v, priority: w })
        steps.push({
          type: 'pq-push',
          item: { node: v, priority: w },
        })
      }
    }
  }

  steps.push({ type: 'done' })
  return steps
}
