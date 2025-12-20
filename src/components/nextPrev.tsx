'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { topicOrder, categoryOrder } from '@/utils/topicOrder'

export default function NextPrev() {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(Boolean)

  // expect ["algorithms", "sorting", "merge-sort"]
  if (parts.length < 2) return null

  const category = parts[1]
  const topic = parts[2] || null

  const topics = topicOrder[category] || []
  const catIndex = categoryOrder.indexOf(category)

  let prevHref = null
  let nextHref = null
  let prevLabel = null
  let nextLabel = null

  if (topic) {
    // We're on a specific topic page
    const index = topics.indexOf(topic)

    // Prev topic?
    if (index > 0) {
      const prevTopic = topics[index - 1]
      prevHref = `/algorithms/${category}/${prevTopic}`
      prevLabel = format(prevTopic)
    } else {
      // Go to previous category overview
      if (catIndex > 0) {
        const prevCat = categoryOrder[catIndex - 1]
        prevHref = `/algorithms/${prevCat}`
        prevLabel = `${format(prevCat)} Overview`
      }
    }

    // Next topic?
    if (index < topics.length - 1) {
      const nextTopic = topics[index + 1]
      nextHref = `/algorithms/${category}/${nextTopic}`
      nextLabel = format(nextTopic)
    } else {
      // Go to next category overview
      if (catIndex < categoryOrder.length - 1) {
        const nextCat = categoryOrder[catIndex + 1]
        nextHref = `/algorithms/${nextCat}`
        nextLabel = format(nextCat) + ' Overview'
      }
    }
  } else {
    // We are on a category overview
    // Prev category overview?
    if (catIndex > 0) {
      const prevCat = categoryOrder[catIndex - 1]
      prevHref = `/algorithms/${prevCat}`
      prevLabel = `${format(prevCat)} Overview`
    }

    // Next goes to first topic in this category OR next category overview
    if (topics.length > 0) {
      const firstTopic = topics[0]
      nextHref = `/algorithms/${category}/${firstTopic}`
      nextLabel = format(firstTopic)
    } else if (catIndex < categoryOrder.length - 1) {
      // No topics → go to next category overview
      const nextCat = categoryOrder[catIndex + 1]
      nextHref = `/algorithms/${nextCat}`
      nextLabel = `${format(nextCat)} Overview`
    }
  }

  return (
    <div className="flex justify-between mt-12 pt-6 border-t border-(--border-soft)">
      {prevHref ? (
        <Link className="text-blue-600 hover:underline" href={prevHref}>
          ← {prevLabel}
        </Link>
      ) : (
        <div />
      )}

      {nextHref ? (
        <Link className="text-blue-600 hover:underline" href={nextHref}>
          {nextLabel} →
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

// Format text
function format(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
