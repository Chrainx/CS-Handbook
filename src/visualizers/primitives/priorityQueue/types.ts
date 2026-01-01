export type PriorityQueueItem = {
  node: string
  priority: number
  stale?: boolean
}

export type PriorityQueueProps = {
  items: PriorityQueueItem[]
  activeNode?: string
}
