import { GraphData } from '@/visualizers/primitives/graph/data'
import { GraphStep } from './types'
import { buildAdjacency } from '../adjacency'

type PQItem = {
  node: string
  priority: number
}

export function dijkstraSteps(graph: GraphData, start: string): GraphStep[] {
  const steps: GraphStep[] = []

  const dist: Record<string, number> = {}
  const prev: Record<string, string | null> = {}
  const visited = new Set<string>()
  const pq: PQItem[] = []
  const adjacency = buildAdjacency(graph)

  // ---------- INIT ----------
  for (const node of graph.nodes) {
    dist[node.id] = Infinity
    prev[node.id] = null
  }

  dist[start] = 0
  pq.push({ node: start, priority: 0 })

  steps.push({
    type: 'pq-push',
    item: { node: start, priority: 0 },
  })

  // ---------- MAIN LOOP ----------
  while (pq.length > 0) {
    pq.sort((a, b) => a.priority - b.priority)
    const { node: u, priority: du } = pq.shift()!

    steps.push({ type: 'pq-pop', node: u, priority: du })

    // ---- STALE / SKIP ----
    if (visited.has(u) || du > dist[u]) {
      steps.push({
        type: 'pq-skip-stale',
        node: u,
        priority: du,
      })
      continue
    }

    // ---- PROCESS NODE ----
    steps.push({ type: 'visit-node', node: u })

    for (const { to: v, weight: w, edge } of adjacency[u]) {
      if (visited.has(v)) continue

      steps.push({
        type: 'activate-edge',
        from: edge.from,
        to: edge.to,
      })

      const alt = dist[u] + w

      if (alt < dist[v]) {
        dist[v] = alt
        prev[v] = u

        steps.push({
          type: 'relax-edge',
          from: edge.from,
          to: edge.to,
          newDist: alt,
        } as GraphStep)

        steps.push({
          type: 'set-distance',
          node: v,
          distance: alt,
          from: u,
        })

        pq.push({ node: v, priority: alt })

        steps.push({
          type: 'pq-push',
          item: { node: v, priority: alt },
        })
      }
    }

    visited.add(u)
    steps.push({ type: 'mark-visited', node: u })
  }

  steps.push({ type: 'done' })
  return steps
}
