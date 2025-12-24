import NextPrev from '@/components/nextPrev'

export default function StackPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">Stack</h1>

      <p className="mb-4 text-(--text-secondary)">
        A stack is a linear data structure that follows the
        <strong> Last-In, First-Out (LIFO)</strong> principle. The most recently
        added element is the first one to be removed.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        Stacks restrict how elements are accessed. All insertions and removals
        occur at a single end, commonly referred to as the <em>top</em> of the
        stack.
      </p>

      {/* Core operations */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Core Operations
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Push</strong> — add an element to the top of the stack
        </li>
        <li>
          <strong>Pop</strong> — remove the top element from the stack
        </li>
        <li>
          <strong>Peek / Top</strong> — view the top element without removing it
        </li>
        <li>
          <strong>IsEmpty</strong> — check whether the stack is empty
        </li>
      </ul>

      {/* Implementation */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Implementation
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        A stack can be implemented using different underlying data structures:
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Array-based implementation</strong> — uses contiguous memory
          and is simple to implement.
        </li>
        <li>
          <strong>Linked list-based implementation</strong> — avoids fixed-size
          limitations and allows dynamic growth.
        </li>
      </ul>

      {/* Complexity */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Time Complexity
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Push: O(1)</li>
        <li>Pop: O(1)</li>
        <li>Peek: O(1)</li>
      </ul>

      {/* Applications */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Common Use Cases
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Function call management (call stack)</li>
        <li>Undo / redo operations in applications</li>
        <li>Expression evaluation and syntax parsing</li>
        <li>Depth-first search (DFS) in graphs</li>
      </ul>

      {/* Notes */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Key Characteristics
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Because stacks restrict access to only one end, they are simple,
        efficient, and predictable. However, they are not suitable when random
        access to elements is required.
      </p>

      <NextPrev />
    </div>
  )
}
