import NextPrev from '@/components/nextPrev'

export default function DynamicProgrammingOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Dynamic Programming
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Dynamic Programming (DP) is a problem-solving technique used to optimize
        solutions by breaking a problem into smaller subproblems, solving each
        subproblem once, and reusing those results. It is especially effective
        for problems that would otherwise have exponential time complexity when
        solved using brute force.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Key Characteristics
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>
          <strong>Overlapping subproblems:</strong> The same subproblems appear
          multiple times during computation.
        </li>
        <li>
          <strong>Optimal substructure:</strong> The optimal solution to a
          problem can be constructed from optimal solutions of its subproblems.
        </li>
        <li>
          <strong>State definition:</strong> Each subproblem is represented as a
          state with a well-defined meaning.
        </li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Common DP Approaches
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>
          <strong>Top-down (Memoization):</strong> Solve the problem recursively
          while caching results of subproblems.
        </li>
        <li>
          <strong>Bottom-up (Tabulation):</strong> Solve smaller subproblems
          first and build up to the final solution iteratively.
        </li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Common Problem Categories
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Knapsack and resource allocation problems</li>
        <li>Sequence problems (subsequences, substrings)</li>
        <li>Grid and matrix-based problems</li>
        <li>Counting and combinatorial problems</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Algorithms Covered in This Section
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>0/1 Knapsack</li>
        <li>Coin Change</li>
        <li>Longest Increasing Subsequence (LIS)</li>
        <li>Other classic dynamic programming problems</li>
      </ul>

      <p className="mt-6 text-(--text-secondary)">
        Dynamic Programming is a fundamental technique in algorithm design and
        appears frequently in optimization, scheduling, and competitive
        programming problems.
      </p>

      <NextPrev />
    </div>
  )
}
