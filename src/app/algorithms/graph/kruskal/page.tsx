import NextPrev from '@/components/nextPrev'

export default function KruskalPage() {
  return (
    <div>
      {/* 1. Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Kruskal&apos;s Algorithm
      </h1>

      {/* 2. Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        Kruskal&apos;s Algorithm is a greedy algorithm used to find a Minimum
        Spanning Tree (MST) of a connected, weighted, undirected graph. It
        builds the MST by adding edges in increasing order of weight while
        avoiding cycles.
      </p>

      {/* 3. Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        The algorithm sorts all edges by weight and then repeatedly selects the
        smallest edge that connects two different components. A disjoint-set
        (union–find) data structure is used to efficiently detect cycles.
      </p>

      {/* 4. Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function kruskal(graph):
    sort all edges by increasing weight
    create disjoint set for each vertex
    mst = empty set

    for each edge (u, v) in sorted edges:
        if find(u) != find(v):
            add edge (u, v) to mst
            union(u, v)

    return mst
`}
      </pre>

      {/* 5. Complexity Analysis */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O(E log E)</li>
        <li>Space Complexity: O(V)</li>
      </ul>

      {/* 6. When to Be Used */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Be Used
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Finding a minimum spanning tree</li>
        <li>Graphs where edges are easy to sort</li>
        <li>Sparse graphs</li>
        <li>When union–find is available</li>
      </ul>

      <NextPrev />
    </div>
  )
}
