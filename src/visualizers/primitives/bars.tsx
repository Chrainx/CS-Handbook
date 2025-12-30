'use client'

import { SortingVisualState } from '@/visualizers/sorting/state/types'

const CANVAS_HEIGHT = 220
const BAR_WIDTH = 36
const LABEL_PADDING = 6
const GAP_HALF = 6 // gap-3 = 12px → half = 6px
const SEP_WIDTH = 2

export default function Bars({ state }: { state: SortingVisualState }) {
  const values = state.array

  const min = Math.min(...values)
  const offset = min <= 0 ? 1 - min : 0
  const normalized = values.map((v) => v + offset)
  const max = Math.max(...normalized, 1)

  // 🔑 heights
  const barHeights = normalized.map((v) => (v / max) * CANVAS_HEIGHT)
  const globalMaxHeight = Math.max(...barHeights)

  return (
    <div className="border rounded p-4">
      <div className="relative">
        {/* ================= SPLIT SEPARATORS (ROW LEVEL) ================= */}
        {state.splitStack.map((range, depth) => {
          const left =
            (range.mid + 1) * BAR_WIDTH +
            range.mid * 12 + // gap-3 = 12px
            GAP_HALF // center of gap

          return (
            <div
              key={depth}
              className="absolute"
              style={{
                left,
                bottom: 0,
                height: globalMaxHeight,
                width: SEP_WIDTH,
                backgroundColor:
                  state.activeRange &&
                  range.l === state.activeRange.l &&
                  range.r === state.activeRange.r
                    ? 'rgba(0,0,0,0.9)'
                    : `rgba(0,0,0,${0.25 + depth * 0.15})`,
              }}
            />
          )
        })}

        {/* ================= BAR ROW ================= */}
        <div className="flex gap-3 items-end">
          {values.map((v, i) => {
            const barHeight = barHeights[i]

            const isSwap =
              state.swap && (state.swap.i === i || state.swap.j === i)

            const isMarked = state.markedIndex === i
            const isBase = state.baseIndex === i
            const isWrite = state.writeIndex === i

            const inActiveRange =
              state.activeRange &&
              i >= state.activeRange.l &&
              i <= state.activeRange.r

            const isPivot = state.pivotIndex === i

            const isCompare =
              state.compare &&
              !state.leftBuffer &&
              !isPivot && // IMPORTANT: pivot never red
              (state.compare.i === i || state.compare.j === i)

            const inBoundaryLeft =
              state.activeRange &&
              state.boundaryIndex !== null &&
              i >= state.activeRange.l &&
              i < state.boundaryIndex

            const barColor = isSwap
              ? 'bg-green-500'
              : isBase
              ? 'bg-gray-400'
              : isWrite
              ? 'bg-purple-500'
              : isMarked
              ? 'bg-yellow-500'
              : isPivot
              ? 'bg-purple-600'
              : isCompare
              ? 'bg-red-500'
              : inBoundaryLeft
              ? 'bg-orange-500'
              : inActiveRange
              ? 'bg-blue-400'
              : 'bg-blue-500'

            return (
              <div
                key={i}
                className="relative flex flex-col items-center"
                style={{ width: BAR_WIDTH }}
              >
                {/* ========== WRITE LANE ========== */}
                <div className="h-10 flex items-center justify-center">
                  {isWrite && (
                    <span className="text-xs font-bold text-purple-600">
                      ↓ write
                    </span>
                  )}
                </div>

                {/* ================= BAR ================= */}
                <div
                  className={`w-full rounded-sm transition-all duration-200 ${barColor}`}
                  style={{ height: barHeight }}
                />

                {/* ================= VALUE LABEL ================= */}
                <span
                  className="absolute w-full text-center text-xs font-medium text-white"
                  style={{ bottom: Math.max(barHeight - 14, LABEL_PADDING) }}
                >
                  {v}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
