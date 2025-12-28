'use client'

import { clientOnly } from '@/visualizers/client/clientOnly'
import BinarySearchVisualizer from './binarySearchVisualizer'

const ClientBinarySearch = clientOnly(BinarySearchVisualizer)

export default ClientBinarySearch
