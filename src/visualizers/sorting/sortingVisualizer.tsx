'use client'

import { useEffect, useState } from 'react'
import AlgorithmSelectModal from '@/components/visualizer-ui/algorithmSelectModal'
import { SORTING_ALGORITHMS } from './config'
import Bars from './bars'
import VisualizerLegend from '../legend/legend'
import { SortingStep } from '../steps/types'
import { insertionSortSteps } from './steps/insertion'
import { selectionSortSteps } from './steps/selection'
import { mergeSortSteps } from './steps/merge'
import { generateRandomArray } from '@/utils/random'
import { describeStep } from '@/visualizers/describeStep'
import MergeBuffer from '@/visualizers/buffer'
import StepControls from '@/visualizers/stepControls'
import { quickSortSteps } from './steps/quick'
//import { heapSortSteps } from './steps/heap'

/* ============================================================================
 * Algorithm → step-generator mapping
 * Each generator converts an input array into a sequence of visual steps.
 * ========================================================================== */
const SORTING_STEP_GENERATORS: Record<
  string,
  (arr: number[]) => SortingStep[]
> = {
  insertion: insertionSortSteps,
  selection: selectionSortSteps,
  merge: mergeSortSteps,
  quick: quickSortSteps,
  //heap: heapSortSteps,
}

function getAlgorithmName(id: string) {
  const algo = SORTING_ALGORITHMS.find((a) => a.id === id)
  return algo ? algo.name : id
}

