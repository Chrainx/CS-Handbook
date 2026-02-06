import Link from 'next/link'
import Image from 'next/image'

export default function GlobalHeader() {
  return (
    <header className="h-14 border-b border-border flex items-center px-6">
      <div className="flex items-center gap-3">
        {/* Logo + wordmark (clickable) */}
        <Link
          href="/"
          className="flex items-center font-semibold text-lg hover:opacity-80 transition"
        >
          <Image
            src="/Logo.png"
            alt="CS Handbook logo"
            width={84}
            height={84}
            priority
          />
          <span>CS Handbook</span>
        </Link>

        {/* Divider */}
        <span className="text-muted-foreground">·</span>

        {/* Subtitle */}
        <span className="text-sm text-muted-foreground">
          Interactive CS Reference
        </span>
      </div>
    </header>
  )
}
