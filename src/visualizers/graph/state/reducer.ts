import { GraphStep } from '@/visualizers/steps/types'
import { GraphVisualState } from './types'

/* ============================================================================
 * Initial empty visual state
 * ========================================================================== */

export const initialGraphVisualState: GraphVisualState = {
  nodes: {},
  edges: {},
  activeNode: null,
}

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
