import TreeVisualizer from '@/visualizers/tree/treeVisualizer'

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">
        Binary Search Tree Visualizer
      </h1>
      <TreeVisualizer />
    </div>
  )
}
