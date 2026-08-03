import { ComplexityInfo } from '../shared/complexityBadge'
import { GraphAlgorithmId } from './state/types'

// Expressed in terms of V (vertices) and E (edges) - the standard textbook
// complexity assuming an efficient priority queue where relevant, not this
// demo's own array-based implementation.
export const GRAPH_COMPLEXITY: Record<GraphAlgorithmId, ComplexityInfo> = {
  bfs: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
    space: 'O(V)',
  },
  dfs: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
    space: 'O(V)',
  },
  dijkstra: {
    best: 'O((V + E) log V)',
    average: 'O((V + E) log V)',
    worst: 'O((V + E) log V)',
    space: 'O(V)',
    note: 'With a binary heap priority queue',
  },
  topological: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)',
    space: 'O(V)',
  },
  'bellman-ford': {
    best: 'O(V × E)',
    average: 'O(V × E)',
    worst: 'O(V × E)',
    space: 'O(V)',
    note: 'Handles negative edge weights, unlike Dijkstra',
  },
  prim: {
    best: 'O(E log V)',
    average: 'O(E log V)',
    worst: 'O(E log V)',
    space: 'O(V)',
    note: 'With a binary heap priority queue',
  },
  kruskal: {
    best: 'O(E log E)',
    average: 'O(E log E)',
    worst: 'O(E log E)',
    space: 'O(V)',
    note: 'Dominated by sorting the edges',
  },
}
