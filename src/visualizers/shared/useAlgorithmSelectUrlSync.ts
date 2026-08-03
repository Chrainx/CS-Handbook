'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

/**
 * Shared "pick an algorithm, sync it to ?algo=, auto-select from the URL on
 * mount" behavior used by every visualizer with more than one algorithm.
 */
export function useAlgorithmSelectUrlSync<TId extends string>({
  validIds,
  onAlgorithmChosen,
}: {
  validIds: readonly TId[]
  onAlgorithmChosen: (id: TId) => void
}) {
  const searchParams = useSearchParams()
  const algoFromUrl = searchParams.get('algo') as TId | null

  const [algorithm, setAlgorithm] = useState<TId | null>(null)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!algoFromUrl || !validIds.includes(algoFromUrl)) return

    setAlgorithm(algoFromUrl)
    setOpen(false)
    onAlgorithmChosen(algoFromUrl)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function selectAlgorithm(id: TId) {
    setAlgorithm(id)
    setOpen(false)
    onAlgorithmChosen(id)

    const params = new URLSearchParams(window.location.search)
    params.set('algo', id)
    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  function closeModal() {
    // Prevent closing if no algorithm is selected yet.
    if (algorithm !== null) setOpen(false)
  }

  return { algorithm, open, setOpen, selectAlgorithm, closeModal }
}
