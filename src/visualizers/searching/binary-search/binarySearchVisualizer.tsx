'use client'

import { useEffect, useReducer, useState } from 'react'
import StepControls from '@/visualizers/stepControls'
import ArrayView from '../../primitives/arrayView/arrayView'
import TargetModal from './targetModal'
import { BinarySearchStep } from '@/visualizers/steps/types'
import { binarySearchSteps } from './steps/binarySearch'
import { describeStep } from '@/visualizers/describeStep'
import { generateRandomArray } from '@/utils/random'
import VisualizerLegend from '@/visualizers/legend/legend'

import { initialBinarySearchState } from './state/types'
import { binarySearchReducer } from './state/reducer'

import { binarySearchStateToArray } from './adapter/binarySearchToArray'

export default function BinarySearchVisualizer() {
  /* ============================================================================
   * Base data
   * ========================================================================== */
  const [array, setArray] = useState<number[]>(() =>
    generateRandomArray({
      size: 10,
      min: 0,
      max: 20,
      unique: true,
    }).sort((a, b) => a - b)
  )

  const [target, setTarget] = useState<number>(() => array[0])
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false)

  /* ============================================================================
   * Input mirror
   * ========================================================================== */
  const [input, setInput] = useState(() => array.join(','))

  /* ============================================================================
   * Steps (pure)
   * ========================================================================== */
  const steps: BinarySearchStep[] = binarySearchSteps(array, target)

  /* ============================================================================
   * Playback
   * ========================================================================== */
  const [stepIndex, setStepIndex] = useState(0)
  const [stepText, setStepText] = useState('')

  /* ============================================================================
   * Visualization state (REDUCER)
   * ========================================================================== */
  const [state, dispatch] = useReducer(
    binarySearchReducer,
    initialBinarySearchState(array)
  )

  /* ============================================================================
   * Helpers
   * ========================================================================== */
  function replayStepsUpTo(targetIndex: number) {
    dispatch({ type: 'reset', array })

    for (let i = 0; i < targetIndex; i++) {
      dispatch(steps[i])
    }

    setStepIndex(targetIndex)
    setStepText(
      targetIndex > 0 ? describeStep(steps[targetIndex - 1], { target }) : ''
    )
  }

  function reset() {
    dispatch({ type: 'reset', array })
    setStepIndex(0)
    setStepText('')
  }

  /* ============================================================================
   * Step controls
   * ========================================================================== */
  function stepForward() {
    if (stepIndex >= steps.length) return
    const step = steps[stepIndex]
    dispatch(step)
    setStepText(describeStep(step, { target }))
    setStepIndex((i) => i + 1)
  }

  function stepBack() {
    if (stepIndex <= 0) return
    replayStepsUpTo(stepIndex - 1)
  }

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
      alert('Please enter valid numbers separated by commas.')
      return
    }

    const sorted = [...parsed].sort((a, b) => a - b)
    setArray(sorted)
    setInput(sorted.join(','))
    dispatch({ type: 'reset', array: sorted })
    setStepIndex(0)
    setStepText('')
  }

  useEffect(() => {
    setInput(array.join(','))
  }, [array])

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
          reset()
          setIsTargetModalOpen(false)
        }}
      />

      <div className="mb-6 rounded border bg-gray-50 px-4 py-3">
        <div className="text-sm text-gray-500">Current Algorithm</div>
        <div className="text-lg font-semibold">Binary Search</div>
        <div className="text-sm">
          Step <strong>{stepIndex}</strong> / <strong>{steps.length}</strong>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded border bg-gray-50 px-4 py-3">
        <label className="text-sm text-gray-600">Sorted array</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-64 rounded border px-4 py-2 text-sm"
        />
        <button
          onClick={loadArray}
          className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
        >
          Load Array
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded border bg-gray-50 px-4 py-3">
        <div className="text-sm">
          Target:
          <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 font-semibold text-blue-700">
            {target}
          </span>
        </div>
        <button
          onClick={() => setIsTargetModalOpen(true)}
          className="rounded border px-4 py-2 text-sm hover:bg-gray-100"
        >
          Change Target
        </button>
      </div>

      <ArrayView {...binarySearchStateToArray(state)} />

      <VisualizerLegend algorithm="binary-search" />

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
  )
}
