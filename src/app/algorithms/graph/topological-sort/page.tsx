import NextPrev from '@/components/nextPrev'

export default function TopologicalSortPage() {
  return (
    <div>
      {/* 1. Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Topological Sort
      </h1>

      {/* 2. Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        Topological Sort is an ordering of the vertices in a directed graph such
        that for every directed edge u → v, vertex u appears before v in the
        ordering. It is only defined for Directed Acyclic Graphs (DAGs).
      </p>

      {/* 3. Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        The core idea is to order vertices based on dependencies. A vertex can
        be placed in the ordering only after all vertices that point to it have
        already been placed. This ensures all dependency constraints are
        respected.
      </p>

      {/* 4. Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function topologicalSort(graph):
    compute indegree of each vertex
    create queue of vertices with indegree 0
    result = empty list

    while queue not empty:
        node = dequeue
        add node to result

        for each neighbor of node:
            reduce indegree of neighbor
            if indegree becomes 0:
                enqueue neighbor

    return result
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
        <li>Scheduling tasks with dependencies</li>
        <li>Course prerequisite planning</li>
        <li>Build systems and compilation order</li>
        <li>Dependency resolution problems</li>
      </ul>

      <NextPrev />
    </div>
  )
}
