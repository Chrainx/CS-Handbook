import './globals.css'

export const metadata = {
  title: 'CS Handbook',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 border-r p-6">
          <h1 className="text-2xl font-bold mb-4">CS Handbook</h1>

          <nav className="space-y-3">
            <a className="block text-blue-600" href="/algorithms/merge-sort">
              Merge Sort
            </a>
            <a className="block text-blue-600" href="/algorithms/quick-sort">
              Quick Sort
            </a>
            <a className="block text-blue-600" href="/algorithms/bfs">
              BFS
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10">{children}</main>
      </body>
    </html>
  )
}
