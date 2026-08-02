type StepControlsProps = {
  canStepBack: boolean
  canStepForward: boolean
  onStepBack: () => void
  onStepForward: () => void
  onReset: () => void
}

export default function StepControls({
  canStepBack,
  canStepForward,
  onStepBack,
  onStepForward,
  onReset,
}: StepControlsProps) {
  return (
    <div className="mt-4 flex gap-3">
      <button
        onClick={onStepBack}
        disabled={!canStepBack}
        className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-card"
      >
        ← Step Back
      </button>

      <button
        onClick={onStepForward}
        disabled={!canStepForward}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:opacity-90 disabled:opacity-40"
      >
        Next Step →
      </button>

      <button
        onClick={onReset}
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        Reset
      </button>
    </div>
  )
}
