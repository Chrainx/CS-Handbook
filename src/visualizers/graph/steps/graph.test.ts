import { describe, expect, it } from 'vitest'
import { GraphData } from '@/visualizers/primitives/graph/data'
import { bfsSteps } from './bfs'
import { dfsSteps } from './dfs'
import { dijkstraSteps } from './dijkstra'
import { topologicalSortSteps } from './topological'
import { bellmanFordSteps } from './bellmanFord'
import { primSteps } from './prim'
import { kruskalSteps } from './kruskal'
import { GraphStep } from './types'

function node(id: string): { id: string; x: number; y: number } {
  return { id, x: 0, y: 0 }
}

function visitedNodes(steps: GraphStep[]) {
  return steps
    .filter((s) => s.type === 'visit-node')
    .map((s) => (s as { node: string }).node)
}

function finalDistances(steps: GraphStep[]) {
  const dist: Record<string, number> = {}
  for (const s of steps) {
    if (s.type === 'set-distance') dist[s.node] = s.distance
  }
  return dist
}

describe('bfsSteps / dfsSteps', () => {
  const tree: GraphData = {
    nodes: [node('A'), node('B'), node('C'), node('D')],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
    ],
  }

  const disconnected: GraphData = {
    nodes: [node('A'), node('B'), node('C')],
    edges: [{ from: 'A', to: 'B' }],
    // C is unreachable from A
  }

  it('bfs visits every reachable node exactly once', () => {
    const steps = bfsSteps(tree, 'A')
    expect(visitedNodes(steps).sort()).toEqual(['A', 'B', 'C', 'D'])
    expect(steps[steps.length - 1]).toEqual({ type: 'done' })
  })

  it('dfs visits every reachable node exactly once', () => {
    const steps = dfsSteps(tree, 'A')
    expect(visitedNodes(steps).sort()).toEqual(['A', 'B', 'C', 'D'])
    expect(steps[steps.length - 1]).toEqual({ type: 'done' })
  })

  it('bfs does not visit unreachable nodes', () => {
    const steps = bfsSteps(disconnected, 'A')
    expect(visitedNodes(steps).sort()).toEqual(['A', 'B'])
  })

  it('dfs does not visit unreachable nodes', () => {
    const steps = dfsSteps(disconnected, 'A')
    expect(visitedNodes(steps).sort()).toEqual(['A', 'B'])
  })

  it('handles a single-node graph', () => {
    const single: GraphData = { nodes: [node('A')], edges: [] }
    expect(visitedNodes(bfsSteps(single, 'A'))).toEqual(['A'])
    expect(visitedNodes(dfsSteps(single, 'A'))).toEqual(['A'])
  })
})

describe('dijkstraSteps', () => {
  // A -1-> B -2-> D, A -4-> C -1-> D : shortest A->D is via B (cost 3)
  const weighted: GraphData = {
    nodes: [node('A'), node('B'), node('C'), node('D')],
    edges: [
      { from: 'A', to: 'B', weight: 1 },
      { from: 'B', to: 'D', weight: 2 },
      { from: 'A', to: 'C', weight: 4 },
      { from: 'C', to: 'D', weight: 1 },
    ],
  }

  it('computes correct shortest-path distances', () => {
    const steps = dijkstraSteps(weighted, 'A')
    const dist = finalDistances(steps)
    expect(dist).toEqual({ A: 0, B: 1, C: 4, D: 3 })
    expect(steps[steps.length - 1]).toEqual({ type: 'done' })
  })

  it('leaves unreachable nodes without a set-distance step', () => {
    const withIsland: GraphData = {
      nodes: [...weighted.nodes, node('E')],
      edges: weighted.edges,
    }
    const dist = finalDistances(dijkstraSteps(withIsland, 'A'))
    expect(dist.E).toBeUndefined()
  })
})

describe('topologicalSortSteps', () => {
  const dag: GraphData = {
    nodes: [node('A'), node('B'), node('C'), node('D')],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'D' },
    ],
  }

  it('visits nodes only after all their dependencies are visited', () => {
    const steps = topologicalSortSteps(dag, 'A')
    const order = visitedNodes(steps)
    expect(order.indexOf('A')).toBeLessThan(order.indexOf('B'))
    expect(order.indexOf('A')).toBeLessThan(order.indexOf('C'))
    expect(order.indexOf('B')).toBeLessThan(order.indexOf('D'))
    expect(order.indexOf('C')).toBeLessThan(order.indexOf('D'))
    expect(order.sort()).toEqual(['A', 'B', 'C', 'D'])
  })
})

describe('bellmanFordSteps', () => {
  it('computes correct distances, including negative edge weights', () => {
    const negWeighted: GraphData = {
      nodes: [node('A'), node('B'), node('C')],
      edges: [
        { from: 'A', to: 'B', weight: 4, directed: true },
        { from: 'A', to: 'C', weight: 5, directed: true },
        { from: 'B', to: 'C', weight: -2, directed: true },
      ],
    }
    const steps = bellmanFordSteps(negWeighted, 'A')
    const dist = finalDistances(steps)
    // A->B (4), A->B->C (4 + -2 = 2) beats direct A->C (5)
    expect(dist).toEqual({ A: 0, B: 4, C: 2 })
    expect(steps[steps.length - 1]).toEqual({ type: 'done' })
  })
})

describe('primSteps / kruskalSteps', () => {
  // Minimum spanning tree here has total weight 3 (A-B:1, B-C:2), not the
  // direct A-C:4 edge.
  const weighted: GraphData = {
    nodes: [node('A'), node('B'), node('C')],
    edges: [
      { from: 'A', to: 'B', weight: 1 },
      { from: 'B', to: 'C', weight: 2 },
      { from: 'A', to: 'C', weight: 4 },
    ],
  }

  function chosenEdges(steps: GraphStep[]) {
    return steps
      .filter((s) => s.type === 'choose-edge')
      .map((s) => [(s as { from: string }).from, (s as { to: string }).to])
  }

  it('prim builds a minimum spanning tree', () => {
    const steps = primSteps(weighted, 'A')
    const chosen = chosenEdges(steps)
    expect(chosen).toHaveLength(2)
    expect(chosen).toContainEqual(['A', 'B'])
    expect(chosen).toContainEqual(['B', 'C'])
  })

  it('kruskal builds a minimum spanning tree', () => {
    const steps = kruskalSteps(weighted)
    const chosen = chosenEdges(steps)
    expect(chosen).toHaveLength(2)
    expect(chosen).toContainEqual(['A', 'B'])
    expect(chosen).toContainEqual(['B', 'C'])
    expect(steps[steps.length - 1]).toEqual({ type: 'done' })
  })

  it('kruskal rejects edges that would form a cycle', () => {
    const triangle: GraphData = {
      nodes: [node('A'), node('B'), node('C')],
      edges: [
        { from: 'A', to: 'B', weight: 1 },
        { from: 'B', to: 'C', weight: 1 },
        { from: 'A', to: 'C', weight: 1 },
      ],
    }
    const steps = kruskalSteps(triangle)
    expect(chosenEdges(steps)).toHaveLength(2)
  })
})
