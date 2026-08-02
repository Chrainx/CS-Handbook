import { GraphData } from '@/visualizers/primitives/graph/data'
import { GraphStep } from './types'

export function kruskalSteps(graph: GraphData): GraphStep[] {
  const steps: GraphStep[] = []

  /* ================= DSU ================= */

  const parent: Record<string, string> = {}

  const find = (x: string): string => {
    if (parent[x] !== x) parent[x] = find(parent[x])
    return parent[x]
  }

  const union = (a: string, b: string): boolean => {
    const ra = find(a)
    const rb = find(b)
    if (ra === rb) return false
    parent[rb] = ra
    return true
  }

  /* ================= INIT ================= */

  for (const node of graph.nodes) {
    parent[node.id] = node.id
  }

  const edges = graph.edges
    .map((e) => ({
      from: e.from,
      to: e.to,
      weight: e.weight ?? 1,
    }))
    .sort((a, b) => a.weight - b.weight)

  /* ================= MAIN LOOP ================= */

  edges.forEach((e, i) => {
    // sorted-edge pointer
    steps.push({
      type: 'kruskal-edge',
      index: i,
      from: e.from,
      to: e.to,
      weight: e.weight,
    })

    // edge under consideration
    steps.push({
      type: 'activate-edge',
      from: e.from,
      to: e.to,
    })

    // accept if no cycle
    if (union(e.from, e.to)) {
      steps.push({
        type: 'choose-edge',
        from: e.from,
        to: e.to,
      })
    }
  })

  steps.push({ type: 'done' })
  return steps
}
