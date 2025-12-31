'use client'

import { ArrayVisualProps } from './types'

export default function ArrayView({
  values,
  colorByIndex,
  markers,
}: ArrayVisualProps) {
  return (
    <div className="flex gap-3 p-4 rounded border">
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
            <div className="h-6 text-xs font-bold text-center">
              {topMarker?.label}
            </div>

            {/* ===== CELL ===== */}
            <div
              className={`
                flex items-center justify-center
                border border-black transition-all duration-200
                ${colorByIndex(index)}
              `}
              style={{ width: 64, height: 64 }}
            >
              <span className="text-xl font-bold font-mono">{value}</span>
            </div>

            {/* ===== BOTTOM MARKER ===== */}
            <div className="h-5 text-xs text-center">{bottomMarker?.label}</div>
          </div>
        )
      })}
    </div>
  )
}
