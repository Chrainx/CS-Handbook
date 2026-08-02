export default function Footer() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION

  return (
    <footer className="border-t border-border mt-12">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>
            CS Handbook ·{' '}
            <span className="font-medium text-foreground">V-{version}</span>
          </span>

          <span className="text-xs">
            Interactive Algorithms & CS Fundamentals
          </span>
        </div>

        {/* Secondary line */}
        <div className="mt-2 text-center text-xs text-muted-foreground">
          Built with Next.js & Tailwind — by Fredy
        </div>
      </div>
    </footer>
  )
}
