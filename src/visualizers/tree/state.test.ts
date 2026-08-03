import { describe, expect, it } from 'vitest'
import { treeReducer, initialTreeVisualState } from './state'
import { insertNode } from './bst'

describe('treeReducer', () => {
  it('compare sets compareValue and clears visitValue', () => {
    const start = { ...initialTreeVisualState, visitValue: 3 }
    const state = treeReducer(start, { type: 'compare', current: 5, value: 2 })
    expect(state.compareValue).toBe(5)
    expect(state.visitValue).toBeNull()
  })

  it('insert adds the value to the tree and records it as insertedValue', () => {
    const state = treeReducer(initialTreeVisualState, {
      type: 'insert',
      value: 5,
    })
    expect(state.root).toEqual({ value: 5, left: null, right: null })
    expect(state.insertedValue).toBe(5)
    expect(state.compareValue).toBeNull()
  })

  it('insert on a non-empty tree preserves existing nodes', () => {
    const start = { ...initialTreeVisualState, root: insertNode(null, 5) }
    const state = treeReducer(start, { type: 'insert', value: 3 })
    expect(state.root).toEqual({
      value: 5,
      left: { value: 3, left: null, right: null },
      right: null,
    })
  })

  it('duplicate clears compareValue without changing the tree', () => {
    const root = insertNode(null, 5)
    const start = { ...initialTreeVisualState, root, compareValue: 5 }
    const state = treeReducer(start, { type: 'duplicate', value: 5 })
    expect(state.root).toBe(root)
    expect(state.compareValue).toBeNull()
  })

  it('visit sets visitValue and clears compareValue', () => {
    const start = { ...initialTreeVisualState, compareValue: 5 }
    const state = treeReducer(start, { type: 'visit', value: 3 })
    expect(state.visitValue).toBe(3)
    expect(state.compareValue).toBeNull()
  })

  it('done clears compareValue', () => {
    const start = { ...initialTreeVisualState, compareValue: 5 }
    const state = treeReducer(start, { type: 'done' })
    expect(state.compareValue).toBeNull()
  })
})
