import NextPrev from '@/components/nextPrev'
import Link from 'next/link'

export default function SelectionSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-(--text-main)">
        Selection Sort
      </h1>

      <p className="text-(--text-secondary)">
        Selection Sort is a comparison-based sorting algorithm that sorts an
        array by repeatedly selecting the smallest remaining element and placing
        it into its correct position.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="text-(--text-secondary)">
        The array is divided into a sorted and an unsorted region. The smallest
        element in the unsorted region is selected and placed at the end of the
        sorted region.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-sm text-(--text-secondary) overflow-x-auto">
        {`for i = 0 to n - 1:
    minIndex = i
    for j = i + 1 to n:
        if arr[j] < arr[minIndex]:
            minIndex = j
    swap arr[i] and arr[minIndex]`}
      </pre>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Best case: O(n²)</li>
        <li>Average case: O(n²)</li>
        <li>Worst case: O(n²)</li>
        <li>Space complexity: O(1)</li>
        <li>Stable: No</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        When to Use Selection Sort
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>
          When simplicity and predictability are more important than performance
        </li>
        <li>When memory usage must be minimal</li>
        <li>For small datasets where O(n²) time is acceptable</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Visualization
      </h2>

      <p className="text-(--text-secondary)">
        Explore how Selection Sort works step by step using the interactive
        sorting visualizer.
      </p>

      <Link
        href="/algorithms/sorting/visualizer?algo=selection"
        className="inline-block mt-2 text-accent underline"
      >
        Open Sorting Visualizer →
      </Link>

      <NextPrev />
    </div>
  )
}
