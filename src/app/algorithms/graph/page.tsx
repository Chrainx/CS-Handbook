import NextPrev from '@/components/nextPrev'

export default function GraphOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Graph Algorithms
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Graph algorithms operate on structures made up of vertices (nodes) and
        edges (connections). They are used to model relationships such as road
        networks, social networks, dependency graphs, and communication systems.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        What Is a Graph?
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        A graph consists of a set of vertices and a set of edges connecting
        pairs of vertices. Edges may be directed or undirected, and they may
        carry weights representing costs, distances, or capacities.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Common Graph Types
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Directed vs Undirected graphs</li>
        <li>Weighted vs Unweighted graphs</li>
        <li>Cyclic vs Acyclic graphs</li>
        <li>Connected vs Disconnected graphs</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Problems Graph Algorithms Solve
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Traversing all vertices (BFS, DFS)</li>
        <li>Finding shortest paths between nodes</li>
        <li>Detecting cycles or connectivity</li>
        <li>Finding minimum spanning trees</li>
        <li>Ordering tasks with dependencies</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Categories of Graph Algorithms
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Traversal algorithms (BFS, DFS)</li>
        <li>
          Shortest path algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall)
        </li>
        <li>Minimum spanning tree algorithms (Kruskal, Prim)</li>
        <li>Topological sorting for DAGs</li>
      </ul>

      <p className="mt-6 text-(--text-secondary)">
        Each category focuses on a different type of graph problem, but many
        algorithms share similar underlying ideas such as relaxation, traversal,
        and greedy choices.
      </p>

      <NextPrev />
    </div>
  )
}
