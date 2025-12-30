/* ============================================================================
 * Visual state for graph rendering
 * ========================================================================== */

export type NodeVisualState = 'default' | 'visiting' | 'visited' | 'active'

export type EdgeVisualState = 'default' | 'active' | 'relaxed' | 'chosen'

export type GraphVisualState = {
  nodes: Record<string, NodeVisualState>
  edges: Record<string, EdgeVisualState>
  activeNode: string | null
  queue: string[]
  stack: string[]
}

export type GraphAlgorithmId = 'bfs' | 'dfs'

export const initialGraphVisualState: GraphVisualState = {
  nodes: {},
  edges: {},
  activeNode: null,
  queue: [],
  stack: [],
}
