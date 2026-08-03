import { BSTNode } from './bst'
import { TreeVisualState } from './state'
import { GraphCanvasProps } from '@/visualizers/primitives/graph/types'

const X_SPACING = 70
const Y_SPACING = 80

/** Lays a BST out for GraphCanvas: x position comes from in-order rank (so
 * left-of-parent nodes always render left of it, right-of-parent always
 * right), y position from depth - the standard way to draw a BST so it
 * reads correctly without any explicit layout data stored on the tree. */
export function treeStateToGraph(state: TreeVisualState): GraphCanvasProps {
  const nodes: GraphCanvasProps['nodes'] = []
  const edges: GraphCanvasProps['edges'] = []
  let x = 0

  function walk(node: BSTNode | null, depth: number): string | null {
    if (!node) return null

    const leftId = walk(node.left, depth + 1)
    const id = String(node.value)

    nodes.push({
      id,
      x: x++ * X_SPACING,
      y: depth * Y_SPACING,
      state:
        node.value === state.compareValue
          ? 'active'
          : node.value === state.visitValue
            ? 'visiting'
            : node.value === state.insertedValue
              ? 'visited'
              : 'default',
    })

    if (leftId) edges.push({ from: id, to: leftId, directed: true })

    const rightId = walk(node.right, depth + 1)
    if (rightId) edges.push({ from: id, to: rightId, directed: true })

    return id
  }

  walk(state.root, 0)

  return { nodes, edges }
}
