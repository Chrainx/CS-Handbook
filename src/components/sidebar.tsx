'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { NavItem } from '@/utils/getNavigation'
import { usePathname } from 'next/navigation'

function filterTree(nodes: NavItem[], query: string): NavItem[] {
  if (!query) return nodes

  const q = query.toLowerCase()
  const result: NavItem[] = []

  for (const node of nodes) {
    const nodeMatches = node.name.toLowerCase().includes(q)

    if (nodeMatches) {
      // keep node as-is (preserves order)
      result.push(node)
      continue
    }

    const filteredChildren = filterTree(node.children, query)

    if (filteredChildren.length > 0) {
      result.push({
        ...node,
        children: filteredChildren,
      })
    }
  }

  return result
}

export default function Sidebar({ nav }: { nav: NavItem[] }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => filterTree(nav, query), [nav, query])
  const pathname = usePathname()
  const isSearching = query.trim().length > 0

  return (
    <aside className="h-full overflow-y-auto bg-sidebar border-r border-border px-4 py-6">
      <div className="mb-4 px-2">
        <h1 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          Handbook
        </h1>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full mb-4 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft transition"
      />

      <nav className="space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-accent-soft hover:text-accent transition-colors"
        >
          Home
        </Link>

        <div className="pt-2 space-y-0.5">
          {filtered.map((item, i) => (
            <TreeNode
              key={i}
              node={item}
              depth={0}
              pathname={pathname}
              forceOpen={isSearching}
            />
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
  forceOpen = false,
}: {
  node: NavItem
  depth: number
  pathname: string
  forceOpen?: boolean
}) {
  const isActive = node.path === pathname
  const isDescendantActive = node.children.some((child) =>
    pathname.startsWith(child.path ?? '')
  )
  const [open, setOpen] = useState(isActive || isDescendantActive)
  const hasChildren = node.children.length > 0
  const effectiveOpen = open || (forceOpen && hasChildren)

  const indent = depth === 0 ? 'ml-0' : 'ml-3'
  const textSize = depth === 0 ? 'text-sm font-semibold' : 'text-sm'

  const baseColor = isActive
    ? 'text-accent font-semibold'
    : 'text-sidebar-foreground'

  return (
    <div className={indent}>
      <div
        className={`flex items-center gap-1.5 rounded-md py-1 pr-2 ${
          isActive ? 'bg-accent-soft' : 'hover:bg-accent-soft/60'
        } transition-colors`}
      >
        {hasChildren ? (
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="w-4 shrink-0 text-[10px] text-muted-foreground hover:text-foreground"
            type="button"
          >
            {effectiveOpen ? '▾' : '▸'}
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {node.path ? (
          <Link
            href={node.path}
            aria-current={isActive ? 'page' : undefined}
            className={`${textSize} ${baseColor} hover:text-accent transition-colors`}
          >
            {node.displayName ?? node.name}
          </Link>
        ) : (
          <span className={`${textSize} ${baseColor}`}>
            {node.displayName ?? node.name}
          </span>
        )}
      </div>

      {effectiveOpen && hasChildren && (
        <div className="mt-0.5 space-y-0.5">
          {node.path && (
            <Link
              href={node.path}
              aria-current={isActive ? 'page' : undefined}
              className={`ml-6 block rounded-md px-2 py-1 text-xs hover:bg-accent-soft/60 ${
                isActive ? 'text-accent font-semibold' : 'text-accent'
              }`}
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
              forceOpen={forceOpen}
            />
          ))}
        </div>
      )}
    </div>
  )
}
