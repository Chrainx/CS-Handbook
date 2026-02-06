import { Suspense } from 'react'
import ClientBinarySearch from '@/visualizers/searching/binary-search/clientBinarySearch'

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Binary Search Visualizer</h1>
      <Suspense fallback={<div>Loading binary search visualizer…</div>}>
        <ClientBinarySearch />
      </Suspense>
    </div>
  )
}
