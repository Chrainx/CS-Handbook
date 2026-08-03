'use client'

import { useEffect, useReducer, useState } from 'react'
import StepControls from '@/visualizers/stepControls'
import ArrayView from '../../primitives/arrayView/arrayView'
import TargetModal from './targetModal'
import { BinarySearchStep } from './steps/types'
import { binarySearchSteps } from './steps/binarySearch'
import { describeBinarySearchStep } from './describeStep'
import { generateRandomArray } from '@/utils/random'
import VisualizerLegend from '@/visualizers/legend/legend'

import { initialBinarySearchState } from './state/types'
import { binarySearchReducer } from './state/reducer'

import { binarySearchStateToArray } from './adapter/binarySearchToArray'
import { useStepPlayer } from '@/visualizers/shared/useStepPlayer'
import { AlgorithmHeaderCard } from '@/visualizers/shared/algorithmHeaderCard'
import { StepTextPanel } from '@/visualizers/shared/stepTextPanel'

const MAX_ARRAY_SIZE = 50

// Deterministic so the server-rendered markup matches the client's first
// render; a fresh random array replaces this right after mount.
const DEFAULT_ARRAY = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

export default function BinarySearchVisualizer() {
  /* ============================================================================
   * Base data
   * ========================================================================== */
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY)
  const [target, setTarget] = useState<number>(DEFAULT_ARRAY[0])
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false)

  /* ============================================================================
   * Input mirror
   * ========================================================================== */
  const [input, setInput] = useState(() => array.join(','))
  const [inputError, setInputError] = useState<string | null>(null)

  /* ============================================================================
   * Steps (pure)
   * ========================================================================== */
  const steps: BinarySearchStep[] = binarySearchSteps(array, target)

  /* ============================================================================
   * Visualization state (REDUCER)
   * ========================================================================== */
  const [state, dispatch] = useReducer(
    binarySearchReducer,
    initialBinarySearchState(array)
  )

  const player = useStepPlayer<
    BinarySearchStep,
    BinarySearchStep,
    { target: number }
  >({
    steps,
    dispatch,
    describeStep: describeBinarySearchStep,
    describeContext: { target },
    resetAction: { type: 'reset', array },
  })

  /* ============================================================================
   * Load new array
   * ========================================================================== */
  function loadArray() {
    const parsed = input
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .map(Number)

    if (parsed.length === 0 || parsed.some(Number.isNaN)) {
      setInputError('Please enter valid numbers separated by commas.')
      return
    }

    if (parsed.length > MAX_ARRAY_SIZE) {
      setInputError(`Please enter at most ${MAX_ARRAY_SIZE} numbers.`)
      return
    }

    setInputError(null)
    const sorted = [...parsed].sort((a, b) => a - b)
    setArray(sorted)
    setInput(sorted.join(','))
    player.hardReset({ type: 'reset', array: sorted })
  }

  useEffect(() => {
    setInput(array.join(','))
  }, [array])

  useEffect(() => {
    // Randomize on mount rather than in the initial useState so the
    // server-rendered markup and the client's first render agree.
    const randomArray = generateRandomArray({
      size: 10,
      min: 0,
      max: 20,
      unique: true,
    }).sort((a, b) => a - b)

    setArray(randomArray)
    setTarget(randomArray[0])
    dispatch({ type: 'reset', array: randomArray })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ============================================================================
   * Render
   * ========================================================================== */
  return (
    <>
      <TargetModal
        open={isTargetModalOpen}
        initialValue={target}
        onClose={() => setIsTargetModalOpen(false)}
        onApply={(value) => {
          setTarget(value)
          player.reset()
          setIsTargetModalOpen(false)
        }}
      />

      <AlgorithmHeaderCard
        name="Binary Search"
        stepIndex={player.index}
        stepLength={player.length}
      />

      <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Sorted array</label>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setInputError(null)
            }}
            aria-invalid={inputError ? true : undefined}
            className={`w-64 rounded-lg border bg-background px-4 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-accent-soft ${
              inputError
                ? 'border-red-500 focus:border-red-500'
                : 'border-border focus:border-accent'
            }`}
          />
          <button
            onClick={loadArray}
            className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
          >
            Load Array
          </button>
        </div>

        {inputError && (
          <p className="mt-1.5 text-xs text-red-500">{inputError}</p>
        )}
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="text-sm text-foreground">
          Target:
          <span className="ml-2 rounded-md bg-accent-soft px-2 py-0.5 font-semibold text-accent">
            {target}
          </span>
        </div>
        <button
          onClick={() => setIsTargetModalOpen(true)}
          className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
        >
          Change Target
        </button>
      </div>

      <ArrayView {...binarySearchStateToArray(state)} />

      <StepTextPanel text={player.text} />

      <VisualizerLegend algorithm="binary-search" />

      <StepControls
        canStepBack={player.index > 0}
        canStepForward={player.index < player.length}
        onStepBack={player.back}
        onStepForward={player.forward}
        onReset={player.reset}
      />
    </>
  )
}
