import { GraphData } from '../primitives/graph/data'

export const GRAPH_PRESETS: Record<string, GraphData> = {
  tree: {
    nodes: [
      { id: 'A', x: 300, y: 60 },
      { id: 'B', x: 150, y: 160 },
      { id: 'C', x: 450, y: 160 },
      { id: 'D', x: 80, y: 280 },
      { id: 'E', x: 220, y: 280 },
      { id: 'F', x: 380, y: 280 },
      { id: 'G', x: 520, y: 280 },
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

  weighted: {
    nodes: [
      { id: 'A', x: 300, y: 40 },
      { id: 'B', x: 150, y: 140 },
      { id: 'C', x: 450, y: 140 },
      { id: 'D', x: 80, y: 280 },
      { id: 'E', x: 300, y: 210 },
      { id: 'F', x: 520, y: 280 },
    ],
    edges: [
      { from: 'A', to: 'B', weight: 2 },
      { from: 'A', to: 'C', weight: 5 },
      { from: 'B', to: 'C', weight: 1 },
      { from: 'B', to: 'D', weight: 4 },
      { from: 'C', to: 'E', weight: 2 },
      { from: 'E', to: 'D', weight: 1 },
      { from: 'E', to: 'F', weight: 3 },
      { from: 'D', to: 'F', weight: 6 },
    ],
  },
}
