'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function Banner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const show = searchParams.get('invalidRoute') === 'true'
  if (!show) return null

  const closeBanner = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('invalidRoute')

    const query = params.toString()
    router.replace(query ? `?${query}` : '/', { scroll: false })
  }

  return (
    <div className="w-full border-b border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-800 flex items-center justify-between">
      <span>
        The link you visited does not exist or is still under development.
      </span>

      <button
        onClick={closeBanner}
        className="ml-4 font-bold text-yellow-800 hover:text-yellow-900"
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  )
}
