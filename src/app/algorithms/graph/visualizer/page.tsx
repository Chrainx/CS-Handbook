import { Suspense } from 'react'
import GraphVisualizer from '@/visualizers/graph/graphVisualizer'

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Graph Algorithms</h1>
      <Suspense fallback={<div>Loading graph visualizer…</div>}>
        <GraphVisualizer />
      </Suspense>
    </>
  )
}
