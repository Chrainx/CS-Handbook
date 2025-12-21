import NextPrev from '@/components/nextPrev'

export default function DFSPage() {
  return (
    <div>
      {/* 1. Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Depth-First Search (DFS)
      </h1>

      {/* 2. Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        Depth-First Search (DFS) is a graph traversal algorithm that explores a
        path as deeply as possible before backtracking to explore other paths.
        It starts from a source node and continues along one branch until no
        further progress can be made.
      </p>

      {/* 3. Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        DFS prioritizes depth over breadth. From each vertex, it immediately
        visits an unvisited neighbor and continues this process recursively (or
        using a stack) until it reaches a dead end, after which it backtracks to
        explore other branches.
      </p>

      {/* 4. Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function DFS(graph, start):
    mark start as visited
    process start

    for each neighbor of start:
        if neighbor is not visited:
            DFS(graph, neighbor)
`}
      </pre>

      {/* 5. Complexity Analysis */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O(V + E)</li>
        <li>Space Complexity: O(V)</li>
      </ul>

      {/* 6. When to Be Used */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Be Used
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Exploring all possible paths in a graph</li>
        <li>Detecting cycles</li>
        <li>Topological sorting</li>
        <li>Finding connected components</li>
      </ul>

      <NextPrev />
    </div>
  )
}
