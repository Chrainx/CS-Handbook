import NextPrev from '@/components/nextPrev'

export default function SelectionSortPage() {
  return (
    <div className="max-w-3xl leading-relaxed space-y-4">
      <h1 className="text-3xl font-semibold text-(--text-main)">
        Selection Sort
      </h1>

      <p className="text-(--text-secondary)">
        Selection Sort repeatedly selects the smallest element from the unsorted
        portion of the array and swaps it with the first unsorted element.
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

      <NextPrev />
    </div>
  )
}
