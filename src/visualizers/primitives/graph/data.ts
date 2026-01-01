export type GraphNode = {
  id: string
  x: number
  y: number
  label?: string
}

export type GraphEdge = {
  from: string
  to: string
  directed?: boolean
  weight?: number
}

export type GraphData = {
  nodes: GraphNode[]
  edges: GraphEdge[]
}
