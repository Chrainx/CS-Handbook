import NextPrev from '@/components/nextPrev'

export default function AlgorithmsOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        Algorithms
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Algorithms are step-by-step procedures used to solve computational
        problems. They define how input data is processed, transformed, and
        optimized to produce a desired output.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        In practice, the choice of algorithm often has a much bigger impact on
        performance than the choice of programming language or hardware. A
        well-designed algorithm can turn an otherwise infeasible problem into
        one that runs efficiently even at large scale.
      </p>

      {/* What will be covered */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        What Will Be Covered
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Sorting</strong> — techniques for ordering data efficiently,
          forming the basis for many other algorithms.
        </li>
        <li>
          <strong>Searching</strong> — methods for locating elements quickly in
          structured data.
        </li>
        <li>
          <strong>Graph Algorithms</strong> — algorithms for modeling and
          solving problems involving networks and relationships.
        </li>
        <li>
          <strong>Dynamic Programming</strong> — strategies for solving complex
          problems by breaking them into overlapping subproblems.
        </li>
        <li>
          <strong>Greedy Algorithms</strong> — algorithms that make locally
          optimal choices to build efficient global solutions.
        </li>
      </ul>

      {/* How to use this section */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        How to Use This Section
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        Each category introduces a common algorithmic paradigm, followed by
        representative problems and implementations. The focus is on
        understanding when an algorithm applies, how it works, and what
        trade-offs it makes in terms of time and space.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        Code examples and explanations are written with clarity in mind, aiming
        to build intuition rather than relying on heavy mathematical proofs.
      </p>

      <NextPrev />
    </div>
  )
}
