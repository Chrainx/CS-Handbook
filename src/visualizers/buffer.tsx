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
      <div className="mb-1 font-medium text-foreground">{label}</div>
      <div className="flex gap-2">
        {values.map((v, i) => {
          const isCompare = activeIndex === i
          const isUsed = i < consumedCount

          return (
            <div
              key={i}
              className={`rounded-md px-2 py-1 font-mono text-sm transition-colors ${
                isCompare
                  ? 'bg-accent text-accent-foreground'
                  : isUsed
                  ? 'bg-muted text-muted-foreground line-through opacity-60'
                  : 'bg-muted text-foreground'
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
