import NextPrev from '@/components/nextPrev'

export default function BFSPage() {
  return (
    <div>
      {/* 1. Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Breadth-First Search (BFS)
      </h1>

      {/* 2. Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        Breadth-First Search (BFS) is a graph traversal algorithm that explores
        vertices starting from a source node and visits all neighboring vertices
        before moving on to vertices at the next level.
      </p>

      {/* 3. Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        BFS maintains a queue of vertices to visit. When a vertex is visited,
        all of its unvisited neighbors are added to the queue. This guarantees
        that vertices are processed in increasing order of their distance from
        the source.
      </p>

      {/* 4. Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function BFS(graph, start):
    create empty queue
    mark start as visited
    enqueue start

    while queue is not empty:
        node = dequeue
        process node

        for each neighbor of node:
            if neighbor is not visited:
                mark neighbor as visited
                enqueue neighbor
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
        <li>Finding shortest paths in unweighted graphs</li>
        <li>Traversing graphs level by level</li>
        <li>Checking reachability from a source node</li>
        <li>Detecting connected components</li>
      </ul>

      <NextPrev />
    </div>
  )
}
