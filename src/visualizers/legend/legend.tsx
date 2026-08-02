'use client'

import { LEGEND_CONFIG } from './config'

export default function VisualizerLegend({ algorithm }: { algorithm: string }) {
  const legend = LEGEND_CONFIG[algorithm]
  if (!legend) return null

  return (
    <div className="mb-4 rounded-xl border border-border bg-muted px-4 py-3">
      <div className="mb-2 text-sm font-medium text-foreground">Legend</div>

      <div className="flex flex-wrap gap-4 text-sm">
        {legend.map((item) => {
          const isFill = item.colorClass.startsWith('fill-')
          const isStroke = item.colorClass.startsWith('stroke-')

          return (
            <div key={item.label} className="flex items-center gap-2">
              {/* Color indicator */}
              {isFill && (
                <svg width={12} height={12}>
                  <circle cx={6} cy={6} r={5} className={item.colorClass} />
                </svg>
              )}

              {isStroke && (
                <svg width={14} height={14}>
                  <line
                    x1={2}
                    y1={12}
                    x2={12}
                    y2={2}
                    className={item.colorClass}
                    strokeWidth={3}
                  />
                </svg>
              )}

              {!isFill && !isStroke && (
                <span
                  className={`inline-block h-3 w-3 rounded ${item.colorClass}`}
                />
              )}

              <span className="font-medium text-foreground">{item.label}</span>
              <span className="text-muted-foreground">
                – {item.description}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
