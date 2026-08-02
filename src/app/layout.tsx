import './globals.css'
import AppShell from '@/components/layout/appShell'
import { getNavigation } from '@/utils/getNavigation'

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
        <AppShell nav={nav}>{children}</AppShell>
      </body>
    </html>
  )
}
