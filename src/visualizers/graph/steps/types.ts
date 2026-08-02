export type GraphStep =
  | { type: 'reset' }
  | {
      type: 'visit-node'
      node: string
    }
  | {
      type: 'mark-visited'
      node: string
    }
  | {
      type: 'activate-edge'
      from: string
      to: string
    }
  | {
      type: 'relax-edge'
      from: string
      to: string
      newDist: number
    }
  | {
      type: 'choose-edge'
      from: string
      to: string
    }
  | {
      type: 'set-distance'
      node: string
      distance: number
      from: string | null
    }
  | { type: 'enqueue'; node: string }
  | { type: 'dequeue'; node: string }
  | {
      type: 'push-stack'
      node: string
    }
  | {
      type: 'pop-stack'
    }
  | {
      type: 'pq-push'
      item: { node: string; priority: number }
    }
  | {
      type: 'pq-pop'
      node: string
      priority: number
    }
  | { type: 'pq-skip-stale'; node: string; priority: number }
  | { type: 'bf-pass'; pass: number }
  | {
      type: 'kruskal-edge'
      index: number
      from: string
      to: string
      weight: number
    }
  | { type: 'done' }
