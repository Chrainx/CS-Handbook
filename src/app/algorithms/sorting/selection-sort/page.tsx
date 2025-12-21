import NextPrev from '@/components/nextPrev'

export default function SelectionSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Selection Sort
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Selection Sort repeatedly selects the smallest remaining element and
        places it in the correct position.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`for i from 0 to n-2:
    minIndex = i
    for j from i+1 to n-1:
        if arr[j] < arr[minIndex]:
            minIndex = j
    swap(arr[i], arr[minIndex])`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time: O(n²)</li>
        <li>Space: O(1)</li>
      </ul>
      <NextPrev />
    </div>
  )
}
