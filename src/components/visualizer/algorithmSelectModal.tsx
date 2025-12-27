'use client'

import Modal from '../modal'

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
      <h2 className="mb-4 text-lg font-semibold">Select Algorithm</h2>

      <div className="space-y-2">
        {algorithms.map((algo) => {
          const isCurrent = algo.id === currentAlgorithm

          return (
            <button
              key={algo.id}
              disabled={isCurrent}
              onClick={() => onSelect(algo.id)}
              className={`w-full rounded border px-4 py-3 text-left transition
                ${
                  isCurrent
                    ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400'
                    : 'hover:border-blue-500 hover:bg-blue-50'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{algo.name}</div>

                {isCurrent && (
                  <span className="rounded bg-gray-300 px-2 py-0.5 text-xs">
                    Current
                  </span>
                )}
              </div>

              {algo.description && (
                <div className="mt-1 text-xs text-gray-500">
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
            className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  )
}
