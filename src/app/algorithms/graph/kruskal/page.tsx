import NextPrev from '@/components/nextPrev'

export default function KruskalPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Kruskal’s Algorithm (MST)
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Kruskal builds a Minimum Spanning Tree by sorting edges and taking them
        in increasing order of weight, while avoiding cycles using a Union–Find
        structure.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft)">
        {`function kruskal(edges, V):
    sort edges by weight
    uf = new UnionFind(V)
    mst = []

    for (u, v, w) in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst.append((u, v, w))

    return mst`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time: O(E log E)</li>
        <li>Space: O(V)</li>
        <li>With Union–Find (path compression): Almost O(1) per union/find</li>
      </ul>
      <NextPrev />
    </div>
  )
}
