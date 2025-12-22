import NextPrev from '@/components/nextPrev'

export default function InsertionSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-(--text-main)">
        Insertion Sort
      </h1>

      <p className="text-(--text-secondary)">
        Insertion Sort is a simple comparison-based sorting algorithm that
        builds the final sorted array one element at a time by inserting each
        element into its correct position.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="text-(--text-secondary)">
        The algorithm maintains a sorted portion of the array and repeatedly
        inserts the next element into the correct position within that portion.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-sm text-(--text-secondary) overflow-x-auto">
        {`for i = 1 to n - 1:
    key = arr[i]
    j = i - 1

    while j >= 0 and arr[j] > key:
        arr[j + 1] = arr[j]
        j = j - 1

    arr[j + 1] = key`}
      </pre>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Best case: O(n)</li>
        <li>Average case: O(n²)</li>
        <li>Worst case: O(n²)</li>
        <li>Space complexity: O(1)</li>
        <li>Stable: Yes</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        When to Use Insertion Sort
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Small datasets</li>
        <li>Nearly sorted arrays</li>
        <li>When simplicity matters</li>
      </ul>

      <NextPrev />
    </div>
  )
}
