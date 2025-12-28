export type LegendItem = {
  colorClass: string
  label: string
  description: string
}

export const LEGEND_CONFIG: Record<string, LegendItem[]> = {
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

  merge: [
    {
      colorClass: 'bg-blue-500',
      label: 'Normal',
      description: 'Element not involved in the current merge step',
    },
    {
      colorClass: 'bg-gray-500',
      label: 'Base Case',
      description: 'Single-element subarray (already sorted)',
    },
    {
      colorClass: 'bg-purple-600',
      label: 'Active Range',
      description: 'Subarray currently being processed by merge sort',
    },
    {
      colorClass: 'bg-red-500',
      label: 'Compare',
      description: 'Elements being compared from the left and right buffers',
    },
    {
      colorClass: 'bg-green-500',
      label: 'Overwrite',
      description:
        'Position in the array where the next merged value is written',
    },
    {
      colorClass: 'bg-gray-200',
      label: 'Buffer',
      description: 'Temporary left and right arrays used during merging',
    },
    {
      colorClass: 'bg-gray-200 line-through opacity-60',
      label: 'Buffer Consumed',
      description: 'Buffer elements already written back to the main array',
    },
  ],
  'binary-search': [
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
      colorClass: 'bg-blue-500',
      label: 'Active Range',
      description: 'Current portion of the array being searched',
    },
    {
      colorClass: 'bg-gray-300',
      label: 'Eliminated',
      description: 'Elements excluded from further search',
    },
  ],
}
