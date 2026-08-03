export type LegendItem = {
  colorClass: string
  label: string
  description: string
}

export const LEGEND_CONFIG: Record<string, LegendItem[]> = {
  /* ================= INSERTION SORT ================= */

  insertion: [
    {
      colorClass: 'bg-blue-500',
      label: 'Normal',
      description: 'Element not involved in the current step',
    },
    {
      colorClass: 'bg-red-500',
      label: 'Compare',
      description: 'Elements currently being compared',
    },
    {
      colorClass: 'bg-green-500',
      label: 'Swap',
      description: 'Elements being swapped',
    },
  ],

  /* ================= SELECTION SORT ================= */

  selection: [
    {
      colorClass: 'bg-blue-500',
      label: 'Normal',
      description: 'Element not involved in the current step',
    },
    {
      colorClass: 'bg-yellow-500',
      label: 'Current Minimum',
      description: 'Smallest value found so far in the unsorted portion',
    },
    {
      colorClass: 'bg-red-500',
      label: 'Compare',
      description: 'Element being compared with the current minimum',
    },
    {
      colorClass: 'bg-green-500',
      label: 'Swap',
      description: 'Swapping the minimum element into its correct position',
    },
  ],

  /* ================= MERGE SORT ================= */

  merge: [
    {
      colorClass: 'bg-blue-500',
      label: 'Normal',
      description: 'Element not involved in the current merge step',
    },
    {
      colorClass: 'bg-cyan-500',
      label: 'Active Range',
      description: 'Subarray currently being processed by the algorihm',
    },
    {
      colorClass: 'bg-gray-500',
      label: 'Base Case',
      description: 'Single-element subarray (cannot be split further)',
    },
    {
      colorClass: 'bg-red-500',
      label: 'Compare',
      description: 'Elements currently being compared',
    },
    {
      colorClass: 'bg-purple-500',
      label: 'Write Position',
      description: 'Index where the next merged value will be written',
    },
    {
      colorClass: 'bg-green-500',
      label: 'Just Written',
      description: 'Most recently written element during merge',
    },
  ],

  /* ================= QUICK SORT ================= */

  quick: [
    {
      colorClass: 'bg-blue-500',
      label: 'Normal',
      description: 'Element not involved in the current step',
    },
    {
      colorClass: 'bg-cyan-500',
      label: 'Active Range',
      description: 'Subarray currently being partitioned',
    },
    {
      colorClass: 'bg-purple-500',
      label: 'Pivot',
      description: 'Pivot element used to partition the array',
    },
    {
      colorClass: 'bg-red-500',
      label: 'Compare',
      description: 'Element currently being compared with the pivot',
    },
    {
      colorClass: 'bg-orange-500',
      label: '≤ Pivot (Committed)',
      description:
        'Elements confirmed to be less than or equal to the pivot (left of boundary)',
    },
    {
      colorClass: 'bg-green-500',
      label: 'Swap',
      description: 'Elements being swapped',
    },
  ],

  /* ================= HEAP SORT ================= */

  heap: [
    {
      colorClass: 'bg-blue-500',
      label: 'Normal',
      description: 'Element not involved in the current step',
    },
    {
      colorClass: 'bg-red-500',
      label: 'Compare',
      description: 'Elements currently being compared while sifting the heap',
    },
    {
      colorClass: 'bg-green-500',
      label: 'Swap',
      description: 'Elements being swapped during heapify or extraction',
    },
    {
      colorClass: 'bg-yellow-500',
      label: 'Sorted',
      description: 'Element placed into its final sorted position',
    },
  ],

  /* ================= BINARY SEARCH ================= */

  'binary-search': [
    {
      colorClass: 'bg-blue-500',
      label: 'Active Range',
      description: 'Current portion of the array being searched',
    },
    {
      colorClass: 'bg-red-500',
      label: 'Mid (M)',
      description: 'Middle element of the current search range',
    },
    {
      colorClass: 'bg-green-500',
      label: 'Found',
      description: 'Target value has been found',
    },
    {
      colorClass: 'bg-gray-300',
      label: 'Eliminated',
      description: 'Elements excluded from further search',
    },
  ],

  /* ================= GRAPH ================= */

  bfs: [
    {
      colorClass: 'fill-blue-500',
      label: 'Unvisited',
      description: 'Node has not been discovered yet',
    },
    {
      colorClass: 'fill-orange-500',
      label: 'In Queue',
      description: 'Node discovered and waiting in the BFS queue',
    },
    {
      colorClass: 'fill-yellow-500',
      label: 'Processing',
      description: 'Node just dequeued, currently being explored',
    },
    {
      colorClass: 'fill-green-500',
      label: 'Visited',
      description: 'Node dequeued and processed',
    },
    {
      colorClass: 'stroke-red-500',
      label: 'Active Edge',
      description: 'Edge currently being explored',
    },
  ],

  dfs: [
    {
      colorClass: 'fill-blue-500',
      label: 'Unvisited',
      description: 'Node has not been discovered yet',
    },
    {
      colorClass: 'fill-orange-500',
      label: 'In Stack',
      description: 'Node discovered and waiting on the DFS stack',
    },
    {
      colorClass: 'fill-yellow-500',
      label: 'Processing',
      description: 'Node just popped, currently being explored',
    },
    {
      colorClass: 'fill-green-500',
      label: 'Visited',
      description: 'Node popped and processed',
    },
    {
      colorClass: 'stroke-red-500',
      label: 'Active Edge',
      description: 'Edge currently being explored',
    },
  ],

  topological: [
    {
      colorClass: 'fill-blue-500',
      label: 'Unvisited',
      description: 'Node has not been processed yet',
    },
    {
      colorClass: 'fill-orange-500',
      label: 'Ready',
      description: 'Node has zero in-degree and is waiting to be output',
    },
    {
      colorClass: 'fill-yellow-500',
      label: 'Processing',
      description: 'Node just dequeued, currently reducing its neighbors',
    },
    {
      colorClass: 'fill-green-500',
      label: 'Output',
      description: 'Node already placed in the topological order',
    },
    {
      colorClass: 'stroke-red-500',
      label: 'Active Edge',
      description: 'Edge being considered when reducing in-degrees',
    },
  ],

  dijkstra: [
    {
      colorClass: 'fill-blue-500',
      label: 'Unvisited',
      description: 'Node not finalized yet',
    },
    {
      colorClass: 'fill-orange-500',
      label: 'In Priority Queue',
      description: 'Node discovered and waiting to be processed',
    },
    {
      colorClass: 'fill-yellow-500',
      label: 'Processing',
      description: 'Node just popped from the priority queue',
    },
    {
      colorClass: 'fill-green-500',
      label: 'Visited',
      description: 'Shortest distance finalized',
    },
    {
      colorClass: 'stroke-red-500',
      label: 'Active Edge',
      description: 'Edge being examined',
    },
    {
      colorClass: 'stroke-purple-500',
      label: 'Relaxed Edge',
      description: 'Edge that improved a distance',
    },
  ],

  'bellman-ford': [
    {
      colorClass: 'stroke-red-500',
      label: 'Active Edge',
      description: 'Edge currently being checked during this pass',
    },
    {
      colorClass: 'stroke-purple-500',
      label: 'Relaxed Edge',
      description: 'Edge that improved a shortest distance',
    },
  ],

  prim: [
    {
      colorClass: 'fill-blue-500',
      label: 'Not in MST',
      description: 'Node not yet included in the MST',
    },
    {
      colorClass: 'fill-orange-500',
      label: 'In Priority Queue',
      description: 'Node discovered and waiting to be processed',
    },
    {
      colorClass: 'fill-yellow-500',
      label: 'Processing',
      description: 'Node just popped from the priority queue',
    },
    {
      colorClass: 'fill-green-500',
      label: 'In MST',
      description: 'Node included in MST',
    },
    {
      colorClass: 'stroke-red-500',
      label: 'Active Edge',
      description: 'Edge being considered',
    },
    {
      colorClass: 'stroke-purple-500',
      label: 'Relaxed Edge',
      description:
        'Edge currently giving a node its lowest known connection cost to the MST',
    },
    {
      colorClass: 'stroke-green-600',
      label: 'Chosen Edge',
      description: 'Edge selected into the MST',
    },
  ],

  kruskal: [
    {
      colorClass: 'stroke-red-500',
      label: 'Active Edge',
      description: 'Current edge in sorted order',
    },
    {
      colorClass: 'stroke-green-600',
      label: 'Chosen Edge',
      description: 'Edge accepted into the MST',
    },
  ],
}
