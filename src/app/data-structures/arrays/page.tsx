import NextPrev from '@/components/nextPrev'

export default function ArraysPage() {
  return (
    <div>
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">Arrays</h1>

      {/* Brief explanation */}
      <p className="mb-4 text-(--text-secondary)">
        An array is a data structure that stores elements in contiguous memory
        locations. Each element can be accessed directly using an index, making
        arrays one of the simplest and most efficient data structures for
        sequential data.
      </p>

      {/* Core idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>
      <p className="text-(--text-secondary)">
        Arrays allow constant-time access to elements because their memory
        layout is contiguous. However, inserting or deleting elements (except at
        the end) requires shifting elements, which makes those operations
        expensive.
      </p>

      {/* Operations */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Operations & Time Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Access by index: O(1)</li>
        <li>Search: O(n)</li>
        <li>Insert (front or middle): O(n)</li>
        <li>Delete (front or middle): O(n)</li>
        <li>Append (dynamic array, amortized): O(1)</li>
      </ul>

      {/* Characteristics */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Key Characteristics
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Supports random access</li>
        <li>Memory-efficient (no extra pointers)</li>
        <li>Cache-friendly due to contiguous memory</li>
        <li>Resizing can be costly for dynamic arrays</li>
      </ul>

      {/* Use cases */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Common Use Cases
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Storing ordered collections of data</li>
        <li>Lookup tables and buffers</li>
        <li>Underlying structure for stacks, queues, and heaps</li>
      </ul>

      {/* Navigation */}
      <NextPrev />
    </div>
  )
}
