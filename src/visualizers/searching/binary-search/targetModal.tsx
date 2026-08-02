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
      <h2 className="mb-4 text-lg font-semibold text-center text-foreground">
        Change Target Value
      </h2>

      <div className="mb-6 flex flex-col items-center gap-2">
        <label className="text-sm text-muted-foreground text-center">
          Enter the value to search for
        </label>

        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-center text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft transition"
          autoFocus
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
        >
          Cancel
        </button>

        <button
          onClick={handleApply}
          className="rounded-lg bg-accent px-4 py-2 text-sm text-accent-foreground hover:opacity-90 transition-colors"
        >
          Apply
        </button>
      </div>
    </Modal>
  )
}
