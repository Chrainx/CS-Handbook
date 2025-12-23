import NextPrev from '@/components/nextPrev'

export default function DataStructuresOverviewPage() {
  return (
    <div>
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Data Structures
      </h1>

      {/* Intro */}
      <p className="mb-4 text-(--text-secondary)">
        Data Structures define how data is organized, stored, and accessed in
        memory. Choosing the right data structure is often more important than
        choosing the right algorithm, as it directly affects performance,
        scalability, and code simplicity.
      </p>

      {/* Core idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>
      <p className="text-(--text-secondary)">
        Different data structures optimize for different operations such as
        access, insertion, deletion, and search. There is no single “best” data
        structure — the correct choice depends on the problem constraints and
        usage patterns.
      </p>

      {/* What you'll find */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        What You’ll Find Here
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Linear structures like arrays, stacks, and queues</li>
        <li>Pointer-based structures such as linked lists and trees</li>
        <li>Hash-based structures for fast lookup</li>
        <li>Priority-based structures like heaps</li>
        <li>Graph representations for complex relationships</li>
      </ul>

      {/* Relationship to algorithms */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Relationship to Algorithms
      </h2>
      <p className="text-(--text-secondary)">
        Data structures and algorithms are complementary concepts. Algorithms
        describe <em>how</em> a problem is solved, while data structures
        determine
        <em> how efficiently</em> data can be manipulated during that process.
        Many algorithms rely on specific data structures to achieve optimal
        performance.
      </p>

      {/* Navigation */}
      <NextPrev />
    </div>
  )
}
