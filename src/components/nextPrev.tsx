'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { topicOrder, categoryOrder, type Category } from '@/utils/topicOrder'

type NavLink = { href: string; label: string }

export default function NextPrev() {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(Boolean)

  if (parts.length === 0) return null

  const section = parts[0] // 'algorithms' | 'data-structures' | others

  // Only show NextPrev in Algorithms + Data Structures
  if (section !== 'algorithms' && section !== 'data-structures') return null

  // -------------------------
  // Section: Data Structures
  // -------------------------
  if (section === 'data-structures') {
    const dsTopic = (parts[1] ?? null) as string | null
    const dsTopics = topicOrder['data-structures'] ?? []

    let prev: NavLink | null = null
    let next: NavLink | null = null

    const lastAlgoCat = categoryOrder[categoryOrder.length - 1]
    const lastAlgoTopics = topicOrder[lastAlgoCat] ?? []
    const lastAlgoTopic =
      lastAlgoTopics.length > 0
        ? lastAlgoTopics[lastAlgoTopics.length - 1]
        : null

    // /data-structures (overview)
    if (!dsTopic) {
      // Prev goes back to last algorithms topic (or /algorithms if somehow empty)
      if (lastAlgoTopic) {
        prev = {
          href: `/algorithms/${lastAlgoCat}/${lastAlgoTopic}`,
          label: format(lastAlgoTopic),
        }
      } else {
        prev = { href: `/algorithms`, label: 'Algorithms Overview' }
      }

      // Next goes to first DS topic page (if you have DS subpages)
      if (dsTopics.length > 0) {
        const first = dsTopics[0]
        next = { href: `/data-structures/${first}`, label: format(first) }
      }

      return <NavBar prev={prev} next={next} />
    }

    // /data-structures/:topic
    const idx = dsTopics.indexOf(dsTopic)
    if (idx === -1) return null

    // Prev: previous DS topic OR DS overview
    if (idx > 0) {
      const prevTopic = dsTopics[idx - 1]
      prev = { href: `/data-structures/${prevTopic}`, label: format(prevTopic) }
    } else {
      prev = { href: `/data-structures`, label: 'Data Structures Overview' }
    }

    // Next: next DS topic OR null (end)
    if (idx < dsTopics.length - 1) {
      const nextTopic = dsTopics[idx + 1]
      next = { href: `/data-structures/${nextTopic}`, label: format(nextTopic) }
    }

    return <NavBar prev={prev} next={next} />
  }

  // -------------------------
  // Section: Algorithms (your existing logic, with 1 bridge)
  // -------------------------
  const category = (parts[1] ?? null) as string | null
  const topic = (parts[2] ?? null) as string | null

  // /algorithms overview page
  if (!category) {
    const firstCat = categoryOrder[0]
    const next: NavLink = {
      href: `/algorithms/${firstCat}`,
      label: `${format(firstCat)} Overview`,
    }
    return <NavBar prev={null} next={next} />
  }

  if (!isCategory(category)) return null

  const catIndex = categoryOrder.indexOf(category)
  const topics = topicOrder[category] ?? []

  let prev: NavLink | null = null
  let next: NavLink | null = null

  // Case A: /algorithms/:category (overview)
  if (!topic) {
    if (catIndex > 0) {
      const prevCat = categoryOrder[catIndex - 1]
      const prevTopics = topicOrder[prevCat] ?? []
      if (prevTopics.length > 0) {
        const last = prevTopics[prevTopics.length - 1]
        prev = { href: `/algorithms/${prevCat}/${last}`, label: format(last) }
      } else {
        prev = {
          href: `/algorithms/${prevCat}`,
          label: `${format(prevCat)} Overview`,
        }
      }
    } else {
      prev = { href: `/algorithms`, label: 'Algorithms Overview' }
    }

    if (topics.length > 0) {
      const first = topics[0]
      next = { href: `/algorithms/${category}/${first}`, label: format(first) }
    } else if (catIndex < categoryOrder.length - 1) {
      const nextCat = categoryOrder[catIndex + 1]
      next = {
        href: `/algorithms/${nextCat}`,
        label: `${format(nextCat)} Overview`,
      }
    }

    return <NavBar prev={prev} next={next} />
  }

  // Case B: /algorithms/:category/:topic (topic page)
  const index = topics.indexOf(topic)
  if (index === -1) return null

  // Prev: previous topic OR category overview
  if (index > 0) {
    const prevTopic = topics[index - 1]
    prev = {
      href: `/algorithms/${category}/${prevTopic}`,
      label: format(prevTopic),
    }
  } else {
    prev = {
      href: `/algorithms/${category}`,
      label: `${format(category)} Overview`,
    }
  }

  // Next: next topic OR next category overview OR bridge to data structures
  if (index < topics.length - 1) {
    const nextTopic = topics[index + 1]
    next = {
      href: `/algorithms/${category}/${nextTopic}`,
      label: format(nextTopic),
    }
  } else {
    // last topic in this category
    if (catIndex < categoryOrder.length - 1) {
      const nextCat = categoryOrder[catIndex + 1]
      next = {
        href: `/algorithms/${nextCat}`,
        label: `${format(nextCat)} Overview`,
      }
    } else {
      // ✅ LAST ALGORITHMS TOPIC → go to Data Structures overview
      next = { href: `/data-structures`, label: `Data Structures Overview` }
    }
  }

  return <NavBar prev={prev} next={next} />
}

function NavBar({
  prev,
  next,
}: {
  prev: NavLink | null
  next: NavLink | null
}) {
  if (!prev && !next) return null

  return (
    <div className="flex justify-between mt-12 pt-6 border-t border-(--border-soft)">
      {prev ? (
        <Link className="text-blue-600 hover:underline" href={prev.href}>
          ← {prev.label}
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link className="text-blue-600 hover:underline" href={next.href}>
          {next.label} →
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

function isCategory(x: string): x is Category {
  return (categoryOrder as readonly string[]).includes(x)
}

function format(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