export default function SortingVisualizer() {
  /* ============================================================================
   * Algorithm & modal state
   * ========================================================================== */
  const [algorithm, setAlgorithm] = useState<string | null>(null)
  const [open, setOpen] = useState(true)

  /* ============================================================================
   * Input / base data state
   * baseArray = canonical data used to generate steps
   * input     = user-editable string representation
   * ========================================================================== */
  const [baseArray, setBaseArray] = useState<number[]>(() =>
    generateRandomArray({ size: 5, unique: true })
  )
  const [input, setInput] = useState('')

  /* ============================================================================
   * Step execution state
   * array     = current visual array (mutates as steps apply)
   * steps     = precomputed list of algorithm steps
   * stepIndex = pointer into steps[]
   * ========================================================================== */
  const [array, setArray] = useState<number[]>(baseArray)
  const [steps, setSteps] = useState<SortingStep[]>([])
  const [stepIndex, setStepIndex] = useState(0)

  /* ============================================================================
   * Visual highlight state (bars)
   * These states drive purely visual effects — no algorithm logic.
   * ========================================================================== */
  const [activeCompare, setActiveCompare] = useState<{
    i: number
    j: number
  } | null>(null)
  const [activeSwap, setActiveSwap] = useState<{ i: number; j: number } | null>(
    null
  )
  const [markedIndex, setMarkedIndex] = useState<number | null>(null)

  const [activeRange, setActiveRange] = useState<{
    l: number
    r: number
    mid?: number
  } | null>(null)
  const [baseIndex, setBaseIndex] = useState<number | null>(null)
  const [activeOverwrite, setActiveOverwrite] = useState<number | null>(null)

  /* ============================================================================
   * Merge-sort–specific visual state (buffers)
   * Only used when algorithm === 'merge'
   * ========================================================================== */
  const [leftBuffer, setLeftBuffer] = useState<number[] | null>(null)
  const [rightBuffer, setRightBuffer] = useState<number[] | null>(null)
  const [activeBufferCompare, setActiveBufferCompare] = useState<{
    leftIndex: number
    rightIndex: number
  } | null>(null)
  const [leftConsumed, setLeftConsumed] = useState(0)
  const [rightConsumed, setRightConsumed] = useState(0)

  const [pivotIndex, setPivotIndex] = useState<number | null>(null)
  const [quickCompareIndex, setQuickCompareIndex] = useState<number | null>(
    null
  )
  const [quickBoundaryIndex, setQuickBoundaryIndex] = useState<number | null>(
    null
  )

  /* ============================================================================
   * Step narration text
   * ========================================================================== */
  const [stepText, setStepText] = useState('')

  /* ============================================================================
   * Sync input field with baseArray
   * Ensures no desync between displayed input and actual data.
   * ========================================================================== */
  useEffect(() => {
    setInput(baseArray.join(','))
  }, [baseArray])

  /* ============================================================================
   * Utility: clear ALL visual state
   * Used when changing algorithm, loading new data, or full reset.
   * ========================================================================== */
  function clearHighlights() {
    setActiveCompare(null)
    setActiveSwap(null)
    setMarkedIndex(null)
    setActiveRange(null)
    setActiveOverwrite(null)
    setActiveBufferCompare(null)
    setLeftBuffer(null)
    setRightBuffer(null)
    setLeftConsumed(0)
    setRightConsumed(0)
    setBaseIndex(null)
    setPivotIndex(null)
    setQuickCompareIndex(null)
    setQuickBoundaryIndex(null)
    setStepText('')
  }

  /* ============================================================================
   * Utility: clear per-step transient highlights
   * Called before applying the next step to avoid stale visuals.
   * ========================================================================== */
  function resetTransientState() {
    setActiveCompare(null)
    setActiveSwap(null)
    setActiveOverwrite(null)
    setActiveBufferCompare(null)
    setBaseIndex(null)
    setPivotIndex(null)
    setQuickCompareIndex(null)
  }

  /* ============================================================================
   * Generate steps for a given algorithm + input array
   * IMPORTANT: clone array to avoid reference aliasing.
   * ========================================================================== */
  function generateSteps(arr: number[], algo: string) {
    const generator = SORTING_STEP_GENERATORS[algo]
    const generated = generator ? generator(arr) : []

    setSteps(generated)
    setArray([...arr])
    setStepIndex(0)
  }

  /* ============================================================================
   * Step handler typing
   * Maps each step.type to a correctly-typed handler using discriminated unions.
   * ========================================================================== */
  type SortingStepHandler<T extends SortingStep['type']> = (
    step: Extract<SortingStep, { type: T }>
  ) => void

  /* ============================================================================
   * Centralized step execution table
   * This is the heart of the visualizer state machine.
   * ========================================================================== */
  const STEP_HANDLERS: {
    [K in SortingStep['type']]: SortingStepHandler<K>
  } = {
    mark: (step) => {
      setMarkedIndex(step.index)
    },

    compare: (step) => {
      setActiveCompare({ i: step.i, j: step.j })
    },

    swap: (step) => {
      setActiveSwap({ i: step.i, j: step.j })
      setArray((prev) => {
        const a = [...prev]
        ;[a[step.i], a[step.j]] = [a[step.j], a[step.i]]
        return a
      })

      if (algorithm === 'quick') {
        setMarkedIndex(null)

        if (step.isPivotSwap) {
          // ✅ partition ends
          setQuickBoundaryIndex(null)
          setPivotIndex(null)
        } else {
          // ✅ normal partition swap
          setQuickBoundaryIndex((b) => (b !== null ? b + 1 : b))
        }
      }
    },

    split: (step) => {
      setActiveRange({ l: step.l, r: step.r, mid: step.mid })
    },

    base: (step) => {
      setActiveRange(null)
      setBaseIndex(step.l)
      setLeftBuffer(null)
      setRightBuffer(null)
    },

    'buffer-init': (step) => {
      setLeftBuffer(step.left)
      setRightBuffer(step.right)
      setLeftConsumed(0)
      setRightConsumed(0)
      setActiveRange({ l: step.l, r: step.r, mid: step.mid })
    },

    'merge-compare': (step) => {
      setActiveBufferCompare({
        leftIndex: step.leftIndex,
        rightIndex: step.rightIndex,
      })
    },

    'merge-write': (step) => {
      setActiveOverwrite(step.index)
      setArray((prev) => {
        const a = [...prev]
        a[step.index] = step.value
        return a
      })

      if (step.from === 'left') setLeftConsumed((c) => c + 1)
      if (step.from === 'right') setRightConsumed((c) => c + 1)
    },

    pivot: (step) => {
      setPivotIndex(step.pivotIndex)
      setQuickBoundaryIndex(step.l)
      setActiveRange({ l: step.l, r: step.r })
    },

    'quick-compare': (step) => {
      setQuickCompareIndex(step.j) // only j is being compared
      setPivotIndex(step.pivotIndex)
    },

    'pivot-final': (step) => {
      setMarkedIndex(step.pivotIndex)
      setPivotIndex(null)
    },

    done: () => {
      setMarkedIndex(null)
      setActiveRange(null)
      setLeftBuffer(null)
      setRightBuffer(null)
      setBaseIndex(null)
    },
  }

  /*
   * Replays steps from the beginning up to (but not including) targetIndex.
   * Used for step-back functionality.
   */
  function replayStepsUpTo(targetIndex: number) {
    clearHighlights()
    setArray([...baseArray])

    for (let i = 0; i < targetIndex; i++) {
      const step = steps[i]
      resetTransientState()
      runStepHandler(step.type, step)
    }

    setStepIndex(targetIndex)
    setStepText(
      targetIndex > 0 && algorithm
        ? describeStep(steps[targetIndex - 1], { algorithm: algorithm })
        : ''
    )
  }

  /* ============================================================================
   * Type-safe dispatcher for step handlers
   * Prevents union-to-never collapse.
   * ========================================================================== */
  function runStepHandler<T extends SortingStep['type']>(
    type: T,
    step: Extract<SortingStep, { type: T }>
  ) {
    STEP_HANDLERS[type](step)
  }

  /* ============================================================================
   * Advance visualization by one step
   * ========================================================================== */
  function applyNextStep() {
    if (stepIndex >= steps.length) return

    const step = steps[stepIndex]
    setStepText(describeStep(step, { algorithm: algorithm }))

    resetTransientState()
    runStepHandler(step.type, step)

    setStepIndex((i) => i + 1)
  }

  function applyPrevStep() {
    if (stepIndex <= 0) return
    replayStepsUpTo(stepIndex - 1)
  }

  /* ============================================================================
   * Reset visualization to initial state
   * ========================================================================== */
  function reset() {
    setArray([...baseArray])
    setStepIndex(0)
    clearHighlights()
  }

  /* ============================================================================
   * Parse user input and regenerate steps
   * ========================================================================== */
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

    clearHighlights()
    setBaseArray(parsed)
    if (algorithm) generateSteps(parsed, algorithm)
  }

  /* ============================================================================
   * Render
   * ========================================================================== */
  return (
    <>
      {/* Algorithm selection modal */}
      <AlgorithmSelectModal
        open={open}
        algorithms={SORTING_ALGORITHMS}
        currentAlgorithm={algorithm}
        onSelect={(id) => {
          clearHighlights()
          setAlgorithm(id)
          setOpen(false)
          generateSteps(baseArray, id)
        }}
        onClose={() => setOpen(false)}
      />

      {algorithm && (
        <>
          {/* Algorithm header */}
          <div className="mb-6 rounded border bg-gray-50 px-4 py-3">
            <div className="text-sm text-gray-500">Current Algorithm</div>
            <div className="text-lg font-semibold">
              {getAlgorithmName(algorithm)}
            </div>
            <div className="text-sm">
              Step <strong>{Math.min(stepIndex, steps.length)}</strong> /{' '}
              <strong>{steps.length}</strong>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-4 flex gap-4">
            <button
              onClick={() => {
                clearHighlights()
                setSteps([])
                setStepIndex(0)
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
            />
            <button
              onClick={loadInput}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Load Data
            </button>
          </div>

          {/* Merge buffers */}
          {leftBuffer && rightBuffer && (
            <div className="mb-4 flex gap-8 text-sm">
              <MergeBuffer
                label="Left Buffer"
                values={leftBuffer}
                activeIndex={activeBufferCompare?.leftIndex ?? null}
                consumedCount={leftConsumed}
              />
              <MergeBuffer
                label="Right Buffer"
                values={rightBuffer}
                activeIndex={activeBufferCompare?.rightIndex ?? null}
                consumedCount={rightConsumed}
              />
            </div>
          )}

          {/* Bars visualization */}
          <Bars
            algorithm={algorithm}
            data={array}
            activeCompare={activeCompare}
            activeSwap={activeSwap}
            activeRange={activeRange}
            activeOverwrite={activeOverwrite}
            baseIndex={baseIndex}
            markedIndex={markedIndex}
            quickCompareIndex={quickCompareIndex}
            quickBoundaryIndex={quickBoundaryIndex}
            pivotIndex={pivotIndex}
          />

          <VisualizerLegend algorithm={algorithm} />

          {/* Step narration */}
          {stepText && (
            <div className="my-3 rounded border bg-blue-50 px-4 py-2 text-sm">
              {stepText}
            </div>
          )}

          {/* Playback controls */}
          <StepControls
            canStepBack={stepIndex > 0}
            canStepForward={stepIndex < steps.length}
            onStepBack={applyPrevStep}
            onStepForward={applyNextStep}
            onReset={reset}
          />
        </>
      )}
    </>
  )
}
