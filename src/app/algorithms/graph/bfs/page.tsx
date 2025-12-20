import NextPrev from '@/components/nextPrev'

export default function BFSPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Breadth-First Search (BFS)
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        BFS explores a graph level by level. It is used to find the shortest
        path in an unweighted graph and to perform layer-based traversal.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Use BFS
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Level-by-level exploration</li>
        <li>Shortest path in unweighted graphs</li>
        <li>Connected components in undirected graphs</li>
        <li>Finding neighbors within k steps</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function BFS(graph, start):
    queue = [start]
    visited = {start}

    while queue is not empty:
        node = queue.pop_front()

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.push(neighbor)`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time: O(V + E)</li>
        <li>Space: O(V)</li>
      </ul>
      <NextPrev />
    </div>
  )
}
