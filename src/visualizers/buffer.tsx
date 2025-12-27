type MergeBufferProps = {
  label: string
  values: number[]
  activeIndex: number | null
  consumedCount: number
}

export default function MergeBuffer({
  label,
  values,
  activeIndex,
  consumedCount,
}: MergeBufferProps) {
  return (
    <div>
      <div className="font-medium mb-1">{label}</div>
      <div className="flex gap-2">
        {values.map((v, i) => {
          const isCompare = activeIndex === i
          const isUsed = i < consumedCount

          return (
            <div
              key={i}
              className={`rounded px-2 py-1 ${
                isCompare
                  ? 'bg-red-500 text-white'
                  : isUsed
                  ? 'bg-gray-200 text-gray-400 line-through opacity-60'
                  : 'bg-gray-200'
              }`}
            >
              {v}
            </div>
          )
        })}
      </div>
    </div>
  )
}
