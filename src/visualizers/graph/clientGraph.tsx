'use client'

import { clientOnly } from '@/visualizers/client/clientOnly'
import GraphVisualizer from './graphVisualizer'

const ClientGraph = clientOnly(GraphVisualizer)

export default ClientGraph
