import { GraphData } from '@/visualizers/primitives/graph/data'
import { GraphStep } from '@/visualizers/steps/types'

export function dfsSteps(graph: GraphData, start: string): GraphStep[] {
  const steps: GraphStep[] = []
  const visited = new Set<string>()

  // adjacency list
  const adj: Record<string, string[]> = {}
  for (const node of graph.nodes) adj[node.id] = []
  for (const edge of graph.edges) {
    adj[edge.from].push(edge.to)
    // if undirected:
    // adj[edge.to].push(edge.from)
  }

  function dfs(node: string) {
    visited.add(node)

    // push stack
    steps.push({ type: 'push-stack', node })

    // visit node
    steps.push({ type: 'visit-node', node })

    for (const next of adj[node]) {
      if (!visited.has(next)) {
        steps.push({
          type: 'activate-edge',
          from: node,
          to: next,
        })
        dfs(next)
      }
    }

    // pop stack
    steps.push({ type: 'pop-stack' })

    // mark done
    steps.push({ type: 'mark-visited', node })
  }

  dfs(start)
  steps.push({ type: 'done' })

  return steps
}
