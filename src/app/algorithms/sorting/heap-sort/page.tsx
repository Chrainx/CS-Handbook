import NextPrev from '@/components/nextPrev'

export default function HeapSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Heap Sort
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Heap Sort is a comparison-based sorting algorithm that uses a binary
        heap data structure. It repeatedly extracts the maximum element and
        rebuilds the heap.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Algorithm Steps
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Build a max-heap from the array</li>
        <li>
          Swap the root (max) with the last element and reduce heap size by 1
        </li>
        <li>Heapify the root again</li>
        <li>Repeat until sorted</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function heapSort(arr):
    buildMaxHeap(arr)
    for i = n-1 downto 1:
        swap(arr[0], arr[i])
        heapify(arr, 0, i)`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time: O(n log n)</li>
        <li>Space: O(1)</li>
      </ul>
      <NextPrev />
    </div>
  )
}
