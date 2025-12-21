import NextPrev from '@/components/nextPrev'

export default function HeapSortPage() {
  return (
    <div className="max-w-3xl leading-relaxed space-y-4">
      <h1 className="text-3xl font-semibold text-(--text-main)">Heap Sort</h1>

      <p className="text-(--text-secondary)">
        Heap Sort uses a binary heap data structure to repeatedly extract the
        maximum element and build the sorted array.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="text-(--text-secondary)">
        The array is first transformed into a max heap. The largest element is
        then swapped with the last element and removed from the heap.
      </p>

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
      <NextPrev />
    </div>
  )
}
