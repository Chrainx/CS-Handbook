import fs from 'fs'
import path from 'path'
import { categoryOrder, topicOrder } from './topicOrder'

export interface NavItem {
  name: string
  path: string | null
  children: NavItem[]
}

export function getNavigation(): NavItem[] {
  const nav: NavItem[] = []

  // 1) ALGORITHMS SECTION (uses custom order)
  const algoRoot = path.join(process.cwd(), 'src/app/algorithms')
  if (fs.existsSync(algoRoot)) {
    const algoChildren: NavItem[] = []

    // categories in custom order
    for (const category of categoryOrder) {
      const catDir = path.join(algoRoot, category)
      if (!fs.existsSync(catDir)) continue

      const catPageExists = fs.existsSync(path.join(catDir, 'page.tsx'))

      const topics = topicOrder[category] || []
      const topicChildren: NavItem[] = []

      // topics in custom order
      for (const topic of topics) {
        const topicDir = path.join(catDir, topic)
        if (!fs.existsSync(topicDir)) continue

        const topicPageExists = fs.existsSync(path.join(topicDir, 'page.tsx'))

        topicChildren.push({
          name: formatName(topic),
          path: topicPageExists ? `/algorithms/${category}/${topic}` : null,
          children: [],
        })
      }

      algoChildren.push({
        name: formatName(category),
        path: catPageExists ? `/algorithms/${category}` : null,
        children: topicChildren,
      })
    }

    nav.push({
      name: 'Algorithms',
      path: '/algorithms',
      children: algoChildren,
    })
  }

  // 2) DATA STRUCTURES SECTION (still filesystem order for now)
  const dsRoot = path.join(process.cwd(), 'src/app/data-structures')
  if (fs.existsSync(dsRoot)) {
    const dsChildren = walk(dsRoot, '/data-structures')

    nav.push({
      name: 'Data Structures',
      path: '/data-structures',
      children: dsChildren,
    })
  }

  return nav
}

// Generic walker used for data-structures for now
function walk(dir: string, urlBase: string): NavItem[] {
  if (!fs.existsSync(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const nav: NavItem[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const folderPath = path.join(dir, entry.name)
    const url = `${urlBase}/${entry.name}`

    const pageExists = fs.existsSync(path.join(folderPath, 'page.tsx'))
    const children = walk(folderPath, url)

    nav.push({
      name: formatName(entry.name),
      path: pageExists ? url : null,
      children,
    })
  }

  return nav
}

function formatName(name: string): string {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
