export type LinkedListStep =
  | { type: 'create-node'; value: number }
  | { type: 'traverse'; index: number }
  | { type: 'link-new-to-head' }
  | { type: 'set-head-to-new' }
  | { type: 'link-tail-to-new' }
  | { type: 'mark-target'; index: number }
  | { type: 'bypass-and-remove'; index: number }
  | { type: 'not-found' }
  | { type: 'done' }

export type LinkedListState = {
  list: number[]
  /** A node that's been created but isn't linked into the list yet - shown
   * detached so insertion reads as "build the node, then wire it in,"
   * matching how a real implementation constructs a node before touching
   * any pointers. */
  pendingNode: number | null
  /** Index of the node the traversal cursor is currently sitting at,
   * mirroring a real implementation walking `node = node.next`. */
  cursorIndex: number | null
  /** Index of the node found during a delete, highlighted before it's
   * unlinked. */
  targetIndex: number | null
}

export const initialLinkedListState: LinkedListState = {
  list: [],
  pendingNode: null,
  cursorIndex: null,
  targetIndex: null,
}

/** Pure - `list` is treated as read-only. Mirrors inserting at the head:
 * create the node, point its next at the current head, then move head to
 * point at the new node - no traversal needed since the head is already a
 * direct reference. */
export function linkedListInsertHeadSteps(
  list: number[],
  value: number
): LinkedListStep[] {
  return [
    { type: 'create-node', value },
    { type: 'link-new-to-head' },
    { type: 'set-head-to-new' },
    { type: 'done' },
  ]
}

/** Pure - `list` is treated as read-only. Mirrors inserting at the tail:
 * create the node, then walk node-by-node (since there's no direct tail
 * reference) until the last node's next pointer is null, then point it at
 * the new node. A `traverse` step is only emitted per actual pointer hop
 * (index 1, 2, ...) - reaching the starting node (index 0) needs no hop,
 * since head is already a direct reference. */
export function linkedListInsertTailSteps(
  list: number[],
  value: number
): LinkedListStep[] {
  const steps: LinkedListStep[] = [{ type: 'create-node', value }]
  for (let i = 1; i < list.length; i++) {
    steps.push({ type: 'traverse', index: i })
  }
  steps.push({ type: 'link-tail-to-new' })
  steps.push({ type: 'done' })
  return steps
}

/** Pure - `list` is treated as read-only. Mirrors deleting by value: walk
 * node-by-node comparing values, and once found, relink the previous
 * node's next pointer to skip over it (or move head if it was the first
 * node) rather than mutating the removed node itself. As with insert-tail,
 * a `traverse` step is only emitted per actual pointer hop - deleting the
 * head itself needs none. */
export function linkedListDeleteSteps(
  list: number[],
  value: number
): LinkedListStep[] {
  const steps: LinkedListStep[] = []
  const targetIndex = list.indexOf(value)

  if (targetIndex === -1) {
    for (let i = 1; i < list.length; i++) {
      steps.push({ type: 'traverse', index: i })
    }
    steps.push({ type: 'not-found' })
    steps.push({ type: 'done' })
    return steps
  }

  for (let i = 1; i <= targetIndex; i++) {
    steps.push({ type: 'traverse', index: i })
  }
  steps.push({ type: 'mark-target', index: targetIndex })
  steps.push({ type: 'bypass-and-remove', index: targetIndex })
  steps.push({ type: 'done' })
  return steps
}

export function linkedListReducer(
  state: LinkedListState,
  step: LinkedListStep
): LinkedListState {
  switch (step.type) {
    case 'create-node':
      return {
        ...state,
        pendingNode: step.value,
        cursorIndex: null,
        targetIndex: null,
      }

    case 'traverse':
      return { ...state, cursorIndex: step.index }

    case 'link-new-to-head':
      // Visually a no-op (the pending node is already rendered adjacent
      // to the current head) - the description is what carries the
      // "next = head" meaning at this step.
      return state

    case 'set-head-to-new':
      return {
        ...state,
        list:
          state.pendingNode !== null
            ? [state.pendingNode, ...state.list]
            : state.list,
        pendingNode: null,
        cursorIndex: null,
      }

    case 'link-tail-to-new':
      return {
        ...state,
        list:
          state.pendingNode !== null
            ? [...state.list, state.pendingNode]
            : state.list,
        pendingNode: null,
        cursorIndex: null,
      }

    case 'mark-target':
      return { ...state, targetIndex: step.index, cursorIndex: null }

    case 'bypass-and-remove':
      return {
        ...state,
        list: [
          ...state.list.slice(0, step.index),
          ...state.list.slice(step.index + 1),
        ],
        targetIndex: null,
      }

    case 'not-found':
      return { ...state, cursorIndex: null }

    case 'done':
      return state

    default:
      return state
  }
}

export function describeLinkedListStep(step: LinkedListStep): string {
  switch (step.type) {
    case 'create-node':
      return `Created a new node holding ${step.value} - not yet linked into the list.`
    case 'traverse':
      return `Following the next pointer to the node at position ${step.index}.`
    case 'link-new-to-head':
      return "Set the new node's next pointer to the current head."
    case 'set-head-to-new':
      return 'Moved head to point at the new node - insertion complete.'
    case 'link-tail-to-new':
      return "Reached the last node (its next pointer is null) and pointed it at the new node."
    case 'mark-target':
      return 'Found the node to delete.'
    case 'bypass-and-remove':
      return "Relinked the previous node's next pointer to skip over the removed node."
    case 'not-found':
      return 'Reached the end of the list (next pointer is null) - value not found.'
    case 'done':
      return 'Done.'
  }
}
