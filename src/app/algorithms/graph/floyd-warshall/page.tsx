export default function FloydWarshallPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Floyd–Warshall Algorithm
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Floyd–Warshall finds the shortest distances between all pairs of nodes.
        It uses dynamic programming and works with negative weights (but no
        negative cycles).
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft)">
        {`function floydWarshall(dist):
    for k in all vertices:
        for i in all vertices:
            for j in all vertices:
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

    return dist`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time: O(V³)</li>
        <li>Space: O(V²)</li>
      </ul>
    </div>
  )
}
