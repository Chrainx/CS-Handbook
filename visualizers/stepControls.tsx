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
        className="rounded bg-gray-600 px-4 py-2 text-white disabled:opacity-50"
      >
        Step Back
      </button>

      <button
        onClick={onStepForward}
        disabled={!canStepForward}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        Next Step
      </button>

      <button onClick={onReset} className="rounded border px-4 py-2">
        Reset
      </button>
    </div>
  )
}
