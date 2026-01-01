/* ============================================================================
 * Graph algorithm state (USED BY REDUCER ONLY)
 * ========================================================================== */

export type GraphAlgorithmId =
  | 'bfs'
  | 'dfs'
  | 'dijkstra'
  | 'topological'
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

  /** Currently focused node */
  activeNode: string | null
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
  activeNode: null,
}
