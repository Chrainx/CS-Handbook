import { GraphData } from '../primitives/graph/data'

export const GRAPH_PRESETS: Record<string, GraphData> = {
  /* ================= TRAVERSAL ================= */
  /* BFS / DFS */
  tree: {
    nodes: [
      { id: 'A', x: 300, y: 40 },
      { id: 'B', x: 150, y: 140 },
      { id: 'C', x: 450, y: 140 },
      { id: 'D', x: 80, y: 260 },
      { id: 'E', x: 220, y: 260 },
      { id: 'F', x: 380, y: 260 },
      { id: 'G', x: 520, y: 260 },
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'F' },
      { from: 'C', to: 'G' },
    ],
  },

  /* ================= SHORTEST PATH ================= */
  /* Dijkstra / Bellman–Ford */
  weighted: {
    nodes: [
      { id: 'A', x: 300, y: 40 },
      { id: 'B', x: 120, y: 140 },
      { id: 'C', x: 480, y: 140 },
      { id: 'D', x: 120, y: 280 },
      { id: 'E', x: 300, y: 220 },
      { id: 'F', x: 480, y: 280 },
    ],
    edges: [
      { from: 'A', to: 'B', weight: 2 },
      { from: 'A', to: 'C', weight: 6 }, // worse direct path
      { from: 'B', to: 'C', weight: 1 }, // better via B
      { from: 'B', to: 'D', weight: 4 },
      { from: 'C', to: 'E', weight: 2 },
      { from: 'E', to: 'D', weight: 1 }, // alternative to D
      { from: 'E', to: 'F', weight: 3 },
      { from: 'D', to: 'F', weight: 6 }, // dominated path
    ],
  },

  /* ================= DEPENDENCY ================= */
  /* Topological Sort */
  dependency: {
    nodes: [
      { id: 'A', x: 300, y: 40 }, // root dependency
      { id: 'B', x: 150, y: 140 },
      { id: 'C', x: 450, y: 140 },
      { id: 'D', x: 150, y: 260 },
      { id: 'E', x: 450, y: 260 },
      { id: 'F', x: 300, y: 360 }, // final task
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'E' },
      { from: 'D', to: 'F' },
      { from: 'E', to: 'F' },
    ],
  },
}
