'use client'

import { useState } from 'react'
import StepControls from '@/visualizers/stepControls'
import SearchArray from '../searchArray'
import TargetModal from './targetModal'
import { BinarySearchStep } from '@/visualizers/steps/types'
import { binarySearchSteps } from './steps/binarySearch'
import { describeStep } from '@/visualizers/describeStep'
import { generateRandomArray } from '@/utils/random'
import VisualizerLegend from '@/visualizers/legend/legend'

export default function BinarySearchVisualizer() {
  /* ============================================================================
   * Base data (random — SAFE because SSR is disabled)
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
   * Derived steps (pure, no state)
   * ========================================================================== */
  const steps: BinarySearchStep[] = binarySearchSteps(array, target)

  /* ============================================================================
   * Playback state
   * ========================================================================== */
  const [stepIndex, setStepIndex] = useState(0)

  /* ============================================================================
   * Visualization state
   * ========================================================================== */
  const [low, setLow] = useState<number | null>(null)
  const [high, setHigh] = useState<number | null>(null)
  const [mid, setMid] = useState<number | null>(null)
  const [foundIndex, setFoundIndex] = useState<number | null>(null)
  const [stepText, setStepText] = useState('')

  /* ============================================================================
   * Helpers
   * ========================================================================== */
  function clearVisualState() {
    setLow(null)
    setHigh(null)
    setMid(null)
    setFoundIndex(null)
    setStepText('')
  }

  function reset() {
    clearVisualState()
    setStepIndex(0)
  }

  /* ============================================================================
   * Step application
   * ========================================================================== */
  function applyStep(step: BinarySearchStep) {
    setStepText(describeStep(step, { target }))

    switch (step.type) {
      case 'bs-range':
        setLow(step.low)
        setHigh(step.high)
        setMid(step.mid)
        break

      case 'bs-compare':
        setMid(step.index)
        break

      case 'bs-found':
        setFoundIndex(step.index)
        break

      case 'bs-not-found':
        setMid(null)
        break
    }
  }

  function stepForward() {
    if (stepIndex >= steps.length) return
    applyStep(steps[stepIndex])
    setStepIndex((i) => i + 1)
  }

  function stepBack() {
    if (stepIndex <= 0) return

    clearVisualState()
    for (let i = 0; i < stepIndex - 1; i++) {
      applyStep(steps[i])
    }
    setStepIndex((i) => i - 1)
  }

  /* ============================================================================
   * Load new array (explicit user action)
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
    reset()
  }

  /* ============================================================================
   * Render
   * ========================================================================== */
  return (
    <>
      {/* Target modal */}
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

      {/* Header */}
      <div className="mb-6 rounded border bg-gray-50 px-4 py-3">
        <div className="text-sm text-gray-500">Current Algorithm</div>
        <div className="text-lg font-semibold">Binary Search</div>
        <div className="text-sm">
          Step <strong>{Math.min(stepIndex, steps.length)}</strong> /{' '}
          <strong>{steps.length}</strong>
        </div>
      </div>

      {/* Array input */}
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

      {/* Target controls */}
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

      <SearchArray
        values={array}
        low={low}
        high={high}
        mid={mid}
        foundIndex={foundIndex}
      />

      <VisualizerLegend algorithm="binary-search" />

      {/* Step narration */}
      {stepText && (
        <div className="my-3 rounded border bg-blue-50 px-4 py-2 text-sm">
          {stepText}
        </div>
      )}

      {/* Playback */}
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
