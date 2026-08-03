import { describe, expect, it } from 'vitest'
import { graphReducer } from './reducer'
import { initialGraphState } from './types'

describe('graphReducer', () => {
  it('reset returns the initial state', () => {
    const dirty = { ...initialGraphState, queue: ['A'] }
    expect(graphReducer(dirty, { type: 'reset' })).toEqual(initialGraphState)
  })

  it('visit-node marks a node as visiting', () => {
    const state = graphReducer(initialGraphState, {
      type: 'visit-node',
      node: 'A',
    })
    expect(state.nodes.A).toBe('visiting')
  })

  it('mark-visited marks a node as visited', () => {
    const state = graphReducer(initialGraphState, {
      type: 'mark-visited',
      node: 'A',
    })
    expect(state.nodes.A).toBe('visited')
  })

  it('activate-edge / relax-edge / choose-edge set the edge state keyed by from->to', () => {
    let state = graphReducer(initialGraphState, {
      type: 'activate-edge',
      from: 'A',
      to: 'B',
    })
    expect(state.edges['A->B']).toBe('active')

    state = graphReducer(state, {
      type: 'relax-edge',
      from: 'A',
      to: 'B',
      newDist: 5,
    })
    expect(state.edges['A->B']).toBe('relaxed')

    state = graphReducer(state, {
      type: 'choose-edge',
      from: 'A',
      to: 'B',
    })
    expect(state.edges['A->B']).toBe('chosen')
  })

  it('set-distance records the distance for a node', () => {
    const state = graphReducer(initialGraphState, {
      type: 'set-distance',
      node: 'B',
      distance: 3,
      from: 'A',
    })
    expect(state.distances.B).toBe(3)
  })

  it('enqueue/dequeue push and shift the queue in FIFO order', () => {
    let state = graphReducer(initialGraphState, {
      type: 'enqueue',
      node: 'A',
    })
    state = graphReducer(state, { type: 'enqueue', node: 'B' })
    expect(state.queue).toEqual(['A', 'B'])

    state = graphReducer(state, { type: 'dequeue', node: 'A' })
    expect(state.queue).toEqual(['B'])
  })

  it('push-stack/pop-stack push and pop the stack in LIFO order', () => {
    let state = graphReducer(initialGraphState, {
      type: 'push-stack',
      node: 'A',
    })
    state = graphReducer(state, { type: 'push-stack', node: 'B' })
    expect(state.stack).toEqual(['A', 'B'])

    state = graphReducer(state, { type: 'pop-stack' })
    expect(state.stack).toEqual(['A'])
  })

  it('pq-push adds an item and pq-pop removes the matching node+priority pair', () => {
    let state = graphReducer(initialGraphState, {
      type: 'pq-push',
      item: { node: 'A', priority: 1 },
    })
    state = graphReducer(state, {
      type: 'pq-push',
      item: { node: 'B', priority: 2 },
    })
    expect(state.pq).toEqual([
      { node: 'A', priority: 1 },
      { node: 'B', priority: 2 },
    ])

    state = graphReducer(state, {
      type: 'pq-pop',
      node: 'A',
      priority: 1,
    })
    expect(state.pq).toEqual([{ node: 'B', priority: 2 }])
  })

  it('pq-pop is a no-op when the node/priority pair is not present', () => {
    const state = graphReducer(initialGraphState, {
      type: 'pq-pop',
      node: 'Z',
      priority: 99,
    })
    expect(state).toEqual(initialGraphState)
  })
})
