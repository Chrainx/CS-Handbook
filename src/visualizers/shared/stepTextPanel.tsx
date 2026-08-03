export type StepTextVariant = 'default' | 'warning' | 'error'

const VARIANT_CLASSES: Record<StepTextVariant, string> = {
  default: 'border-border bg-accent-soft text-foreground',
  warning: 'border-state-mark/40 bg-state-mark/15 text-foreground',
  error: 'border-state-compare/40 bg-state-compare/15 text-foreground',
}

export function StepTextPanel({
  text,
  variant = 'default',
}: {
  text: string
  variant?: StepTextVariant
}) {
  if (!text) return null

  return (
    <div
      className={`my-3 rounded-xl border px-4 py-2 text-sm ${VARIANT_CLASSES[variant]}`}
    >
      {text}
    </div>
  )
}
