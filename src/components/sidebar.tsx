'use client'

import Link from 'next/link'
import { useState } from 'react'
import { NavItem } from '@/utils/getNavigation'

/* ---------------------------------------------
   FILTER TREE FUNCTION (fix for your error)
---------------------------------------------- */
function filterTree(tree: NavItem[], query: string): NavItem[] {
  if (!query.trim()) return tree

  const lower = query.toLowerCase()

  return tree
    .map((item) => {
      const nameMatch = item.name.toLowerCase().includes(lower)
      const filteredChildren = filterTree(item.children, query)

      if (nameMatch || filteredChildren.length > 0) {
        return {
          ...item,
          children: filteredChildren,
        }
      }
      return null
    })
    .filter(Boolean) as NavItem[]
}

/* --------------------------------------------- */

export default function Sidebar({ nav }: { nav: NavItem[] }) {
  const [query, setQuery] = useState('')

  const filtered = filterTree(nav, query)

  return (
    <aside className="h-full overflow-y-auto bg-(--bg-sidebar) border-r border-(--border-soft) p-6">
      <h1 className="text-2xl font-bold mb-4">CS Handbook</h1>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-4 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Link href="/" className="text-blue-600 block mb-3">
        🏠 Home
      </Link>

      {filtered.map((section, index) => (
        <Section key={index} data={section} />
      ))}
    </aside>
  )
}

/* --------------------------------------------- */

function Section({ data }: { data: NavItem }) {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <button
        className="font-semibold text-left w-full"
        onClick={() => setOpen(!open)}
      >
        {data.name}
      </button>

      {open && (
        <div className="ml-4 mt-1 space-y-1">
          {data.path && (
            <Link href={data.path} className="text-blue-600 block">
              Overview
            </Link>
          )}

          {data.children.map((child, index) => (
            <Child key={index} data={child} />
          ))}
        </div>
      )}
    </div>
  )
}

function Child({ data }: { data: NavItem }) {
  return (
    <div className="ml-3">
      {data.path ? (
        <Link href={data.path} className="text-blue-600 block">
          {data.name}
        </Link>
      ) : (
        <div>
          <span className="font-medium">{data.name}</span>
          <div className="ml-3">
            {data.children.map((child, index) => (
              <Child key={index} data={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
