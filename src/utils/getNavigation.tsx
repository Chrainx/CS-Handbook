import fs from 'fs'
import path from 'path'
import { categoryOrder, topicOrder } from './topicOrder'

export interface NavItem {
  name: string
  path: string | null
  children: NavItem[]
}

export function getNavigation(
  rootDir: string = './src/app/algorithms'
): NavItem[] {
  const nav: NavItem[] = []

  // Loop through categories in custom order
  for (const category of categoryOrder) {
    const categoryPath = path.join(rootDir, category)

    // skip categories that don't exist
    if (!fs.existsSync(categoryPath)) continue

    // category overview page
    const categoryPageExists = fs.existsSync(
      path.join(categoryPath, 'page.tsx')
    )

    const categoryItem: NavItem = {
      name: formatName(category),
      path: categoryPageExists ? `/algorithms/${category}` : null,
      children: [],
    }

    // now add topics in custom order
    const topics = topicOrder[category] || []
    for (const topic of topics) {
      const topicPath = path.join(categoryPath, topic)

      if (!fs.existsSync(topicPath)) continue
      const topicPageExists = fs.existsSync(path.join(topicPath, 'page.tsx'))

      categoryItem.children.push({
        name: formatName(topic),
        path: topicPageExists ? `/algorithms/${category}/${topic}` : null,
        children: [],
      })
    }

    nav.push(categoryItem)
  }

  return nav
}

// Format text (e.g., "merge-sort" → "Merge Sort")
function formatName(name: string): string {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
