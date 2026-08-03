import HeapVisualizer from '@/visualizers/heap/heapVisualizer'

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Heap Visualizer</h1>
      <HeapVisualizer />
    </div>
  )
}
