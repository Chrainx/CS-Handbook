'use client'

import { ArrayVisualProps } from './types'

export default function ArrayView({
  values,
  colorByIndex,
  markers,
}: ArrayVisualProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-card p-6 shadow-sm">
      {values.map((value, index) => {
        const topMarker = markers?.top?.find((m) => m.index === index)
        const bottomMarker = markers?.bottom?.find((m) => m.index === index)

        return (
          <div
            key={index}
            className="relative flex flex-col items-center"
            style={{ width: 64 }}
          >
            {/* ===== TOP MARKER ===== */}
            <div className="h-6 text-xs font-bold text-center text-accent">
              {topMarker?.label}
            </div>

            {/* ===== CELL ===== */}
            <div
              className={`
                flex items-center justify-center rounded-lg
                shadow-sm ring-1 ring-black/10 transition-all duration-200
                ${colorByIndex(index)}
              `}
              style={{ width: 64, height: 64 }}
            >
              <span className="text-xl font-bold font-mono">{value}</span>
            </div>

            {/* ===== BOTTOM MARKER ===== */}
            <div className="h-5 text-xs text-center text-muted-foreground">
              {bottomMarker?.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
