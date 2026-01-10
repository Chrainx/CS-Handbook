/* ============================================================================
 * Graph algorithm state (USED BY REDUCER ONLY)
 * ========================================================================== */

export type GraphAlgorithmCategory =
  | 'traversal'
  | 'shortest-path'
  | 'dependency'
  | 'mst'

export const GRAPH_ALGO_CATEGORY: Record<
  GraphAlgorithmId,
  GraphAlgorithmCategory
> = {
  bfs: 'traversal',
  dfs: 'traversal',

  dijkstra: 'shortest-path',
  'bellman-ford': 'shortest-path',

  topological: 'dependency',

  prim: 'mst', // later
  kruskal: 'mst', // later
}

export type GraphAlgorithmId =
  | 'bfs'
  | 'dfs'
  | 'dijkstra'
  | 'topological'
  | 'bellman-ford'
  | 'prim'
  | 'kruskal'

export type NodeId = string

export type GraphState = {
  /** Per-node visual state */
  nodes: Record<string, NodeState>

  /** Per-edge visual state (key: "A->B") */
  edges: Record<string, EdgeState>

  /** BFS queue */
  queue: string[]

  /** DFS stack */
  stack: string[]

  pq?: {
    node: string
    priority: number
  }[]

  distances: Record<string, number>
  previous: Record<string, string | null>
}

/* ============================================================================
 * Atomic state enums (ALGORITHM MEANING)
 * ========================================================================== */

export type NodeState = 'default' | 'active' | 'visiting' | 'visited'

export type EdgeState = 'default' | 'active' | 'relaxed' | 'chosen'

/* ============================================================================
 * Initial state
 * ========================================================================== */

export const initialGraphState: GraphState = {
  nodes: {},
  edges: {},

  queue: [],
  stack: [],
  pq: [],

  distances: {},
  previous: {},
}

export type GraphOutput =
  | { type: 'none' }
  | { type: 'order'; nodes: string[] }
  | { type: 'distances'; values: Record<string, number> }
