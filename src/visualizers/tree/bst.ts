export type BSTNode = {
  value: number
  left: BSTNode | null
  right: BSTNode | null
}

export type TraversalOrder = 'pre' | 'in' | 'post'

export type TreeStep =
  | { type: 'compare'; current: number; value: number }
  | { type: 'insert'; value: number }
  | { type: 'duplicate'; value: number }
  | { type: 'visit'; value: number }
  | { type: 'done' }

/** Pure - `root` is treated as read-only. Returns a new tree with `value`
 * inserted, or the same tree if `value` is already present. */
export function insertNode(root: BSTNode | null, value: number): BSTNode {
  if (!root) return { value, left: null, right: null }
  if (value < root.value) return { ...root, left: insertNode(root.left, value) }
  if (value > root.value) return { ...root, right: insertNode(root.right, value) }
  return root
}

/** Pure - mirrors insertNode's own comparisons so the animation always
 * matches exactly what the reducer will do. */
export function bstInsertSteps(root: BSTNode | null, value: number): TreeStep[] {
  const steps: TreeStep[] = []
  let node = root

  while (node) {
    steps.push({ type: 'compare', current: node.value, value })

    if (value === node.value) {
      // No trailing 'done' step here - 'duplicate' must stay the last
      // step so its message (and warning styling) isn't immediately
      // overwritten by a generic "Done." once the animation finishes.
      steps.push({ type: 'duplicate', value })
      return steps
    }

    node = value < node.value ? node.left : node.right
  }

  steps.push({ type: 'insert', value })
  steps.push({ type: 'done' })
  return steps
}

/** Pure - read-only walk, does not mutate the tree. */
export function bstTraverseSteps(
  root: BSTNode | null,
  order: TraversalOrder
): TreeStep[] {
  const steps: TreeStep[] = []

  function walk(node: BSTNode | null) {
    if (!node) return
    if (order === 'pre') steps.push({ type: 'visit', value: node.value })
    walk(node.left)
    if (order === 'in') steps.push({ type: 'visit', value: node.value })
    walk(node.right)
    if (order === 'post') steps.push({ type: 'visit', value: node.value })
  }

  walk(root)
  steps.push({ type: 'done' })
  return steps
}

export function describeTreeStep(step: TreeStep): string {
  switch (step.type) {
    case 'compare':
      return step.value < step.current
        ? `${step.value} < ${step.current}, going left.`
        : `${step.value} > ${step.current}, going right.`
    case 'insert':
      return `Inserted ${step.value} as a new leaf.`
    case 'duplicate':
      return `${step.value} is already in the tree - no duplicate inserted.`
    case 'visit':
      return `Visiting node ${step.value}.`
    case 'done':
      return 'Done.'
  }
}
