import { GraphData } from '@/visualizers/primitives/graph/types'
import { GraphStep } from '@/visualizers/steps/types'

export function bfsSteps(graph: GraphData, start: string): GraphStep[] {
  const steps: GraphStep[] = []
  const visited = new Set<string>()
  const queue: string[] = []

  // enqueue start
  steps.push({ type: 'enqueue', node: start })
  queue.push(start)
  visited.add(start)

  while (queue.length > 0) {
    const node = queue.shift()!
    steps.push({ type: 'dequeue', node })
    steps.push({ type: 'visit-node', node })

    const neighbors = graph.edges
      .filter((e) => e.from === node)
      .map((e) => e.to)

    for (const next of neighbors) {
      steps.push({ type: 'activate-edge', from: node, to: next })

      if (!visited.has(next)) {
        visited.add(next)
        steps.push({ type: 'enqueue', node: next })
        queue.push(next)
      }
    }

    steps.push({ type: 'mark-visited', node })
  }

  steps.push({ type: 'done' })
  return steps
}
