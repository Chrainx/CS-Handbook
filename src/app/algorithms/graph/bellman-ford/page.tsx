import NextPrev from '@/components/nextPrev'

export default function BellmanFordPage() {
  return (
    <div>
      {/* 1. Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Bellman–Ford Algorithm
      </h1>

      {/* 2. Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        The Bellman–Ford algorithm computes the shortest paths from a single
        source vertex to all other vertices in a weighted graph. Unlike
        Dijkstra’s algorithm, it can handle graphs with negative edge weights.
      </p>

      {/* 3. Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        The algorithm repeatedly relaxes all edges in the graph. By doing this
        V−1 times (where V is the number of vertices), the shortest paths are
        guaranteed to be found. An additional pass is used to detect negative
        weight cycles.
      </p>

      {/* 4. Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function bellmanFord(graph, source):
    for each vertex v:
        distance[v] = infinity
    distance[source] = 0

    repeat V - 1 times:
        for each edge (u, v) with weight w:
            if distance[u] + w < distance[v]:
                distance[v] = distance[u] + w

    for each edge (u, v) with weight w:
        if distance[u] + w < distance[v]:
            report negative cycle
`}
      </pre>

      {/* 5. Complexity Analysis */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O(V × E)</li>
        <li>Space Complexity: O(V)</li>
      </ul>

      {/* 6. When to Be Used */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Be Used
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Graphs with negative edge weights</li>
        <li>When negative cycle detection is required</li>
        <li>Smaller graphs where simplicity is preferred</li>
        <li>As a reference algorithm for shortest paths</li>
      </ul>

      <NextPrev />
    </div>
  )
}
