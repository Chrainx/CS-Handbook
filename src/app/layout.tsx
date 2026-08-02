import './globals.css'
import Sidebar from '@/components/sidebar'
import Banner from '@/components/banner'
import Footer from '@/components/layout/footer'
import GlobalHeader from '@/components/layout/header'
import { getNavigation } from '@/utils/getNavigation'
import { Suspense } from 'react'

export const metadata = {
  title: {
    default: 'CS Handbook',
    template: '%s | CS Handbook',
  },
  description:
    'Interactive computer science handbook with visual algorithm visualizers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nav = getNavigation()

  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground antialiased">
        {/* Global header */}
        <GlobalHeader />

        {/* Main row */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 h-full shrink-0">
            <Sidebar nav={nav} />
          </div>

          {/* Main content */}
          <main className="flex-1 h-full overflow-y-auto flex flex-col">
            <Suspense fallback={null}>
              <Banner />
            </Suspense>

            <div className="flex-1 px-8 py-8 max-w-4xl w-full mx-auto">
              {children}
            </div>

            <Footer />
          </main>
        </div>
      </body>
    </html>
  )
}
