'use client'

import Link from 'next/link'
import { useState } from 'react'
import { NavItem } from '@/utils/getNavigation'

export default function Sidebar({ nav }: { nav: NavItem[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CS Handbook</h1>
      <nav className="space-y-2">
        {/* Home link */}
        <Link href="/" className="text-blue-600 block mb-3">
          🏠 Home
        </Link>

        {nav.map((section, index) => (
          <Section key={index} data={section} />
        ))}
      </nav>
    </div>
  )
}

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
