export type SectionConfig = {
  path: string
  order: readonly string[]
  subOrder?: Record<string, readonly string[]>
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
      ],
      searching: ['binary-search'],
      graph: [
        'bfs',
        'dfs',
        'topological-sort',
        'dijkstra',
        'bellman-ford',
        'prim',
        'kruskal',
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
  },
}
