import QueueVisualizer from '@/visualizers/queue/queueVisualizer'

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Queue Visualizer</h1>
      <QueueVisualizer />
    </div>
  )
}
