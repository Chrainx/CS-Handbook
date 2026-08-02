'use client'

import Modal from './modal'

type Algorithm = {
  id: string
  name: string
  description?: string
}

type AlgorithmSelectModalProps = {
  open: boolean
  algorithms: Algorithm[]
  currentAlgorithm: string | null
  onSelect: (id: string) => void
  onClose: () => void
}

export default function AlgorithmSelectModal({
  open,
  algorithms,
  currentAlgorithm,
  onSelect,
  onClose,
}: AlgorithmSelectModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        Select Algorithm
      </h2>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {algorithms.map((algo) => {
          const isCurrent = algo.id === currentAlgorithm

          return (
            <button
              key={algo.id}
              disabled={isCurrent}
              onClick={() => onSelect(algo.id)}
              className={`w-full rounded-lg border px-4 py-3 text-left transition
                ${
                  isCurrent
                    ? 'cursor-not-allowed border-border bg-muted text-muted-foreground'
                    : 'border-border hover:border-accent hover:bg-accent-soft'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-foreground">{algo.name}</div>

                {isCurrent && (
                  <span className="rounded bg-accent-soft px-2 py-0.5 text-xs text-accent">
                    Current
                  </span>
                )}
              </div>

              {algo.description && (
                <div className="mt-1 text-xs text-muted-foreground">
                  {algo.description}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Footer */}
      {currentAlgorithm && (
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  )
}
