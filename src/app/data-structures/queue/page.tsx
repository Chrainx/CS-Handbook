import NextPrev from '@/components/nextPrev'

export default function QueuePage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">Queue</h1>

      <p className="mb-4 text-(--text-secondary)">
        A queue is a linear data structure that follows the
        <strong> First-In, First-Out (FIFO)</strong> principle. The element that
        is inserted first is the first one to be removed.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        Queues restrict access to two ends: elements are added at the
        <em> rear</em> and removed from the <em>front</em>. This ordering makes
        queues suitable for processing tasks in the order they arrive.
      </p>

      {/* Core operations */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Core Operations
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Enqueue</strong> — add an element to the rear of the queue
        </li>
        <li>
          <strong>Dequeue</strong> — remove an element from the front of the
          queue
        </li>
        <li>
          <strong>Front / Peek</strong> — view the front element without
          removing it
        </li>
        <li>
          <strong>IsEmpty</strong> — check whether the queue is empty
        </li>
      </ul>

      {/* Variants */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Types of Queues
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Simple Queue</strong> — basic FIFO queue
        </li>
        <li>
          <strong>Circular Queue</strong> — reuses freed space efficiently
        </li>
        <li>
          <strong>Deque (Double-Ended Queue)</strong> — insertion and removal
          allowed at both ends
        </li>
        <li>
          <strong>Priority Queue</strong> — elements are removed based on
          priority rather than insertion order
        </li>
      </ul>

      {/* Implementation */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Implementation
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        Queues can be implemented using different underlying data structures:
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Array-based implementation</strong> — simple but may require
          resizing or shifting elements.
        </li>
        <li>
          <strong>Linked list-based implementation</strong> — supports dynamic
          size and efficient enqueue/dequeue operations.
        </li>
      </ul>

      {/* Complexity */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Time Complexity
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Enqueue: O(1)</li>
        <li>Dequeue: O(1)</li>
        <li>Peek: O(1)</li>
      </ul>

      {/* Use cases */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Common Use Cases
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Task scheduling and job processing</li>
        <li>Breadth-first search (BFS) in graphs</li>
        <li>Handling requests in servers</li>
        <li>Buffering data streams</li>
      </ul>

      {/* Notes */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Key Characteristics
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Queues enforce fairness by processing elements in the order they arrive.
        However, like stacks, they do not allow random access to elements and
        are best suited for sequential processing.
      </p>

      <NextPrev />
    </div>
  )
}
