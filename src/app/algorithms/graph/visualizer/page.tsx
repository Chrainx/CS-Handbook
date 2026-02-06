import { Suspense } from 'react'
import ClientGraph from '@/visualizers/graph/clientGraph'

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Graph Algorithms</h1>
      <Suspense fallback={<div>Loading graph visualizer…</div>}>
        <ClientGraph />
      </Suspense>
    </>
  )
}
