'use client'

import { useEffect, useReducer, useState } from 'react'
import AlgorithmSelectModal from '@/components/visualizer-ui/algorithmSelectModal'
import StepControls from '@/visualizers/stepControls'
import VisualizerLegend from '@/visualizers/legend/legend'
import Bars from '@/visualizers/primitives/bars'
import MergeBuffer from '../buffer'

import { SortingAlgorithmId } from './state/types'

import { SortingStep } from '@/visualizers/steps/types'
import { generateRandomArray } from '@/utils/random'
import { describeStep } from '@/visualizers/describeStep'

import { sortingReducer } from './state/reducer'
import { initialSortingVisualState } from './state/types'

import { insertionSortSteps } from './steps/insertion'
import { selectionSortSteps } from './steps/selection'
import { mergeSortSteps } from './steps/merge'
import { quickSortSteps } from './steps/quick'

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
]

const STEP_GENERATORS: Record<string, (arr: number[]) => SortingStep[]> = {
  insertion: insertionSortSteps,
  selection: selectionSortSteps,
  merge: mergeSortSteps,
  quick: quickSortSteps,
}

export default function SortingVisualizer() {
  const [algorithm, setAlgorithm] = useState<string | null>(null)
  const [open, setOpen] = useState(true)

  const [input, setInput] = useState('')

  const [baseArray, setBaseArray] = useState<number[]>(() =>
    generateRandomArray({ size: 5, unique: true })
  )

  const [steps, setSteps] = useState<SortingStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const [stepText, setStepText] = useState('')

  const [state, dispatch] = useReducer(
    sortingReducer,
    initialSortingVisualState(baseArray)
  )

  const { leftBuffer, rightBuffer, leftPtr, rightPtr } = state

  /* ---------------------------------- */
  /* Step generation                    */
  /* ---------------------------------- */
  function generateSteps(algo: string) {
    const generator = STEP_GENERATORS[algo]
    if (!generator) return

    const generated = generator(baseArray)
    setSteps(generated)
    setStepIndex(0)

    dispatch({ type: 'reset', array: baseArray })
  }

  /* ---------------------------------- */
  /* Step controls                      */
  /* ---------------------------------- */
  function stepForward() {
    if (stepIndex >= steps.length) return

    const step = steps[stepIndex]
    dispatch(step)
    setStepText(describeStep(step))
    setStepIndex((i) => i + 1)
  }

  function replayStepsUpTo(target: number) {
    dispatch({ type: 'reset', array: baseArray })

    for (let i = 0; i < target; i++) {
      dispatch(steps[i])
    }

    setStepIndex(target)
    setStepText(target > 0 ? describeStep(steps[target - 1]) : '')
  }

  function stepBack() {
    if (stepIndex <= 0) return
    replayStepsUpTo(stepIndex - 1)
  }

  function reset() {
    replayStepsUpTo(0)
  }

  function loadInput() {
    const parsed = input
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .map(Number)

    if (parsed.length === 0 || parsed.some(Number.isNaN)) {
      alert('Please enter valid numbers separated by commas.')
      return
    }

    setBaseArray(parsed)

    // Reset reducer state
    dispatch({ type: 'reset', array: parsed })

    // Regenerate steps if algorithm already chosen
    if (algorithm) {
      const generator = STEP_GENERATORS[algorithm]
      if (generator) {
        setSteps(generator(parsed))
        setStepIndex(0)
        setStepText('')
      }
    }
  }

  useEffect(() => {
    setInput(baseArray.join(','))
  }, [baseArray])

  /* ---------------------------------- */
  /* Render                             */
  /* ---------------------------------- */
  return (
    <>
      <AlgorithmSelectModal
        open={open}
        algorithms={SORTING_ALGORITHMS}
        currentAlgorithm={algorithm}
        onSelect={(id) => {
          setAlgorithm(id)
          setOpen(false)
          generateSteps(id)
        }}
        onClose={() => setOpen(false)}
      />

      {algorithm && (
        <>
          <div className="mb-6 rounded border bg-gray-50 px-4 py-3">
            <div className="text-sm text-gray-500">Current Algorithm</div>
            <div className="text-lg font-semibold">
              {SORTING_ALGORITHMS.find((a) => a.id === algorithm)?.name}
            </div>
            <div className="text-sm">
              Step <strong>{stepIndex}</strong> /{' '}
              <strong>{steps.length}</strong>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-4 flex gap-4">
            <button
              onClick={() => {
                setSteps([])
                setStepIndex(0)
                setStepText('')
                setOpen(true)
              }}
              className="rounded border px-3 py-1 text-sm"
            >
              Change Algorithm
            </button>
          </div>

          {/* Data input */}
          <div className="mb-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border px-3 py-2 rounded w-64"
              placeholder="e.g. 5,3,8,1"
            />
            <button
              onClick={loadInput}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Load Data
            </button>
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

          <Bars state={state} />

          <VisualizerLegend algorithm={algorithm} />

          {stepText && (
            <div className="my-3 rounded border bg-blue-50 px-4 py-2 text-sm">
              {stepText}
            </div>
          )}

          <StepControls
            canStepBack={stepIndex > 0}
            canStepForward={stepIndex < steps.length}
            onStepBack={stepBack}
            onStepForward={stepForward}
            onReset={reset}
          />
        </>
      )}
    </>
  )
}
