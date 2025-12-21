'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { topicOrder, categoryOrder, type Category } from '@/utils/topicOrder'

type NavLink = { href: string; label: string }

export default function NextPrev() {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(Boolean)

  // Routes we support:
  // /algorithms
  // /algorithms/:category
  // /algorithms/:category/:topic
  if (parts.length === 0) return null

  // If you want NextPrev ONLY inside algorithms pages, keep this guard:
  if (parts[0] !== 'algorithms') return null

  const category = (parts[1] ?? null) as string | null
  const topic = (parts[2] ?? null) as string | null

  // Special case: /algorithms overview page
  if (!category) {
    const firstCat = categoryOrder[0]
    const next: NavLink = {
      href: `/algorithms/${firstCat}`,
      label: `${format(firstCat)} Overview`,
    }
    return <NavBar prev={null} next={next} />
  }

  // Unknown category? (e.g. typo in URL)
  if (!isCategory(category)) return null

  const catIndex = categoryOrder.indexOf(category)
  const topics = topicOrder[category] ?? []

  let prev: NavLink | null = null
  let next: NavLink | null = null

  // -------------------------
  // Case A: /algorithms/:category (overview)
  // -------------------------
  if (!topic) {
    // Prev: previous category's last topic OR previous category overview (choose behavior)
    if (catIndex > 0) {
      const prevCat = categoryOrder[catIndex - 1]
      // docs-style: go to previous category's last topic if exists, else overview
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
      // first category overview -> previous is /algorithms
      prev = { href: `/algorithms`, label: 'Algorithms Overview' }
    }

    // Next: first topic in this category, else next category overview
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

  // -------------------------
  // Case B: /algorithms/:category/:topic (topic page)
  // -------------------------
  const index = topics.indexOf(topic)

  // If topic not found in topicOrder, don't guess. (prevents broken links)
  if (index === -1) return null

  // Prev: previous topic OR category overview
  if (index > 0) {
    const prevTopic = topics[index - 1]
    prev = {
      href: `/algorithms/${category}/${prevTopic}`,
      label: format(prevTopic),
    }
  } else {
    // first topic -> category overview
    prev = {
      href: `/algorithms/${category}`,
      label: `${format(category)} Overview`,
    }
  }

  // Next: next topic OR next category overview
  if (index < topics.length - 1) {
    const nextTopic = topics[index + 1]
    next = {
      href: `/algorithms/${category}/${nextTopic}`,
      label: format(nextTopic),
    }
  } else {
    // last topic -> next category overview (or if none, null)
    if (catIndex < categoryOrder.length - 1) {
      const nextCat = categoryOrder[catIndex + 1]
      next = {
        href: `/algorithms/${nextCat}`,
        label: `${format(nextCat)} Overview`,
      }
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
