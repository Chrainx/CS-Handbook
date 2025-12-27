'use client'

import { LEGEND_CONFIG } from './legendConfig'

export default function VisualizerLegend({ algorithm }: { algorithm: string }) {
  const legend = LEGEND_CONFIG[algorithm]

  if (!legend) return null

  return (
    <div className="mb-4 rounded border bg-gray-50 px-4 py-3">
      <div className="mb-2 text-sm font-medium text-gray-700">Legend</div>

      <div className="flex flex-wrap gap-4 text-sm">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className={`inline-block h-3 w-3 rounded ${item.colorClass}`}
            />
            <span className="font-medium">{item.label}</span>
            <span className="text-gray-500">– {item.description}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
