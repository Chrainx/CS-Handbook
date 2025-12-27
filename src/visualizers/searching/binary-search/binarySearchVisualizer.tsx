'use client'

import { useState, useRef } from 'react'
import StepControls from '@/visualizers/stepControls'
import SearchArray from '../searchArray'
import TargetModal from './targetModal'
import { BinarySearchStep } from '@/visualizers/steps/types'
import { binarySearchSteps } from './steps/binarySearch'
import { describeStep } from '@/visualizers/describeStep'
import { generateRandomArray } from '@/utils/random'

export default function BinarySearchVisualizer() {
  /* ============================================================================
   * Stable random initialization (SSR-safe, effect-free)
   * ========================================================================== */
  const initialArrayRef = useRef<number[] | null>(null)

  if (initialArrayRef.current === null) {
    initialArrayRef.current = generateRandomArray({
      size: 10,
      min: 0,
      max: 20,
      unique: true,
    }).sort((a, b) => a - b)
  }

  /* ============================================================================
   * Data state
   * ========================================================================== */
  // eslint-disable-next-line react-hooks/refs
  const [array, setArray] = useState<number[]>(initialArrayRef.current!)
  const [input, setInput] = useState(array.join(','))
  const [target, setTarget] = useState(array[Math.floor(array.length / 2)])
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false)

  /* ============================================================================
   * Derived steps (pure, deterministic)
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
  function resetVisualState() {
    setLow(null)
    setHigh(null)
    setMid(null)
    setFoundIndex(null)
    setStepText('')
  }

  function reset() {
    resetVisualState()
    setStepIndex(0)
  }

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
    resetVisualState()
    for (let i = 0; i < stepIndex - 1; i++) {
      applyStep(steps[i])
    }
    setStepIndex((i) => i - 1)
  }

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
    setTarget(sorted[Math.floor(sorted.length / 2)])
    reset()
  }

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
          Step <strong>{Math.min(stepIndex, steps.length)}</strong> /{' '}
          <strong>{steps.length}</strong>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4 rounded border bg-gray-50 px-4 py-3">
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

      <div className="mb-4 flex items-center gap-4 rounded border bg-gray-50 px-4 py-3">
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

      <div className="mb-6 flex justify-center rounded bg-gray-50 px-6 py-8">
        <SearchArray
          values={array}
          low={low}
          high={high}
          mid={mid}
          foundIndex={foundIndex}
        />
      </div>

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
