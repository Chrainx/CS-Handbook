import NextPrev from '@/components/nextPrev'

export default function DFSPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Depth-First Search (DFS)
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        DFS explores a graph by going as deep as possible before backtracking.
        It is used for cycle detection, component finding, and topological
        sorting.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function DFS(node):
    if node is visited: return
    mark node as visited

    for neighbor in graph[node]:
        DFS(neighbor)`}
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
