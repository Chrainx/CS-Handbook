'use client'

import { BarVisualProps } from './types'

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
}: BarVisualProps) {
  const min = Math.min(...values)
  const offset = min <= 0 ? 1 - min : 0
  const normalized = values.map((v) => v + offset)
  const max = Math.max(...normalized, 1)

  const barHeights = normalized.map((v) => (v / max) * CANVAS_HEIGHT)
  const globalMaxHeight = Math.max(...barHeights)

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="relative">
        {/* ================= SPLIT SEPARATORS ================= */}
        {splitStack.map((range, depth) => {
          if (range.mid === undefined) return null

          const left =
            range.mid * (BAR_WIDTH + 12) + BAR_WIDTH + 12 / 2 - SEP_WIDTH / 2
          const isActive =
            activeRange &&
            range.l === activeRange.l &&
            range.r === activeRange.r

          return (
            <div
              key={depth}
              className={`absolute rounded-full ${
                isActive ? 'bg-accent' : 'bg-border-strong'
              }`}
              style={{
                left,
                bottom: 0,
                height: globalMaxHeight,
                width: SEP_WIDTH,
                opacity: isActive ? 0.9 : 0.4 + depth * 0.1,
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
                    <span className="rounded bg-accent-soft px-1.5 py-0.5 text-xs font-bold text-accent">
                      {topMarker.label}
                    </span>
                  )}
                </div>

                {/* ===== BAR ===== */}
                <div
                  className={`relative w-full overflow-hidden rounded-t-md shadow-sm transition-all duration-300 ease-out ${barColor}`}
                  style={{ height: barHeight }}
                >
                  {/* glossy depth overlay, works over any bar color */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/0 to-black/10" />
                </div>

                {/* ===== VALUE ===== */}
                <span
                  className="absolute w-full text-center text-xs font-semibold text-white drop-shadow-sm"
                  style={{ bottom: Math.max(barHeight - 14, LABEL_PADDING) }}
                >
                  {v}
                </span>
              </div>
            )
          })}
        </div>

        {/* baseline */}
        <div className="mt-1 h-px w-full bg-border" />
      </div>
    </div>
  )
}
