export type ComplexityInfo = {
  best: string
  average: string
  worst: string
  space: string
  note?: string
}

export function ComplexityBadge({ complexity }: { complexity: ComplexityInfo }) {
  return (
    <div className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-sm">
      <div className="mb-2 font-medium text-foreground">Complexity</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <span className="text-muted-foreground">Best: </span>
          <span className="font-mono text-foreground">{complexity.best}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Average: </span>
          <span className="font-mono text-foreground">
            {complexity.average}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Worst: </span>
          <span className="font-mono text-foreground">{complexity.worst}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Space: </span>
          <span className="font-mono text-foreground">{complexity.space}</span>
        </div>
      </div>
      {complexity.note && (
        <div className="mt-2 text-xs text-muted-foreground">
          {complexity.note}
        </div>
      )}
    </div>
  )
}
