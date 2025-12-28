import NextPrev from '@/components/nextPrev'

export default function HeapSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-(--text-main)">Heap Sort</h1>

      <p className="text-(--text-secondary)">
        Heap Sort is a comparison-based sorting algorithm that uses a binary
        heap data structure to repeatedly extract the largest element and place
        it into its correct position in the array.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="text-(--text-secondary)">
        The array is first transformed into a max heap, where the largest
        element is always at the root. The root element is swapped with the last
        element of the heap, effectively removing it from consideration. The
        heap size is reduced, and the heap property is restored. This process
        repeats until the array is fully sorted.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-sm text-(--text-secondary) overflow-x-auto">
        {`function heapSort(arr):
    buildMaxHeap(arr)
    for i = n - 1 down to 1:
        swap arr[0] and arr[i]
        heapify(arr, 0, i)


function buildMaxHeap(arr):
    for i = floor(n / 2) - 1 down to 0:
        heapify(arr, i, n)


function heapify(arr, i, heapSize):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < heapSize and arr[left] > arr[largest]:
        largest = left
    if right < heapSize and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        swap arr[i] and arr[largest]
        heapify(arr, largest, heapSize)`}
      </pre>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Best case: O(n log n)</li>
        <li>Average case: O(n log n)</li>
        <li>Worst case: O(n log n)</li>
        <li>Space complexity: O(1)</li>
        <li>Stable: No</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        When to Use Heap Sort
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>When worst-case performance guarantees are required</li>
        <li>When in-place sorting is necessary</li>
        <li>When memory usage must be minimal</li>
        <li>When predictable O(n log n) behavior is desired</li>
      </ul>

      <NextPrev />
    </div>
  )
}
