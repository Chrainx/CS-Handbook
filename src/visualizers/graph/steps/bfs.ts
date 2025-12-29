import { GraphData } from '@/visualizers/primitives/graph/types'
import { GraphStep } from '@/visualizers/steps/types'

export function bfsSteps(graph: GraphData, start: string): GraphStep[] {
  const steps: GraphStep[] = []

  const visited = new Set<string>()
  const queue: string[] = []

  // adjacency list
  const adj = new Map<string, string[]>()
  graph.nodes.forEach((n) => adj.set(n.id, []))
  graph.edges.forEach((e) => {
    adj.get(e.from)?.push(e.to)
    adj.get(e.to)?.push(e.from) // undirected
  })

  // start
  steps.push({ type: 'visit-node', node: start })
  queue.push(start)
  visited.add(start)

  while (queue.length > 0) {
    const current = queue.shift()!

    steps.push({ type: 'set-active-node', node: current })

    for (const neighbor of adj.get(current) ?? []) {
      steps.push({
        type: 'activate-edge',
        from: current,
        to: neighbor,
      })

      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        steps.push({ type: 'visit-node', node: neighbor })
        queue.push(neighbor)
      }
    }

    steps.push({ type: 'mark-visited', node: current })
  }

  steps.push({ type: 'done' })
  return steps
}
