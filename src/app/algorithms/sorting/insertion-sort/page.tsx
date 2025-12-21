import NextPrev from '@/components/nextPrev'

export default function InsertionSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Insertion Sort
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Insertion Sort builds the final sorted array one element at a time. It
        is efficient for small or nearly sorted data.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`for i from 1 to n-1:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j+1] = arr[j]
        j -= 1
    arr[j+1] = key`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Best: O(n)</li>
        <li>Average: O(n²)</li>
        <li>Worst: O(n²)</li>
        <li>Space: O(1)</li>
      </ul>
      <NextPrev />
    </div>
  )
}
