'use client'

import { BarState } from './types'

const CANVAS_HEIGHT = 220
const BAR_WIDTH = 36
const LABEL_PADDING = 6
const SEP_WIDTH = 2

export default function Bars({
  values,
  colorByIndex,
  splitStack = [],
  activeRange,
  markers,
}: BarState) {
  const min = Math.min(...values)
  const offset = min <= 0 ? 1 - min : 0
  const normalized = values.map((v) => v + offset)
  const max = Math.max(...normalized, 1)

  const barHeights = normalized.map((v) => (v / max) * CANVAS_HEIGHT)
  const globalMaxHeight = Math.max(...barHeights)

  return (
    <div className="border rounded p-4">
      <div className="relative">
        {/* ================= SPLIT SEPARATORS ================= */}
        {splitStack.map((range, depth) => {
          if (range.mid === undefined) return null

          const left =
            range.mid * (BAR_WIDTH + 12) + BAR_WIDTH + 12 / 2 - SEP_WIDTH / 2

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
                  activeRange &&
                  range.l === activeRange.l &&
                  range.r === activeRange.r
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
            const barColor = colorByIndex(i)

            const topMarker = markers?.top?.find((m) => m.index === i)

            return (
              <div
                key={i}
                className="relative flex flex-col items-center"
                style={{ width: BAR_WIDTH }}
              >
                {/* ===== TOP MARKER (write, etc.) ===== */}
                <div className="h-10 flex items-center justify-center">
                  {topMarker && (
                    <span className="text-xs font-bold">{topMarker.label}</span>
                  )}
                </div>

                {/* ===== BAR ===== */}
                <div
                  className={`w-full rounded-sm transition-all duration-200 ${barColor}`}
                  style={{ height: barHeight }}
                />

                {/* ===== VALUE ===== */}
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
