'use client'

const CANVAS_HEIGHT = 220
const LABEL_PADDING = 4

function getBarColor({
  algorithm,
  isSwap,
  isMarked,
  isOverwrite,
  isCompare,
  isBase,
}: {
  algorithm: string
  isSwap: boolean
  isMarked: boolean
  isOverwrite: boolean
  isCompare: boolean
  isBase: boolean
}) {
  if (algorithm === 'insertion') {
    if (isSwap) return 'bg-green-500'
    if (isCompare) return 'bg-red-500'
    return 'bg-blue-500'
  }

  if (algorithm === 'selection') {
    if (isSwap) return 'bg-green-500'
    if (isMarked) return 'bg-yellow-500'
    if (isCompare) return 'bg-red-500'
    return 'bg-blue-500'
  }

  if (algorithm === 'merge') {
    if (isCompare) return 'bg-red-500'
    if (isOverwrite) return 'bg-green-500'
    if (isBase) return 'bg-gray-500'
    return 'bg-blue-500'
  }

  return 'bg-blue-500'
}

export default function Bars({
  algorithm,
  data,
  activeCompare,
  activeSwap,
  activeRange,
  activeOverwrite,
  markedIndex,
  baseIndex,
}: {
  algorithm: string
  data: number[]
  activeCompare: { i: number; j: number } | null
  activeSwap: { i: number; j: number } | null
  activeRange: { l: number; r: number; mid?: number } | null
  activeOverwrite: number | null
  markedIndex: number | null
  baseIndex: number | null
}) {
  const min = Math.min(...data)
  const offset = min <= 0 ? 1 - min : 0
  const normalized = data.map((v) => v + offset)
  const max = Math.max(...normalized, 1)

  return (
    <div className="flex gap-3 border rounded p-4">
      {data.map((v, i) => {
        const barHeight = (normalized[i] / max) * CANVAS_HEIGHT

        const isSwap = activeSwap && (i === activeSwap.i || i === activeSwap.j)
        const isCompare =
          activeCompare && (i === activeCompare.i || i === activeCompare.j)
        const isMarked = markedIndex === i
        const isOverwrite = activeOverwrite === i

        const isRangeStart = activeRange && i === activeRange.l
        const isRangeEnd = activeRange && i === activeRange.r
        const isMid = activeRange?.mid === i
        const isBase = baseIndex === i

        return (
          <div
            key={i}
            className="relative inline-block"
            style={{ width: 40, height: CANVAS_HEIGHT }}
          >
            {isRangeStart && (
              <div className="absolute -left-2 top-0 h-full w-1 rounded bg-purple-600" />
            )}

            {isRangeEnd && (
              <div className="absolute -right-2 top-0 h-full w-1 rounded bg-purple-600" />
            )}

            {isMid && (
              <div className="absolute -right-2 top-0 h-full w-1 rounded bg-purple-600" />
            )}

            <div
              className={`absolute bottom-0 w-full rounded-sm transition-all duration-200 ${getBarColor(
                {
                  algorithm,
                  isSwap: !!isSwap,
                  isMarked,
                  isOverwrite,
                  isCompare: !!isCompare,
                  isBase,
                }
              )}`}
              style={{ height: barHeight }}
            />

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
  )
}
