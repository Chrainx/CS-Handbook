import NextPrev from '@/components/nextPrev'

export default function MergeSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-(--text-main)">Merge Sort</h1>

      <p className="text-(--text-secondary)">
        Merge Sort is a divide-and-conquer sorting algorithm that sorts an array
        by recursively dividing it into smaller subarrays and merging them in
        sorted order.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="text-(--text-secondary)">
        Merge Sort separates the concerns of division and ordering: recursion
        handles breaking the problem down, while the merge step ensures the
        final ordering is correct.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-sm text-(--text-secondary) overflow-x-auto">
        {`function mergeSort(arr):
    if length <= 1:
        return arr

    mid = length / 2
    left = mergeSort(arr[0 : mid])
    right = mergeSort(arr[mid : end])

    return merge(left, right)


function merge(left, right):
    result = []

    while left and right:
        if left[0] <= right[0]:
            append left[0] to result
            remove left[0] from left
        else:
            append right[0] to result
            remove right[0] from right

    append remaining items of left
    append remaining items of right

    return result`}
      </pre>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Best case: O(n log n)</li>
        <li>Average case: O(n log n)</li>
        <li>Worst case: O(n log n)</li>
        <li>Space complexity: O(n)</li>
        <li>Stable: Yes</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        When to Use Merge Sort
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>When stability is required</li>
        <li>When sorting linked lists</li>
        <li>When worst-case guarantees are important</li>
        <li>When predictable performance is needed</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Visualization
      </h2>

      <p className="text-(--text-secondary)">
        Explore how Merge Sort works step by step using the interactive sorting
        visualizer.
      </p>

      <a
        href="/algorithms/sorting/visualizer?algo=merge"
        className="inline-block mt-2 text-accent underline"
      >
        Open Sorting Visualizer →
      </a>

      <NextPrev />
    </div>
  )
}
