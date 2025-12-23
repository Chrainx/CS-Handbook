'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFoundRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/?invalidRoute=true')
  }, [router])

  return null
}
