import NextPrev from '@/components/nextPrev'

export default function HeapPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">Heap</h1>

      <p className="mb-4 text-(--text-secondary)">
        A heap is a specialized tree-based data structure that satisfies the
        <strong> heap property</strong>. It is commonly used to efficiently
        retrieve the minimum or maximum element from a collection.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        Heaps are most often implemented as <em>binary heaps</em>, which are
        complete binary trees stored compactly in an array.
      </p>

      {/* Heap property */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Heap Property
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Min Heap</strong> — the value at each node is less than or
          equal to the values of its children.
        </li>
        <li>
          <strong>Max Heap</strong> — the value at each node is greater than or
          equal to the values of its children.
        </li>
      </ul>

      {/* Structure */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Structure
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        A binary heap is a <strong>complete binary tree</strong>, meaning all
        levels are fully filled except possibly the last, which is filled from
        left to right. This structure allows the heap to be stored efficiently
        using an array.
      </p>

      {/* Operations */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Core Operations
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Insert</strong> — add an element while maintaining the heap
          property
        </li>
        <li>
          <strong>Extract Min / Max</strong> — remove and return the root
          element
        </li>
        <li>
          <strong>Peek</strong> — view the root element without removing it
        </li>
        <li>
          <strong>Heapify</strong> — restore the heap property after
          modification
        </li>
      </ul>

      {/* Complexity */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Time Complexity
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Insert: O(log n)</li>
        <li>Extract Min / Max: O(log n)</li>
        <li>Peek: O(1)</li>
        <li>Build Heap: O(n)</li>
      </ul>

      {/* Priority Queue */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Priority Queue
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        One of the most common applications of a heap is the implementation of a
        priority queue. Elements are dequeued based on priority rather than
        insertion order.
      </p>

      {/* Use cases */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Common Use Cases
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Priority queues</li>
        <li>Dijkstra’s shortest path algorithm</li>
        <li>Task scheduling</li>
        <li>Finding the k largest or smallest elements</li>
      </ul>

      {/* Notes */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Key Characteristics
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Heaps provide efficient access to the minimum or maximum element but do
        not support fast searching for arbitrary values. They are best used when
        priority-based access is required.
      </p>

      <NextPrev />
    </div>
  )
}
