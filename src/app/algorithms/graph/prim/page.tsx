export default function PrimPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Prim’s Algorithm (MST)
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Prim grows a Minimum Spanning Tree one vertex at a time by always
        choosing the cheapest edge that connects the tree to a new vertex.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode (Min Heap)
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft)">
        {`function prim(graph, start):
    visited = {}
    minHeap = [(0, start)]
    mst = []

    while minHeap not empty:
        (w, node) = extract_min(minHeap)
        if node in visited: continue

        visited.add(node)
        mst.append((node, w))

        for (neighbor, weight) in graph[node]:
            if neighbor not in visited:
                push(minHeap, (weight, neighbor))

    return mst`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time: O(E log V)</li>
        <li>Space: O(V)</li>
      </ul>
    </div>
  )
}
