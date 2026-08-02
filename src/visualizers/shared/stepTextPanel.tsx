export function StepTextPanel({ text }: { text: string }) {
  if (!text) return null

  return (
    <div className="my-3 rounded-xl border border-border bg-accent-soft px-4 py-2 text-sm text-foreground">
      {text}
    </div>
  )
}
