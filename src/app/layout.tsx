import './globals.css'
import Sidebar from '@/components/sidebar'
import Banner from '@/components/banner'
import { getNavigation } from '@/utils/getNavigation'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nav = getNavigation()

  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden flex">
        <aside className="w-64 h-full">
          <Sidebar nav={nav} />
        </aside>

        <main className="flex-1 h-full overflow-y-auto p-8">
          <Banner />
          <div>{children}</div>
        </main>
      </body>
    </html>
  )
}
