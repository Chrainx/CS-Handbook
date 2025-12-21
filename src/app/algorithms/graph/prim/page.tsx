import NextPrev from '@/components/nextPrev'

export default function PrimPage() {
  return (
    <div>
      {/* 1. Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Prim&apos;s Algorithm
      </h1>

      {/* 2. Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        Prim&apos;s Algorithm is a greedy algorithm used to find a Minimum
        Spanning Tree (MST) of a connected, weighted, undirected graph. It grows
        the MST by repeatedly adding the minimum-weight edge that connects a
        visited vertex to an unvisited vertex.
      </p>

      {/* 3. Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        The algorithm starts from an arbitrary vertex and expands the spanning
        tree one vertex at a time. At each step, it selects the smallest edge
        that connects the current tree to a new vertex, ensuring the tree
        remains connected and acyclic.
      </p>

      {/* 4. Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function prim(graph, start):
    for each vertex v:
        key[v] = infinity
        parent[v] = null
    key[start] = 0

    priorityQueue = all vertices ordered by key

    while priorityQueue not empty:
        u = extract vertex with minimum key

        for each edge (u, v) with weight w:
            if v in priorityQueue and w < key[v]:
                parent[v] = u
                key[v] = w
                update v in priorityQueue

    return parent
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
        <li>Finding a minimum spanning tree</li>
        <li>Dense graphs where edge sorting is costly</li>
        <li>When a starting vertex is fixed</li>
        <li>Network design and infrastructure planning</li>
      </ul>

      <NextPrev />
    </div>
  )
}
