import fs from 'fs'
import path from 'path'
import { categoryOrder, topicOrder, Category } from './topicOrder'

export interface NavItem {
  name: string
  displayName: string
  path: string | null
  children: NavItem[]
}

const APP_ROOT = path.join(process.cwd(), 'src/app')

export function getNavigation(): NavItem[] {
  return buildTree(APP_ROOT, '')
}

/* ---------------------------------- */
/* Core recursive builder              */
/* ---------------------------------- */

function buildTree(dir: string, baseUrl: string): NavItem[] {
  if (!fs.existsSync(dir)) return []

  const folders = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (e) =>
        e.isDirectory() && !e.name.startsWith('[') && !e.name.startsWith('(')
    )
    .map((e) => e.name)

  const ordered = applyOrdering(folders, baseUrl)

  return ordered.map((folder) => {
    const fullDir = path.join(dir, folder)
    const url = baseUrl ? `${baseUrl}/${folder}` : `/${folder}`
    const hasPage = fs.existsSync(path.join(fullDir, 'page.tsx'))

    return {
      name: formatName(folder),
      displayName: getDisplayName(folder),
      path: hasPage ? url : null,
      children: buildTree(fullDir, url),
    }
  })
}

/* ---------------------------------- */
/* Ordering logic (pluggable)          */
/* ---------------------------------- */

function applyOrdering(folders: string[], baseUrl: string): string[] {
  // root level
  if (baseUrl === '') {
    return mergeOrder(folders, ['algorithms', 'data-structures'])
  }

  // algorithms categories
  if (baseUrl === '/algorithms') {
    return mergeOrder(folders, categoryOrder)
  }

  // algorithm topics
  const match = baseUrl.match(/^\/algorithms\/([^/]+)$/)
  if (match) {
    const category = match[1] as Category
    const desired = topicOrder[category]
    if (desired) {
      return mergeOrder(folders, desired)
    }
  }

  // default: alphabetical
  return [...folders].sort()
}

function mergeOrder(actual: string[], desired: string[]): string[] {
  const ordered = desired.filter((x) => actual.includes(x))
  const extras = actual.filter((x) => !desired.includes(x)).sort()
  return [...ordered, ...extras]
}

/* ---------------------------------- */
/* Naming helpers                      */
/* ---------------------------------- */

function getDisplayName(slug: string): string {
  switch (slug) {
    case 'dynamic-programming':
      return 'DP'
    case 'longest-increasing-subsequence':
      return 'LIS'
    case 'longest-common-subsequence':
      return 'LCS'
    default:
      return formatName(slug)
  }
}

function formatName(name: string): string {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
