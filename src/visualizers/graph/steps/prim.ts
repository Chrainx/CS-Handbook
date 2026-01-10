import { GraphData } from '@/visualizers/primitives/graph/data'
import { GraphStep } from '@/visualizers/steps/types'

type PQItem = {
  node: string
  priority: number
}

export function primSteps(graph: GraphData, start: string): GraphStep[] {
  const steps: GraphStep[] = []

  const visited = new Set<string>()
  const key: Record<string, number> = {}
  const parent: Record<string, string | null> = {}
  const pq: PQItem[] = []

  // ---------- INIT ----------
  for (const node of graph.nodes) {
    key[node.id] = Infinity
    parent[node.id] = null
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
    if (parent[u]) {
      steps.push({
        type: 'choose-edge',
        from: parent[u]!,
        to: u,
      })
    }

    steps.push({ type: 'visit-node', node: u })
    visited.add(u)
    steps.push({ type: 'mark-visited', node: u })

    // relax outgoing edges
    for (const e of graph.edges) {
      if (e.from !== u) continue

      const v = e.to
      const w = e.weight ?? 1
      if (visited.has(v)) continue

      steps.push({
        type: 'activate-edge',
        from: u,
        to: v,
      })

      if (w < key[v]) {
        key[v] = w
        parent[v] = u

        steps.push({
          type: 'relax-edge',
          from: u,
          to: v,
          newDist: w,
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
