'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function GlobalHeader({
  onMenuClick,
}: {
  onMenuClick?: () => void
}) {
  return (
    <header className="h-14 shrink-0 border-b border-border bg-background/95 backdrop-blur flex items-center gap-3 px-4 sm:px-6">
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          aria-label="Toggle navigation menu"
          className="-ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-foreground hover:bg-muted md:hidden"
          type="button"
        >
          <span className="sr-only">Toggle navigation menu</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-5 w-5"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <div className="flex min-w-0 items-center gap-3">
        {/* Logo + wordmark (clickable) */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg tracking-tight text-foreground hover:text-accent transition-colors"
        >
          <Image
            src="/Logo.png"
            alt="CS Handbook logo"
            width={28}
            height={28}
            className="rounded-md"
            priority
          />
          <span>CS Handbook</span>
        </Link>

        {/* Divider */}
        <span className="hidden text-border-strong sm:inline">·</span>

        {/* Subtitle */}
        <span className="hidden truncate text-sm text-muted-foreground sm:inline">
          Interactive CS Reference
        </span>
      </div>
    </header>
  )
}
