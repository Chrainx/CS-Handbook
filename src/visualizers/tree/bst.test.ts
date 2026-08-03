import { describe, expect, it } from 'vitest'
import { insertNode, bstInsertSteps, bstTraverseSteps, BSTNode } from './bst'

function inorderValues(root: BSTNode | null): number[] {
  if (!root) return []
  return [...inorderValues(root.left), root.value, ...inorderValues(root.right)]
}

function isValidBst(root: BSTNode | null, min = -Infinity, max = Infinity): boolean {
  if (!root) return true
  if (root.value <= min || root.value >= max) return false
  return (
    isValidBst(root.left, min, root.value) &&
    isValidBst(root.right, root.value, max)
  )
}

describe('insertNode', () => {
  it('creates a single-node tree from an empty tree', () => {
    const tree = insertNode(null, 5)
    expect(tree).toEqual({ value: 5, left: null, right: null })
  })

  it('inserts smaller values to the left and larger to the right', () => {
    let tree: BSTNode | null = null
    for (const v of [5, 3, 8, 1, 4]) tree = insertNode(tree, v)
    expect(isValidBst(tree)).toBe(true)
    expect(inorderValues(tree)).toEqual([1, 3, 4, 5, 8])
  })

  it('does not insert a duplicate value', () => {
    let tree: BSTNode | null = insertNode(null, 5)
    tree = insertNode(tree, 5)
    expect(inorderValues(tree)).toEqual([5])
  })

  it('maintains a valid BST across many insertions in random order', () => {
    let tree: BSTNode | null = null
    for (const v of [8, 3, 9, 1, 6, 2, 7, 4, 5, 0]) {
      tree = insertNode(tree, v)
    }
    expect(isValidBst(tree)).toBe(true)
    expect(inorderValues(tree)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })
})

describe('bstInsertSteps', () => {
  it('ends with an insert + done step for a new value', () => {
    const steps = bstInsertSteps(insertNode(null, 5), 3)
    expect(steps[steps.length - 2]).toEqual({ type: 'insert', value: 3 })
    expect(steps[steps.length - 1]).toEqual({ type: 'done' })
  })

  it('ends with a duplicate step (no trailing done) for an existing value, without an insert step', () => {
    const tree = insertNode(insertNode(null, 5), 3)
    const steps = bstInsertSteps(tree, 3)
    expect(steps.some((s) => s.type === 'insert')).toBe(false)
    expect(steps[steps.length - 1]).toEqual({ type: 'duplicate', value: 3 })
  })

  it('compares against every node on the path to the insertion point', () => {
    const tree = insertNode(insertNode(insertNode(null, 5), 3), 1)
    const steps = bstInsertSteps(tree, 2)
    const compares = steps.filter((s) => s.type === 'compare')
    expect(compares).toEqual([
      { type: 'compare', current: 5, value: 2 },
      { type: 'compare', current: 3, value: 2 },
      { type: 'compare', current: 1, value: 2 },
    ])
  })
})

describe('bstTraverseSteps', () => {
  //        5
  //       / \
  //      3   8
  //     /
  //    1
  function buildTree(): BSTNode {
    let tree: BSTNode | null = null
    for (const v of [5, 3, 8, 1]) tree = insertNode(tree, v)
    return tree!
  }

  it('in-order visits values in ascending order', () => {
    const steps = bstTraverseSteps(buildTree(), 'in')
    const visited = steps
      .filter((s) => s.type === 'visit')
      .map((s) => (s as { value: number }).value)
    expect(visited).toEqual([1, 3, 5, 8])
  })

  it('pre-order visits the root first', () => {
    const steps = bstTraverseSteps(buildTree(), 'pre')
    const visited = steps
      .filter((s) => s.type === 'visit')
      .map((s) => (s as { value: number }).value)
    expect(visited).toEqual([5, 3, 1, 8])
  })

  it('post-order visits the root last', () => {
    const steps = bstTraverseSteps(buildTree(), 'post')
    const visited = steps
      .filter((s) => s.type === 'visit')
      .map((s) => (s as { value: number }).value)
    expect(visited).toEqual([1, 3, 8, 5])
  })

  it('handles an empty tree', () => {
    const steps = bstTraverseSteps(null, 'in')
    expect(steps).toEqual([{ type: 'done' }])
  })
})
