export type LinkedListStep =
  | { type: 'insert-head'; value: number }
  | { type: 'insert-tail'; value: number }
  | { type: 'delete'; value: number }

export type LinkedListState = {
  list: number[]
}

export const initialLinkedListState: LinkedListState = { list: [] }

export function linkedListReducer(
  state: LinkedListState,
  step: LinkedListStep
): LinkedListState {
  switch (step.type) {
    case 'insert-head':
      return { list: [step.value, ...state.list] }
    case 'insert-tail':
      return { list: [...state.list, step.value] }
    case 'delete': {
      const index = state.list.indexOf(step.value)
      if (index === -1) return state
      return {
        list: [...state.list.slice(0, index), ...state.list.slice(index + 1)],
      }
    }
    default:
      return state
  }
}

export function describeLinkedListStep(step: LinkedListStep): string {
  switch (step.type) {
    case 'insert-head':
      return `Inserted ${step.value} at the head of the list.`
    case 'insert-tail':
      return `Inserted ${step.value} at the tail of the list.`
    case 'delete':
      return `Deleted the node with value ${step.value}, redirecting its neighbors' pointers.`
  }
}
