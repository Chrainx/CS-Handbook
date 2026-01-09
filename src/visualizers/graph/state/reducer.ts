import { GraphStep } from '@/visualizers/steps/types'
import {
  GraphState,
  initialGraphState,
  GRAPH_ALGO_CATEGORY,
  GraphAlgorithmId,
} from './types'

/**
 * Reducer is CATEGORY-AWARE.
 * Visual noise is filtered here, not in step generators.
 */
export function graphReducer(
  state: GraphState,
  step: GraphStep & { algorithm?: GraphAlgorithmId }
): GraphState {
  const category = step.algorithm ? GRAPH_ALGO_CATEGORY[step.algorithm] : null

  switch (step.type) {
    /* ================= RESET ================= */

    case 'reset':
      return initialGraphState

    /* ================= NODE STATES ================= */

    case 'visit-node':
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [step.node]: 'visiting',
        },
      }

    case 'mark-visited':
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [step.node]: 'visited',
        },
      }

    /* ================= EDGE STATES ================= */

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

    /* ================= DISTANCES ================= */

    case 'set-distance':
      return {
        ...state,
        distances: {
          ...state.distances,
          [step.node]: step.distance,
        },
      }

    /* ================= QUEUE / STACK ================= */

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

    /* ================= PRIORITY QUEUE ================= */

    case 'pq-push':
      if (category !== 'shortest-path') return state

      return {
        ...state,
        pq: [...(state.pq ?? []), step.item],
      }

    case 'pq-pop':
      if (category !== 'shortest-path' || !state.pq) return state

      const idx = state.pq.findIndex(
        (x) => x.node === step.node && x.priority === step.priority
      )
      if (idx === -1) return state

      return {
        ...state,
        pq: [...state.pq.slice(0, idx), ...state.pq.slice(idx + 1)],
      }

    /* ================= DONE ================= */

    case 'bf-pass':
      return state

    case 'done':
      return {
        ...state,
      }

    default:
      return state
  }
}
