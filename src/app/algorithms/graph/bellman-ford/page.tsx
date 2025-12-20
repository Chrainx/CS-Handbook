import NextPrev from '@/components/nextPrev'

export default function BellmanFordPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Bellman–Ford Algorithm
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Bellman–Ford computes the shortest paths from a source node to all other
        nodes in a weighted graph — and it works even when some edges have
        negative weights. It can also detect negative cycles.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft)">
        {`function bellmanFord(edges, V, source):
    dist = array of size V filled with inf
    dist[source] = 0

    for i in 1 to V-1:
        for (u, v, w) in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    for (u, v, w) in edges:
        if dist[u] + w < dist[v]:
            report "Negative cycle detected"

    return dist`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time: O(V × E)</li>
        <li>Space: O(V)</li>
      </ul>
      <NextPrev />
    </div>
  )
}
