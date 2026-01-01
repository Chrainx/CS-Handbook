import { GraphStep } from '@/visualizers/steps/types'
import { GraphState, initialGraphState } from './types'

export function graphReducer(state: GraphState, step: GraphStep): GraphState {
  switch (step.type) {
    case 'reset':
      return initialGraphState

    case 'visit-node':
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [step.node]: 'visiting',
        },
        activeNode: step.node,
      }

    case 'mark-visited':
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [step.node]: 'visited',
        },
        activeNode: null,
      }

    case 'activate-edge': {
      const key = `${step.from}->${step.to}`
      return {
        ...state,
        edges: {
          ...state.edges,
          [key]: 'active',
        },
      }
    }

    case 'relax-edge': {
      const key = `${step.from}->${step.to}`
      return {
        ...state,
        edges: {
          ...state.edges,
          [key]: 'relaxed',
        },
      }
    }

    case 'choose-edge': {
      const key = `${step.from}->${step.to}`
      return {
        ...state,
        edges: {
          ...state.edges,
          [key]: 'chosen',
        },
      }
    }

    case 'set-distance':
      return {
        ...state,
        distances: {
          ...state.distances,
          [step.node]: step.distance,
        },
      }

    case 'enqueue':
      return {
        ...state,
        queue: [...state.queue, step.node],
      }

    case 'dequeue':
      return {
        ...state,
        queue: state.queue.slice(1),
      }

    case 'push-stack':
      return {
        ...state,
        stack: [...state.stack, step.node],
      }

    case 'pop-stack':
      return {
        ...state,
        stack: state.stack.slice(0, -1),
      }

    case 'pq-init': {
      return {
        ...state,
        pq: [],
      }
    }

    case 'pq-push': {
      return {
        ...state,
        pq: [...state.pq!, step.item],
      }
    }

    case 'pq-pop': {
      if (!state.pq || state.pq.length === 0) return state

      const idx = state.pq.findIndex(
        (x) => x.node === step.node && x.priority === step.priority
      )
      if (idx === -1) return state

      return {
        ...state,
        pq: [...state.pq.slice(0, idx), ...state.pq.slice(idx + 1)],
      }
    }

    case 'set-active-node':
      return {
        ...state,
        activeNode: step.node,
      }

    case 'done':
      return {
        ...state,
        activeNode: null,
      }

    default:
      return state
  }
}
