import NextPrev from '@/components/nextPrev'

export default function DijkstraPage() {
  return (
    <div>
      {/* 1. Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Dijkstra&apos;s Algorithm
      </h1>

      {/* 2. Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        Dijkstra&apos;s Algorithm is a shortest path algorithm used to find the
        minimum distance from a source vertex to all other vertices in a
        weighted graph with non-negative edge weights.
      </p>

      {/* 3. Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        The algorithm maintains a set of vertices whose shortest distance from
        the source is already known. At each step, it selects the unvisited
        vertex with the smallest tentative distance, then relaxes its outgoing
        edges to update the distances of neighboring vertices.
      </p>

      {/* 4. Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function dijkstra(graph, source):
    for each vertex v:
        distance[v] = infinity
    distance[source] = 0

    priorityQueue = all vertices ordered by distance

    while priorityQueue not empty:
        u = extract vertex with minimum distance

        for each neighbor v of u:
            if distance[u] + weight(u, v) < distance[v]:
                distance[v] = distance[u] + weight(u, v)
                update v in priorityQueue
`}
      </pre>

      {/* 5. Complexity Analysis */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O((V + E) log V) with a priority queue</li>
        <li>Space Complexity: O(V)</li>
      </ul>

      {/* 6. When to Be Used */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Be Used
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Finding shortest paths in weighted graphs</li>
        <li>Graphs with non-negative edge weights</li>
        <li>Routing and navigation problems</li>
        <li>Network latency optimization</li>
      </ul>

      <NextPrev />
    </div>
  )
}
