import { Suspense } from 'react'
import BinarySearchVisualizer from '@/visualizers/searching/binary-search/binarySearchVisualizer'

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Binary Search Visualizer</h1>
      <Suspense fallback={<div>Loading binary search visualizer…</div>}>
        <BinarySearchVisualizer />
      </Suspense>
    </div>
  )
}
