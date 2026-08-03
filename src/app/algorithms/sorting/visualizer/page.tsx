import { Suspense } from 'react'
import SortingVisualizer from '@/visualizers/sorting/sortingVisualizer'

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Sorting Algorithms</h1>
      <Suspense fallback={<div>Loading sorting visualizer…</div>}>
        <SortingVisualizer />
      </Suspense>
    </>
  )
}
