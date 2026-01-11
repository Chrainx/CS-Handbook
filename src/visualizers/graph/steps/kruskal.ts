import { GraphData } from '@/visualizers/primitives/graph/data'
import { GraphStep } from '@/visualizers/steps/types'

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
    // 🔹 drive SortedEdgesView
    steps.push({
      type: 'kruskal-edge',
      index: i,
      from: e.from,
      to: e.to,
      weight: e.weight,
    })

    // 🔹 highlight edge being considered
    steps.push({
      type: 'activate-edge',
      from: e.from,
      to: e.to,
    })

    // 🔹 cycle check
    if (union(e.from, e.to)) {
      // ✅ accepted into MST
      steps.push({
        type: 'choose-edge',
        from: e.from,
        to: e.to,
      })

      // optional (for consistency with Prim)
      steps.push({
        type: 'relax-edge',
        from: e.from,
        to: e.to,
        newDist: e.weight,
      })
    }
    // ❌ rejected edges simply do nothing
  })

  steps.push({ type: 'done' })
  return steps
}
