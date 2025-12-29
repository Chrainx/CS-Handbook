'use client'

type SearchArrayProps = {
  values: number[]
  low: number | null
  high: number | null
  mid: number | null
  foundIndex: number | null
}

function getCellColor({
  isFound,
  isMid,
  isEliminated,
}: {
  isFound: boolean
  isMid: boolean
  isEliminated: boolean
}) {
  if (isEliminated) return 'bg-gray-200 text-gray-400'
  if (isFound) return 'bg-green-500 text-white'
  if (isMid) return 'bg-red-500 text-white'
  return 'bg-blue-500 text-black'
}

export default function SearchArray({
  values,
  low,
  high,
  mid,
  foundIndex,
}: SearchArrayProps) {
  return (
    <div className="flex gap-3 p-4 rounded border ">
      {values.map((value, index) => {
        const inRange =
          low !== null && high !== null && index >= low && index <= high

        const isFound = index === foundIndex
        const isMid = index === mid
        const isEliminated = mid == null || (!inRange && foundIndex === null)

        return (
          <div
            key={index}
            className={`
              relative inline-flex items-center justify-center 
              border border-black transition-all duration-200 
              ${getCellColor({
                isFound,
                isMid,
                isEliminated,
              })}
            `}
            style={{ width: 64, height: 64 }}
          >
            <span className="text-xl font-bold font-mono">{value}</span>
          </div>
        )
      })}
    </div>
  )
}
