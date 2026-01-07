import { GraphData } from '@/visualizers/primitives/graph/data'
import { GraphStep } from '@/visualizers/steps/types'

export function topologicalSortSteps(
  graph: GraphData,
  _start: string // required for signature consistency
): GraphStep[] {
  void _start

  const steps: GraphStep[] = []

  const nodes = graph.nodes.map((n) => n.id)

  const adj: Record<string, string[]> = {}
  const inDegree: Record<string, number> = {}

  for (const n of nodes) {
    adj[n] = []
    inDegree[n] = 0
  }

  for (const e of graph.edges) {
    adj[e.from].push(e.to)
    inDegree[e.to]++
  }

  // queue init (all indegree 0)
  const queue: string[] = []
  for (const n of nodes) {
    if (inDegree[n] === 0) {
      queue.push(n)
      steps.push({ type: 'enqueue', node: n })
    }
  }

  // main loop
  while (queue.length > 0) {
    const u = queue.shift()!

    steps.push({ type: 'dequeue', node: u })
    steps.push({ type: 'visit-node', node: u })

    for (const v of adj[u]) {
      steps.push({ type: 'activate-edge', from: u, to: v })
      steps.push({ type: 'choose-edge', from: u, to: v })

      inDegree[v]--
      if (inDegree[v] === 0) {
        queue.push(v)
        steps.push({ type: 'enqueue', node: v })
      }
    }

    steps.push({ type: 'mark-visited', node: u })
  }

  steps.push({ type: 'done' })
  return steps
}
