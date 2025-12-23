// ===============================
// Algorithms
// ===============================

// Order of algorithm categories
export const categoryOrder = [
  'sorting',
  'searching',
  'graph',
  'dynamic-programming',
  'greedy',
]

export type Category = (typeof categoryOrder)[number]

// Order of topics inside each algorithm category
export const topicOrder: Record<string, string[]> = {
  // ---- Sorting ----
  sorting: [
    'insertion-sort',
    'selection-sort',
    'merge-sort',
    'quick-sort',
    'heap-sort',
  ],

  // ---- Searching ----
  searching: ['binary-search'],

  // ---- Graph Algorithms ----
  graph: [
    'bfs',
    'dfs',
    'topological-sort',
    'dijkstra',
    'bellman-ford',
    'prim',
    'kruskal',
  ],

  // ---- Dynamic Programming ----
  'dynamic-programming': [
    'knapsack-0-1',
    'coin-change',
    'longest-increasing-subsequence',
    'longest-common-subsequence',
    'edit-distance',
  ],

  // ---- Greedy ----
  greedy: ['interval-scheduling', 'fractional-knapsack', 'huffman-coding'],

  // ===============================
  // Data Structures
  // ===============================
  'data-structures': [
    'arrays',
    'linked-lists',
    'stack',
    'queue',
    'hash-table',
    'heap',
    'tree',
    'graph',
  ],
}
