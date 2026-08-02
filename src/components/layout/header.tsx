import Link from 'next/link'
import Image from 'next/image'

export default function GlobalHeader() {
  return (
    <header className="h-14 shrink-0 border-b border-border bg-background/95 backdrop-blur flex items-center px-6">
      <div className="flex items-center gap-3">
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
        <span className="text-border-strong">·</span>

        {/* Subtitle */}
        <span className="text-sm text-muted-foreground">
          Interactive CS Reference
        </span>
      </div>
    </header>
  )
}
