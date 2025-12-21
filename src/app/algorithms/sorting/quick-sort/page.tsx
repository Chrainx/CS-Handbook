import NextPrev from '@/components/nextPrev'

export default function QuickSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Quick Sort
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Quick Sort is a divide-and-conquer algorithm that partitions an array
        around a pivot, then recursively sorts the left and right parts.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Algorithm Steps
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Pick a pivot element</li>
        <li>Partition the array into smaller and larger elements</li>
        <li>Recursively apply Quick Sort to each partition</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function quickSort(arr):
    if length <= 1: return arr
    pivot = arr[last]
    left = items < pivot
    right = items > pivot
    return quickSort(left) + [pivot] + quickSort(right)`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Best: O(n log n)</li>
        <li>Average: O(n log n)</li>
        <li>Worst: O(n²)</li>
        <li>Space: O(log n) (recursive)</li>
      </ul>
      <NextPrev />
    </div>
  )
}
