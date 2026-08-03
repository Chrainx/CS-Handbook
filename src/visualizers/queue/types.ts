export type QueueStep =
  | { type: 'enqueue'; value: number }
  | { type: 'dequeue'; value: number }

export type QueueState = {
  array: number[]
}

export const initialQueueState: QueueState = { array: [] }

export function queueReducer(state: QueueState, step: QueueStep): QueueState {
  switch (step.type) {
    case 'enqueue':
      return { array: [...state.array, step.value] }
    case 'dequeue':
      return { array: state.array.slice(1) }
    default:
      return state
  }
}

export function describeQueueStep(step: QueueStep): string {
  switch (step.type) {
    case 'enqueue':
      return `Enqueued ${step.value} at the rear of the queue.`
    case 'dequeue':
      return `Dequeued ${step.value} from the front of the queue.`
  }
}
