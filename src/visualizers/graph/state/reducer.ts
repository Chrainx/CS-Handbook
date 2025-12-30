import { GraphStep } from '@/visualizers/steps/types'
import { GraphVisualState, initialGraphVisualState } from './types'

/* ============================================================================
 * Reducer
 * ==========================================================================
 * IMPORTANT:
 * - Must be PURE
 * - Must NOT mutate previous state
 * - Must be replay-safe
 * ========================================================================== */

export function graphReducer(
  state: GraphVisualState = initialGraphVisualState,
  step: GraphStep
): GraphVisualState {
  switch (step.type) {
    case 'reset':
      return initialGraphVisualState

    case 'visit-node': {
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [step.node]: 'visiting',
        },
        activeNode: step.node,
      }
    }

    case 'mark-visited': {
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [step.node]: 'visited',
        },
        activeNode: null,
      }
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

    case 'enqueue': {
      return {
        ...state,
        queue: [...state.queue, step.node],
      }
    }

    case 'dequeue': {
      return {
        ...state,
        queue: state.queue.slice(1),
      }
    }

    case 'push-stack': {
      return {
        ...state,
        stack: [...state.stack, step.node],
      }
    }

    case 'pop-stack': {
      return {
        ...state,
        stack: state.stack.slice(0, -1),
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

    case 'set-active-node': {
      return {
        ...state,
        activeNode: step.node,
      }
    }

    case 'done': {
      return {
        ...state,
        activeNode: null,
      }
    }

    default:
      return state
  }
}
