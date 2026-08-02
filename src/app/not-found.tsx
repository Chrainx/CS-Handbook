import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
      <h1 className="text-3xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t
        been written yet.
      </p>
      <Link
        href="/"
        className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
      >
        Back to home
      </Link>
    </div>
  )
}
