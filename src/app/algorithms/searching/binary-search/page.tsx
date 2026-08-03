import NextPrev from '@/components/nextPrev'
import Link from 'next/link'

export default function BinarySearchPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-(--text-main)">
        Binary Search
      </h1>

      <p className="text-(--text-secondary)">
        Binary search finds an element in a sorted array by repeatedly dividing
        the search interval in half.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="text-(--text-secondary)">
        Binary Search works by maintaining a search range in which the target
        can possibly exist. At each step, the middle element is compared with
        the target. Based on this comparison, one half of the remaining elements
        is discarded, since the target cannot lie there.
      </p>

      <p className="text-(--text-secondary)">
        This process continues until the target is found or the search range
        becomes empty. The requirement that the array is sorted is what allows
        this safe elimination of half the search space at every step.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-sm text-(--text-secondary) overflow-x-auto">
        {`function binarySearch(arr, target):
    left = 0
    right = n - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target: return mid
        if arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1
`}
      </pre>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Best case: O(1)</li>
        <li>Average case: O(log n)</li>
        <li>Worst case: O(log n)</li>
        <li>Space complexity: O(1)</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Visualization
      </h2>

      <p className="text-(--text-secondary)">
        Explore how Binary Search narrows down the search range step by step
        using the interactive searching visualizer.
      </p>

      <Link
        href="/algorithms/searching/visualizer"
        className="inline-block mt-2 text-blue-600 underline"
      >
        Open Searching Visualizer →
      </Link>

      <NextPrev />
    </div>
  )
}
