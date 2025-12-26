'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sections } from '@/utils/section'

type NavLink = { href: string; label: string }

const sectionKeys = Object.keys(sections) as (keyof typeof sections)[]

export default function NextPrev() {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return null

  const section = sectionKeys.find(
    (k) => sections[k].path.replace('/', '') === parts[0]
  )
  if (!section) return null

  const sectionConfig = sections[section]
  const sectionIndex = sectionKeys.indexOf(section)

  const topic = parts[1] ?? null
  const subTopic = parts[2] ?? null

  const topics = sectionConfig.order
  const subTopics = topic ? sectionConfig.subOrder?.[topic] ?? null : null

  let prev: NavLink | null = null
  let next: NavLink | null = null

  /* -------------------------
     SECTION OVERVIEW
     /algorithms  or  /data-structures
     ------------------------- */
  if (!topic) {
    // prev → last leaf of previous section (NOT its overview)
    if (sectionIndex > 0) {
      const prevSectionKey = sectionKeys[sectionIndex - 1]
      const last = lastLeafInSection(prevSectionKey)
      prev = { href: last.href, label: last.label }
    }

    // next → first topic overview
    if (topics.length > 0) {
      next = {
        href: `${sectionConfig.path}/${topics[0]}`,
        label: format(topics[0]),
      }
    }

    return <NavBar prev={prev} next={next} />
  }

  /* -------------------------
     TOPIC OVERVIEW
     /algorithms/sorting
     /algorithms/greedy
     /data-structures/arrays  (usually leaf, but still fine)
     ------------------------- */
  if (!subTopic) {
    const topicIndex = topics.indexOf(topic)
    if (topicIndex === -1) return null

    // prev → last leaf of previous topic (or section overview if first topic)
    if (topicIndex > 0) {
      const prevTopic = topics[topicIndex - 1]
      const last = lastLeafInTopic(section, prevTopic)
      prev = { href: last.href, label: last.label }
    } else {
      prev = {
        href: sectionConfig.path,
        label: `${formatSection(section)}`,
      }
    }

    // next → first subtopic if exists, else next topic overview, else next section overview
    if (subTopics && subTopics.length > 0) {
      next = {
        href: `${sectionConfig.path}/${topic}/${subTopics[0]}`,
        label: format(subTopics[0]),
      }
    } else if (topicIndex < topics.length - 1) {
      const nextTopic = topics[topicIndex + 1]
      next = {
        href: `${sectionConfig.path}/${nextTopic}`,
        label: format(nextTopic),
      }
    } else if (sectionIndex < sectionKeys.length - 1) {
      const nextSectionKey = sectionKeys[sectionIndex + 1]
      next = {
        href: sections[nextSectionKey].path,
        label: `${formatSection(nextSectionKey)}`,
      }
    }

    return <NavBar prev={prev} next={next} />
  }

  /* -------------------------
     SUBTOPIC PAGE
     /algorithms/sorting/insertion-sort
     ------------------------- */
  if (!subTopics) return null

  const subIndex = subTopics.indexOf(subTopic)
  if (subIndex === -1) return null

  // prev
  if (subIndex > 0) {
    prev = {
      href: `${sectionConfig.path}/${topic}/${subTopics[subIndex - 1]}`,
      label: format(subTopics[subIndex - 1]),
    }
  } else {
    prev = {
      href: `${sectionConfig.path}/${topic}`,
      label: `${format(topic)}`,
    }
  }

  // next
  if (subIndex < subTopics.length - 1) {
    next = {
      href: `${sectionConfig.path}/${topic}/${subTopics[subIndex + 1]}`,
      label: format(subTopics[subIndex + 1]),
    }
  } else {
    const topicIndex = topics.indexOf(topic)
    if (topicIndex < topics.length - 1) {
      const nextTopic = topics[topicIndex + 1]
      next = {
        href: `${sectionConfig.path}/${nextTopic}`,
        label: format(nextTopic),
      }
    } else if (sectionIndex < sectionKeys.length - 1) {
      const nextSectionKey = sectionKeys[sectionIndex + 1]
      next = {
        href: sections[nextSectionKey].path,
        label: `${formatSection(nextSectionKey)} Overview`,
      }
    }
  }

  return <NavBar prev={prev} next={next} />

  /* -------------------------
     Helpers (scoped)
     ------------------------- */

  function lastLeafInTopic(
    sectionKey: keyof typeof sections,
    topicKey: string
  ) {
    const sec = sections[sectionKey]
    const subs = sec.subOrder?.[topicKey]
    if (subs && subs.length > 0) {
      const lastSub = subs[subs.length - 1]
      return {
        href: `${sec.path}/${topicKey}/${lastSub}`,
        label: format(lastSub),
      }
    }
    return {
      href: `${sec.path}/${topicKey}`,
      label: `${format(topicKey)} Overview`,
    }
  }

  function lastLeafInSection(sectionKey: keyof typeof sections) {
    const sec = sections[sectionKey]
    const lastTopic = sec.order[sec.order.length - 1]
    return lastLeafInTopic(sectionKey, lastTopic)
  }
}

/* -------------------------
   UI
   ------------------------- */

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

function format(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatSection(key: string) {
  return format(key)
}
