'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

export function clientOnly<T extends object>(Component: ComponentType<T>) {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false,
  })
}
