import './globals.css'
import Sidebar from '@/components/sidebar'
import { getNavigation } from '@/utils/getNavigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nav = getNavigation()

  return (
    <html lang="en">
      <body className="flex h-screen w-screen overflow-hidden">
        {/* FIXED SIDEBAR */}
        <aside className="w-64 h-full overflow-y-auto bg-(--bg-sidebar) border-r border-(--border-soft)">
          <Sidebar nav={nav} />
        </aside>

        {/* SCROLLABLE PAGE CONTENT */}
        <main className="flex-1 h-full overflow-y-auto p-8 bg-(--bg)">
          {children}
        </main>
      </body>
    </html>
  )
}
