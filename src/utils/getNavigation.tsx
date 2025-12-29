import fs from 'fs'
import path from 'path'
import { sections } from './section'

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
    const root = Object.values(sections).map((s) => s.path.replace('/', ''))
    return mergeOrder(folders, root)
  }

  const section = Object.values(sections).find(
    (s) => baseUrl === s.path || baseUrl.startsWith(s.path + '/')
  )
  if (!section) return [...folders].sort()

  // section root
  if (baseUrl === section.path) {
    return mergeOrder(folders, section.order)
  }

  // deeper level (e.g. /algorithms/sorting)
  const rest = baseUrl.slice(section.path.length + 1)
  const key = rest.split('/')[0]

  const subOrder = section.subOrder?.[key]
  const hidden = section.hiddenSubOrder?.[key] ?? []

  // ⛔ remove hidden folders first
  const visibleFolders = folders.filter((folder) => !hidden.includes(folder))

  if (subOrder) {
    return mergeOrder(visibleFolders, subOrder)
  }

  return [...visibleFolders].sort()
}

function mergeOrder(
  actual: readonly string[],
  desired: readonly string[]
): string[] {
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
