import {
  GraphAlgorithmId,
  GraphOutput,
  GRAPH_ALGO_CATEGORY,
} from '../state/types'
import { GraphStep } from '@/visualizers/graph/steps/types'

export function useGraphDerivedState({
  steps,
  index,
  algorithm,
}: {
  steps: GraphStep[]
  index: number
  algorithm: GraphAlgorithmId | null
}) {
  const category = algorithm ? GRAPH_ALGO_CATEGORY[algorithm] : null

  function deriveTopoOrder(): string[] {
    const order: string[] = []
    for (let i = 0; i < index; i++) {
      const s = steps[i]
      if (s?.type === 'mark-visited') {
        order.push(s.node)
      }
    }
    return order
  }

  function deriveDistances(): Record<string, number> {
    const dist: Record<string, number> = {}
    for (let i = 0; i < index; i++) {
      const s = steps[i]
      if (s?.type === 'set-distance') {
        dist[s.node] = s.distance
      }
    }
    return dist
  }

  function deriveBellmanFordPass(): number | null {
    let pass: number | null = null
    for (let i = 0; i < index; i++) {
      const s = steps[i]
      if (s?.type === 'bf-pass') {
        pass = s.pass
      }
    }
    return pass
  }

  function deriveKruskalEdges() {
    return steps
      .filter(
        (s): s is Extract<GraphStep, { type: 'kruskal-edge' }> =>
          s.type === 'kruskal-edge'
      )
      .map((s) => ({
        from: s.from,
        to: s.to,
        weight: s.weight,
      }))
  }

  function deriveKruskalActiveIndex(): number | null {
    for (let i = index - 1; i >= 0; i--) {
      const s = steps[i]
      if (s?.type === 'kruskal-edge') return s.index
    }
    return null
  }

  const output: GraphOutput = (() => {
    if (!algorithm) return { type: 'none' }

    if (category === 'dependency') {
      return {
        type: 'order',
        nodes: deriveTopoOrder(),
      }
    }

    if (category === 'shortest-path') {
      const values = deriveDistances()
      return { type: 'distances', values }
    }

    return { type: 'none' }
  })()

  return {
    output,
    currentBfPass:
      algorithm === 'bellman-ford' ? deriveBellmanFordPass() : null,
    kruskalEdges: deriveKruskalEdges(),
    kruskalActiveIndex: deriveKruskalActiveIndex(),
  }
}
