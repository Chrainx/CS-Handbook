'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { NavItem } from '@/utils/getNavigation'
import { usePathname } from 'next/navigation'

function filterTree(nodes: NavItem[], query: string): NavItem[] {
  if (!query) return nodes

  const q = query.toLowerCase()

  return nodes
    .map((node) => {
      const nodeMatches = node.name.toLowerCase().includes(q)

      if (nodeMatches) {
        // KEEP FULL SUBTREE
        return node
      }

      const filteredChildren = filterTree(node.children, query)

      if (filteredChildren.length > 0) {
        // KEEP NODE WITH MATCHING CHILDREN
        return {
          ...node,
          children: filteredChildren,
        }
      }

      return null
    })
    .filter(Boolean) as NavItem[]
}

export default function Sidebar({ nav }: { nav: NavItem[] }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => filterTree(nav, query), [nav, query])
  const pathname = usePathname()

  return (
    <aside className="h-full overflow-y-auto bg-(--bg-sidebar) border-r border-(--border-soft) p-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold">CS Handbook</h1>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full mb-4 px-3 py-2 text-sm rounded border border-(--border-soft) bg-white"
      />

      <nav className="space-y-2">
        <Link href="/" className="block text-sm font-medium hover:underline">
          🏠 Home
        </Link>

        <div className="pt-2 space-y-2">
          {filtered.map((item, i) => (
            <TreeNode key={i} node={item} depth={0} pathname={pathname} />
          ))}
        </div>
      </nav>
    </aside>
  )
}

function TreeNode({
  node,
  depth,
  pathname,
}: {
  node: NavItem
  depth: number
  pathname: string
}) {
  const isActive = node.path === pathname
  const isDescendantActive = node.children.some((child) =>
    pathname.startsWith(child.path ?? '')
  )
  const [open, setOpen] = useState(true)
  const hasChildren = node.children.length > 0

  // 🔧 STYLE TUNING
  const indent = depth === 0 ? 'ml-0' : 'ml-3'
  const textSize = depth === 0 ? 'text-base font-semibold' : 'text-sm'

  const baseColor = isActive
    ? 'text-blue-600 font-semibold'
    : 'text-(--text-secondary)'

  return (
    <div className={indent}>
      <div className="flex items-center gap-2 py-0.5">
        {hasChildren ? (
          <button
            onClick={() => setOpen(!open)}
            className="w-4 text-xs opacity-60 hover:opacity-100"
            type="button"
          >
            {open ? '▾' : '▸'}
          </button>
        ) : (
          <span className="w-4" />
        )}

        {node.path ? (
          <Link
            href={node.path}
            className={`${textSize} ${baseColor} hover:underline`}
          >
            {node.displayName ?? node.name}
          </Link>
        ) : (
          <span className={`${textSize} ${baseColor}`}>
            {node.displayName ?? node.name}
          </span>
        )}
      </div>

      {open && hasChildren && (
        <div className="space-y-0.5">
          {node.path && (
            <Link
              href={node.path}
              className={`ml-6 block text-xs ${
                isActive ? 'text-blue-600 font-semibold' : 'text-blue-600'
              } hover:underline`}
            >
              Overview
            </Link>
          )}

          {node.children.map((child, i) => (
            <TreeNode
              key={i}
              node={child}
              depth={depth + 1}
              pathname={pathname}
            />
          ))}
        </div>
      )}
    </div>
  )
}
