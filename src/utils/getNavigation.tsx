import fs from 'fs'
import path from 'path'
import { categoryOrder, topicOrder, Category } from './topicOrder'

export interface NavItem {
  name: string
  path: string | null
  children: NavItem[]
}

export function getNavigation(): NavItem[] {
  const nav: NavItem[] = []

  // Algorithms
  const algoRoot = path.join(process.cwd(), 'src/app/algorithms')
  if (fs.existsSync(algoRoot)) {
    nav.push(buildAlgorithms(algoRoot))
  }

  // Data Structures
  const dsRoot = path.join(process.cwd(), 'src/app/data-structures')
  if (fs.existsSync(dsRoot)) {
    nav.push({
      name: 'Data Structures',
      path: fs.existsSync(path.join(dsRoot, 'page.tsx'))
        ? '/data-structures'
        : null,
      children: walk(dsRoot, '/data-structures'),
    })
  }

  return nav
}

function buildAlgorithms(algoRoot: string): NavItem {
  const existing = listDirs(algoRoot)

  const ordered = categoryOrder.filter((c) => existing.includes(c))

  const categorySet = new Set(categoryOrder)
  const extras = existing.filter((c) => !categorySet.has(c as Category)).sort()

  const categories = [...ordered, ...extras].map((category) => {
    const catDir = path.join(algoRoot, category)
    const catUrl = `/algorithms/${category}`
    const hasPage = fs.existsSync(path.join(catDir, 'page.tsx'))

    const topicDirs = listDirs(catDir)
    const desired = topicOrder[category as Category] ?? []

    const orderedTopics = desired.filter((t) => topicDirs.includes(t))
    const extraTopics = topicDirs.filter((t) => !desired.includes(t)).sort()

    const children: NavItem[] = [...orderedTopics, ...extraTopics].map(
      (topic) => {
        const tDir = path.join(catDir, topic)
        const tUrl = `${catUrl}/${topic}`
        const tHasPage = fs.existsSync(path.join(tDir, 'page.tsx'))

        return {
          name: formatName(topic),
          path: tHasPage ? tUrl : null,
          children: walk(tDir, tUrl),
        }
      }
    )

    return {
      name: formatName(category),
      path: hasPage ? catUrl : null,
      children,
    }
  })

  const algoHasPage = fs.existsSync(path.join(algoRoot, 'page.tsx'))

  return {
    name: 'Algorithms',
    path: algoHasPage ? '/algorithms' : null,
    children: categories,
  }
}

function walk(dir: string, baseUrl: string): NavItem[] {
  if (!fs.existsSync(dir)) return []

  const entries = fs.readdirSync(dir, { withFileTypes: true })

  return entries
    .filter((e) => e.isDirectory())
    .map((entry) => {
      const fullDir = path.join(dir, entry.name)
      const url = `${baseUrl}/${entry.name}`
      const hasPage = fs.existsSync(path.join(fullDir, 'page.tsx'))

      return {
        name: formatName(entry.name),
        path: hasPage ? url : null,
        children: walk(fullDir, url),
      }
    })
}

function listDirs(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
}

function formatName(name: string) {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
