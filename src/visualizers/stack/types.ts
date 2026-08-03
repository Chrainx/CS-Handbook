export type StackStep =
  | { type: 'push'; value: number }
  | { type: 'pop'; value: number }

export type StackState = {
  array: number[]
}

export const initialStackState: StackState = { array: [] }

export function stackReducer(state: StackState, step: StackStep): StackState {
  switch (step.type) {
    case 'push':
      return { array: [...state.array, step.value] }
    case 'pop':
      return { array: state.array.slice(0, -1) }
    default:
      return state
  }
}

export function describeStackStep(step: StackStep): string {
  switch (step.type) {
    case 'push':
      return `Pushed ${step.value} onto the top of the stack.`
    case 'pop':
      return `Popped ${step.value} off the top of the stack.`
  }
}
