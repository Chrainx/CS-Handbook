import NextPrev from '@/components/nextPrev'

export default function LinkedListsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        Linked Lists
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        A linked list is a linear data structure in which elements are stored in
        separate nodes. Each node contains a value and a reference (or pointer)
        to the next node in the sequence.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        Unlike arrays, linked lists do not store elements in contiguous memory
        locations. This allows efficient insertion and deletion of elements but
        makes random access slower.
      </p>

      {/* Structure */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Structure
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        Each node in a linked list typically contains:
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>The data value</li>
        <li>A pointer to the next node</li>
      </ul>

      <p className="mb-6 text-(--text-secondary)">
        The list starts from a head node. Traversal begins at the head and
        continues by following the pointers until the end of the list.
      </p>

      {/* Types */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Types of Linked Lists
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Singly Linked List</strong> — each node points to the next
          node.
        </li>
        <li>
          <strong>Doubly Linked List</strong> — each node has pointers to both
          the previous and next nodes.
        </li>
        <li>
          <strong>Circular Linked List</strong> — the last node points back to
          the head.
        </li>
      </ul>

      {/* Operations */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Common Operations
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Traversal — visiting each node in sequence</li>
        <li>Insertion — adding a node at the beginning, end, or middle</li>
        <li>Deletion — removing a node from the list</li>
        <li>Search — finding a node with a specific value</li>
      </ul>

      {/* Complexity */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Time Complexity
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Access by index: O(n)</li>
        <li>Search: O(n)</li>
        <li>Insertion (known position): O(1)</li>
        <li>Deletion (known position): O(1)</li>
      </ul>

      {/* Comparison */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Linked Lists vs Arrays
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        Compared to arrays, linked lists offer faster insertion and deletion
        operations because elements do not need to be shifted. However, arrays
        provide faster access to elements due to contiguous memory storage.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        Choosing between a linked list and an array depends on the problem
        requirements, especially whether frequent insertions and deletions are
        expected.
      </p>

      {/* Use cases */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Common Use Cases
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Implementing stacks and queues</li>
        <li>Dynamic memory allocation scenarios</li>
        <li>Maintaining ordered collections with frequent updates</li>
      </ul>

      <NextPrev />
    </div>
  )
}
