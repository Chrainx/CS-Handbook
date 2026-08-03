export function AlgorithmHeaderCard({
  name,
  stepIndex,
  stepLength,
  onChangeAlgorithm,
}: {
  name: string
  stepIndex: number
  stepLength: number
  onChangeAlgorithm?: () => void
}) {
  return (
    <>
      <div className="mb-6 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <div className="text-sm text-muted-foreground">Current Algorithm</div>
        <div className="text-lg font-semibold text-foreground">{name}</div>
        <div className="text-sm text-foreground">
          Step <strong>{stepIndex}</strong> / <strong>{stepLength}</strong>
        </div>
      </div>

      {onChangeAlgorithm && (
        <div className="mb-4 flex gap-4">
          <button
            onClick={onChangeAlgorithm}
            className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors"
            type="button"
          >
            Change Algorithm
          </button>
        </div>
      )}
    </>
  )
}
