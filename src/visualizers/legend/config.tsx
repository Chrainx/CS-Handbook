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
      colorClass: 'bg-gray-400',
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

  graph: [
    {
      colorClass: 'fill-blue-500',
      label: 'Unvisited',
      description: 'Node has not been discovered yet',
    },
    {
      colorClass: 'fill-yellow-400',
      label: 'Visiting',
      description: 'Node is discovered and in the frontier',
    },
    {
      colorClass: 'fill-green-500',
      label: 'Visited',
      description: 'Node has been fully processed',
    },
    {
      colorClass: 'stroke-red-500',
      label: 'Active Edge',
      description: 'Edge currently being explored',
    },
    {
      colorClass: 'stroke-purple-500',
      label: 'Relaxed Edge',
      description: 'Edge used to update a distance',
    },
    {
      colorClass: 'stroke-green-600',
      label: 'Chosen Edge',
      description: 'Edge selected as part of final result',
    },
  ],
}
