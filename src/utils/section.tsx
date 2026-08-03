export type SectionConfig = {
  path: string
  order: readonly string[]
  subOrder?: Record<string, readonly string[]>
  hiddenSubOrder?: Record<string, readonly string[]>
}

export const sections: Record<string, SectionConfig> = {
  algorithms: {
    path: '/algorithms',
    order: ['sorting', 'searching', 'graph', 'dynamic-programming', 'greedy'],
    subOrder: {
      sorting: [
        'insertion-sort',
        'selection-sort',
        'merge-sort',
        'quick-sort',
        'heap-sort',
        'visualizer',
      ],
      searching: ['binary-search', 'visualizer'],
      graph: [
        'bfs',
        'dfs',
        'topological-sort',
        'dijkstra',
        'bellman-ford',
        'prim',
        'kruskal',
        'visualizer',
      ],
      'dynamic-programming': [
        'knapsack-0-1',
        'coin-change',
        'longest-increasing-subsequence',
        'longest-common-subsequence',
        'edit-distance',
      ],
      greedy: ['interval-scheduling', 'fractional-knapsack', 'huffman-coding'],
    },
  },

  'data-structures': {
    path: '/data-structures',
    order: [
      'arrays',
      'linked-lists',
      'stack',
      'queue',
      'hash-table',
      'sets',
      'heap',
      'tree',
      'graph',
    ],
    subOrder: {
      heap: ['visualizer'],
    },
  },

  'operating-systems': {
    path: '/operating-systems',
    order: ['processes-threads'],
  },

  networks: {
    path: '/networks',
    order: ['networking-models'],
  },

  security: {
    path: '/security',
    order: ['cryptography-fundamentals'],
  },

  'machine-learning': {
    path: '/machine-learning',
    order: ['introduction-to-ml'],
  },
}
