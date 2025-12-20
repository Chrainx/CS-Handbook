export default function TopologicalSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Topological Sort
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Topological sorting orders nodes of a directed acyclic graph (DAG) such
        that every edge u → v appears with u before v. It is used for
        scheduling, dependency resolution, and ordering tasks.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Kahn’s Algorithm (BFS Method)
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function topoSort(graph):
    indegree = array of indegrees
    queue = all nodes with indegree 0
    order = []

    while queue not empty:
        node = queue.pop_front()
        append node to order

        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.push(neighbor)

    return order`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time: O(V + E)</li>
        <li>Space: O(V)</li>
      </ul>
    </div>
  )
}
