import NextPrev from '@/components/nextPrev'

export default function DijkstraPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Dijkstra’s Algorithm
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Dijkstra finds the shortest path from a starting node to all other nodes
        in a weighted graph with non-negative weights.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode (Using Min Heap)
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function dijkstra(graph, source):
    dist = array with inf
    dist[source] = 0
    minHeap = [(0, source)]

    while minHeap not empty:
        (d, node) = extract_min(minHeap)

        if d > dist[node]:
            continue

        for (neighbor, weight) in graph[node]:
            newDist = d + weight
            if newDist < dist[neighbor]:
                dist[neighbor] = newDist
                push(minHeap, (newDist, neighbor))

    return dist`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time: O((V + E) log V)</li>
        <li>Space: O(V)</li>
      </ul>
      <NextPrev />
    </div>
  )
}
