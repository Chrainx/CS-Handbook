import './globals.css'
import Sidebar from '@/components/sidebar'
import Banner from '@/components/banner'
import Footer from '@/components/layout/footer'
import GlobalHeader from '@/components/layout/header'
import { getNavigation } from '@/utils/getNavigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nav = getNavigation()

  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden flex flex-col">
        {/* Global header */}
        <GlobalHeader />

        {/* Main row */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 h-full shrink-0 border-r border-border">
            <Sidebar nav={nav} />
          </aside>

          {/* Main content */}
          <main className="flex-1 h-full overflow-y-auto flex flex-col p-8">
            <Banner />

            <div className="flex-1">{children}</div>

            <Footer />
          </main>
        </div>
      </body>
    </html>
  )
}
