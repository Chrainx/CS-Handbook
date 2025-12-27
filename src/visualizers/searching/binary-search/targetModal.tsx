'use client'

import Modal from '@/components/visualizer-ui/modal'
import { useState } from 'react'

type TargetModalProps = {
  open: boolean
  initialValue: number
  onClose: () => void
  onApply: (value: number) => void
}

export default function TargetModal({
  open,
  initialValue,
  onClose,
  onApply,
}: TargetModalProps) {
  // state is initialized ONLY when component mounts
  const [value, setValue] = useState<string>(String(initialValue))

  function handleApply() {
    const parsed = Number(value)
    if (Number.isNaN(parsed)) return
    onApply(parsed)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="mb-4 text-lg font-semibold text-center">
        Change Target Value
      </h2>

      <div className="mb-6 flex flex-col items-center gap-2">
        <label className="text-sm text-gray-600 text-center">
          Enter the value to search for
        </label>

        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-32 rounded border px-3 py-2 text-center"
          autoFocus
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleApply}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </Modal>
  )
}
