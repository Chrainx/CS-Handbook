'use client'

import { useEffect, useReducer, useState } from 'react'
import AlgorithmSelectModal from '@/components/visualizer-ui/algorithmSelectModal'
import StepControls from '@/visualizers/stepControls'
import VisualizerLegend from '@/visualizers/legend/legend'
import Bars from '@/visualizers/primitives/bars/bars'
import MergeBuffer from '../buffer'

import { SortingAlgorithmId } from './state/types'

import { SortingStep } from './steps/types'
import { generateRandomArray } from '@/utils/random'
import { describeSortingStep } from './describeStep'

import { sortingReducer } from './state/reducer'
import { initialSortingVisualState } from './state/types'

import { insertionSortSteps } from './steps/insertion'
import { selectionSortSteps } from './steps/selection'
import { mergeSortSteps } from './steps/merge'
import { quickSortSteps } from './steps/quick'
import { heapSortSteps } from './steps/heap'

import { sortingStateToBars } from './adapters/sortingToBar'
import { useStepPlayer } from '../shared/useStepPlayer'
import { useAlgorithmSelectUrlSync } from '../shared/useAlgorithmSelectUrlSync'
import { AlgorithmHeaderCard } from '../shared/algorithmHeaderCard'
import { StepTextPanel } from '../shared/stepTextPanel'

export const SORTING_ALGORITHMS: {
  id: SortingAlgorithmId
  name: string
  description: string
}[] = [
  {
    id: 'insertion',
    name: 'Insertion Sort',
    description: 'Builds the sorted array incrementally by inserting elements',
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    description:
      'Selects the minimum element repeatedly and places it at the front',
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    description:
      'Divides the array into halves and merges them in sorted order',
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    description: 'Partitions the array around a pivot element',
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    description: 'Builds a max heap and repeatedly extracts the largest element',
  },
]

const MAX_ARRAY_SIZE = 50

// Deterministic so the server-rendered markup matches the client's first
// render; a fresh random array replaces this right after mount.
const DEFAULT_ARRAY = [5, 3, 8, 1, 9]

const STEP_GENERATORS: Record<
  SortingAlgorithmId,
  (arr: number[]) => SortingStep[]
> = {
  insertion: insertionSortSteps,
  selection: selectionSortSteps,
  merge: mergeSortSteps,
  quick: quickSortSteps,
  heap: heapSortSteps,
}

export default function SortingVisualizer() {
  const [input, setInput] = useState('')
  const [inputError, setInputError] = useState<string | null>(null)

  const [baseArray, setBaseArray] = useState<number[]>(DEFAULT_ARRAY)

  const [steps, setSteps] = useState<SortingStep[]>([])

  const [state, dispatch] = useReducer(
    sortingReducer,
    initialSortingVisualState(baseArray)
  )

  const { leftBuffer, rightBuffer, leftPtr, rightPtr } = state

  const { algorithm, open, setOpen, selectAlgorithm, closeModal } =
    useAlgorithmSelectUrlSync<SortingAlgorithmId>({
      validIds: Object.keys(STEP_GENERATORS) as SortingAlgorithmId[],
      // Step generation happens reactively below (keyed on [algorithm,
      // baseArray]) rather than here, so it always uses the up-to-date
      // baseArray even when an algorithm is auto-selected from the URL in
      // the same initial commit as the mount-time randomize effect.
      onAlgorithmChosen: () => {},
    })

  const player = useStepPlayer<
    SortingStep,
    SortingStep,
    { algorithm: SortingAlgorithmId | null }
  >({
    steps,
    dispatch,
    describeStep: describeSortingStep,
    describeContext: { algorithm },
    resetAction: { type: 'reset', array: baseArray },
  })

  // Regenerate steps and reset the player whenever the selected algorithm
  // or the base array changes - covers manual algorithm switches, loading
  // new data, and picking up the freshly-randomized array after mount.
  useEffect(() => {
    if (!algorithm) return
    player.reset()
    setSteps(STEP_GENERATORS[algorithm](baseArray))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithm, baseArray])

  function loadInput() {
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
    setBaseArray(parsed)
  }

  useEffect(() => {
    setInput(baseArray.join(','))
  }, [baseArray])

  useEffect(() => {
    // Randomize on mount rather than in the initial useState so the
    // server-rendered markup and the client's first render agree.
    const randomArray = generateRandomArray({ size: 5, unique: true })
    setBaseArray(randomArray)
    dispatch({ type: 'reset', array: randomArray })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------------------------------- */
  /* Render                             */
  /* ---------------------------------- */
  return (
    <>
      <AlgorithmSelectModal
        open={open}
        algorithms={SORTING_ALGORITHMS}
        currentAlgorithm={algorithm}
        onSelect={(id) => selectAlgorithm(id as SortingAlgorithmId)}
        onClose={closeModal}
      />

      {algorithm && (
        <>
          <AlgorithmHeaderCard
            name={SORTING_ALGORITHMS.find((a) => a.id === algorithm)!.name}
            stepIndex={player.index}
            stepLength={player.length}
            onChangeAlgorithm={() => setOpen(true)}
          />

          {/* Data input */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  setInputError(null)
                }}
                aria-invalid={inputError ? true : undefined}
                className={`w-64 rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-accent-soft ${
                  inputError
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-border focus:border-accent'
                }`}
                placeholder="e.g. 5,3,8,1"
              />
              <button
                onClick={loadInput}
                className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
              >
                Load Data
              </button>
            </div>

            {inputError && (
              <p className="mt-1.5 text-xs text-red-500">{inputError}</p>
            )}
          </div>

          {leftBuffer && rightBuffer && (
            <div className="mb-4 flex gap-8 text-sm">
              <MergeBuffer
                label="Left Buffer"
                values={leftBuffer}
                activeIndex={state.compare ? leftPtr : null}
                consumedCount={leftPtr}
              />
              <MergeBuffer
                label="Right Buffer"
                values={rightBuffer}
                activeIndex={state.compare ? rightPtr : null}
                consumedCount={rightPtr}
              />
            </div>
          )}

          <Bars {...sortingStateToBars(state)} />

          <StepTextPanel text={player.text} />

          <VisualizerLegend algorithm={algorithm} />

          <StepControls
            canStepBack={player.index > 0}
            canStepForward={player.index < player.length}
            onStepBack={player.back}
            onStepForward={player.forward}
            onReset={player.reset}
          />
        </>
      )}
    </>
  )
}
