import NextPrev from '@/components/nextPrev'

export default function HashTablePage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        Hash Table
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        A hash table is a data structure that stores key–value pairs and
        provides fast access to values based on their keys. It uses a hash
        function to map keys to indices in an underlying array.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        The main goal of a hash table is to achieve constant-time performance
        for common operations such as insertion, deletion, and lookup under
        typical conditions.
      </p>

      {/* Hash function */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Hash Function
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        A hash function takes a key and converts it into an integer index. A
        good hash function distributes keys uniformly across the table to
        minimize collisions.
      </p>

      {/* Collisions */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Collisions
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        A collision occurs when two different keys produce the same hash value.
        Since collisions are unavoidable, hash tables must handle them
        efficiently.
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Separate Chaining</strong> — each table index stores a list of
          entries that hash to the same value.
        </li>
        <li>
          <strong>Open Addressing</strong> — collisions are resolved by probing
          other slots in the table.
        </li>
      </ul>

      {/* Operations */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Core Operations
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Insert — add a key–value pair</li>
        <li>Search — retrieve a value by key</li>
        <li>Delete — remove a key–value pair</li>
      </ul>

      {/* Complexity */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Time Complexity
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Average case (insert, search, delete): O(1)</li>
        <li>Worst case: O(n)</li>
      </ul>

      {/* Load factor */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Load Factor
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        The load factor measures how full a hash table is. As the load factor
        increases, collisions become more frequent. To maintain performance,
        hash tables often resize and rehash their contents when a threshold is
        exceeded.
      </p>

      {/* Use cases */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Common Use Cases
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Implementing dictionaries and maps</li>
        <li>Caching and memoization</li>
        <li>Fast membership tests</li>
        <li>Counting frequencies and grouping data</li>
      </ul>

      {/* Notes */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Key Characteristics
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Hash tables provide excellent average-case performance but rely heavily
        on a good hash function and proper resizing strategies. In adversarial
        scenarios, performance can degrade to linear time.
      </p>

      <NextPrev />
    </div>
  )
}
