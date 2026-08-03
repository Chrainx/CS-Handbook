'use client'

import { ReactNode, Suspense, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import Banner from '@/components/banner'
import Footer from './footer'
import GlobalHeader from './header'
import { NavItem } from '@/utils/getNavigation'

export default function AppShell({
  nav,
  children,
}: {
  nav: NavItem[]
  children: ReactNode
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pathname = usePathname()

  // close the mobile nav whenever the route changes
  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  return (
    <>
      <GlobalHeader onMenuClick={() => setMobileNavOpen((v) => !v)} />

      <div className="relative flex flex-1 overflow-hidden">
        {/* Backdrop (mobile only, while nav is open) */}
        {mobileNavOpen && (
          <div
            className="fixed left-0 right-0 top-14 bottom-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

        {/* Sidebar: off-canvas on mobile, static column on md+ */}
        <div
          className={`fixed left-0 top-14 bottom-0 z-50 w-64 shrink-0 transition-transform duration-200 md:static md:top-0 md:bottom-auto md:h-full md:translate-x-0 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar nav={nav} />
        </div>

        {/* Main content */}
        <main className="flex-1 h-full overflow-y-auto flex flex-col">
          <Suspense fallback={null}>
            <Banner />
          </Suspense>

          <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:px-8">
            {children}
          </div>

          <Footer />
        </main>
      </div>
    </>
  )
}
