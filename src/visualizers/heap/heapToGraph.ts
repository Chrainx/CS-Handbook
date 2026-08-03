import { HeapVisualState } from './state'
import { GraphCanvasProps } from '@/visualizers/primitives/graph/types'

const X_SPACING = 60
const Y_SPACING = 80

/** Lays the heap's array out as the complete binary tree it actually
 * represents (node i's children are at 2i+1 and 2i+2), using the same
 * in-order-rank-for-x/depth-for-y technique as the BST tree visualizer -
 * a heap is a tree, so it should look like one rather than a bar chart. */
export function heapStateToGraph(state: HeapVisualState): GraphCanvasProps {
  const { array } = state
  const nodes: GraphCanvasProps['nodes'] = []
  const edges: GraphCanvasProps['edges'] = []
  let x = 0

  function walk(i: number, depth: number): string | null {
    if (i >= array.length) return null

    const leftId = walk(2 * i + 1, depth + 1)
    const id = `n${i}`

    nodes.push({
      id,
      x: x++ * X_SPACING,
      y: depth * Y_SPACING,
      label: String(array[i]),
      state:
        state.swap && (i === state.swap.i || i === state.swap.j)
          ? 'active'
          : state.compare && (i === state.compare.i || i === state.compare.j)
            ? 'visiting'
            : i === 0
              ? 'visited'
              : 'default',
    })

    if (leftId) edges.push({ from: id, to: leftId, directed: true })

    const rightId = walk(2 * i + 2, depth + 1)
    if (rightId) edges.push({ from: id, to: rightId, directed: true })

    return id
  }

  walk(0, 0)

  return { nodes, edges }
}
