import NextPrev from '@/components/nextPrev'

export default function SetPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">Set</h1>

      <p className="mb-4 text-(--text-secondary)">
        A set is a data structure that stores a collection of
        <strong> unique elements</strong>. Unlike arrays or lists, sets do not
        allow duplicate values.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        Sets are primarily used when the presence or absence of an element
        matters more than its position or order.
      </p>

      {/* Properties */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Key Properties
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Each element appears at most once</li>
        <li>Element order is not important</li>
        <li>Membership checks are the primary operation</li>
      </ul>

      {/* Operations */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Core Operations
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Add</strong> — insert an element into the set
        </li>
        <li>
          <strong>Remove</strong> — delete an element from the set
        </li>
        <li>
          <strong>Contains</strong> — check whether an element exists in the set
        </li>
        <li>
          <strong>Union</strong> — combine elements from two sets
        </li>
        <li>
          <strong>Intersection</strong> — elements common to two sets
        </li>
        <li>
          <strong>Difference</strong> — elements in one set but not the other
        </li>
      </ul>

      {/* Implementation */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Implementation
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        Sets can be implemented using different underlying data structures:
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Hash-based Set</strong> — provides fast average-case
          operations using hashing.
        </li>
        <li>
          <strong>Tree-based Set</strong> — keeps elements ordered and supports
          range queries.
        </li>
      </ul>

      {/* Complexity */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Time Complexity
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Average case (hash-based): O(1)</li>
        <li>Worst case (hash-based): O(n)</li>
        <li>Tree-based operations: O(log n)</li>
      </ul>

      {/* Use cases */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Common Use Cases
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Removing duplicates from a collection</li>
        <li>Fast membership testing</li>
        <li>Tracking visited elements (e.g. in graph traversal)</li>
        <li>Implementing mathematical set operations</li>
      </ul>

      {/* Notes */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Key Characteristics
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Sets excel at enforcing uniqueness and performing membership checks.
        However, they do not support indexing or positional access, making them
        unsuitable when element order matters.
      </p>

      <NextPrev />
    </div>
  )
}
