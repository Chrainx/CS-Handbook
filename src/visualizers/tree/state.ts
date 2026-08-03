import { BSTNode, TreeStep, insertNode } from './bst'

export type TreeVisualState = {
  root: BSTNode | null
  compareValue: number | null
  visitValue: number | null
  insertedValue: number | null
}

export const initialTreeVisualState: TreeVisualState = {
  root: null,
  compareValue: null,
  visitValue: null,
  insertedValue: null,
}

export function treeReducer(
  state: TreeVisualState,
  step: TreeStep
): TreeVisualState {
  switch (step.type) {
    case 'compare':
      return { ...state, compareValue: step.current, visitValue: null }

    case 'insert':
      return {
        ...state,
        root: insertNode(state.root, step.value),
        compareValue: null,
        insertedValue: step.value,
      }

    case 'duplicate':
      return { ...state, compareValue: null }

    case 'visit':
      return { ...state, visitValue: step.value, compareValue: null }

    case 'done':
      return { ...state, compareValue: null }

    default:
      return state
  }
}
