'use client'

export function OperationControls({
  playing,
  canStepBack,
  canStepForward,
  onPlay,
  onPause,
  onStepBack,
  onStepForward,
  onReset,
}: {
  playing: boolean
  canStepBack: boolean
  canStepForward: boolean
  onPlay: () => void
  onPause: () => void
  onStepBack: () => void
  onStepForward: () => void
  onReset: () => void
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <button
        onClick={onStepBack}
        disabled={!canStepBack}
        className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-card"
      >
        ← Step Back
      </button>

      {playing ? (
        <button
          onClick={onPause}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:opacity-90"
        >
          ⏸ Pause
        </button>
      ) : (
        <button
          onClick={onPlay}
          disabled={!canStepForward}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:opacity-90 disabled:opacity-40"
        >
          ▶ Play
        </button>
      )}

      <button
        onClick={onStepForward}
        disabled={!canStepForward}
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-card"
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
