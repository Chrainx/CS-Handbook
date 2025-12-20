// Order of categories (GLOBAL order)
export const categoryOrder = [
  'sorting',
  'searching',
  'graph',
  'dynamic-programming',
  'greedy',
  'math',
]

// Order of topics inside each category
export const topicOrder: Record<string, string[]> = {
  sorting: ['merge-sort', 'quick-sort', 'heap-sort'],

  searching: ['binary-search'],

  graph: [
    'bfs',
    'dfs',
    'topological-sort',
    'dijkstra',
    'bellman-ford',
    'floyd-warshall',
    'prim',
    'kruskal',
  ],

  'dynamic-programming': [
    'knapsack-0-1',
    'unbounded-knapsack',
    'longest-increasing-subsequence',
    'longest-common-subsequence',
    'edit-distance',
    'matrix-chain-multiplication',
    'coin-change',
    'rod-cutting',
  ],

  greedy: [
    'activity-selection',
    'fractional-knapsack',
    'job-sequencing',
    'huffman-coding',
    'interval-scheduling',
  ],

  math: [
    'gcd',
    'lcm',
    'sieve-of-eratosthenes',
    'modular-exponentiation',
    'modular-inverse',
    'prime-factorization',
  ],
}
