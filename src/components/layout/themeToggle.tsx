'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
  // null = no explicit user choice yet - the OS preference (via the
  // prefers-color-scheme media query in globals.css) should keep driving
  // the actual colors, live, until the user picks one.
  const [explicitTheme, setExplicitTheme] = useState<Theme | null>(null)
  const [systemTheme, setSystemTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') setExplicitTheme(stored)

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mql.matches ? 'dark' : 'light')

    const onChange = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? 'dark' : 'light')
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    // Only pin an explicit override - with none, leave the attribute
    // unset so prefers-color-scheme keeps driving colors reactively.
    if (explicitTheme) {
      document.documentElement.setAttribute('data-theme', explicitTheme)
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [explicitTheme])

  const effectiveTheme = explicitTheme ?? systemTheme

  function toggleTheme() {
    const next: Theme = effectiveTheme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', next)
    setExplicitTheme(next)
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      type="button"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-foreground hover:bg-muted"
    >
      <span className="sr-only">Toggle dark mode</span>
      {effectiveTheme === 'dark' ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  )
}
