import fs from 'fs'
import path from 'path'

export interface NavItem {
  name: string
  path: string | null
  children: NavItem[]
}

export function getNavigation(rootDir: string = './src/app'): NavItem[] {
  const ignore = [
    'components',
    'styles',
    'globals.css',
    'layout.tsx',
    'page.tsx',
    'favicon.ico',
  ]

  function walk(dir: string, basePath: string = ''): NavItem[] {
    const fullPath = path.join(process.cwd(), dir)
    const entries = fs.readdirSync(fullPath, { withFileTypes: true })

    const nav: NavItem[] = []

    for (const entry of entries) {
      if (ignore.includes(entry.name)) continue

      const entryPath = path.join(dir, entry.name)
      const urlPath = '/' + path.join(basePath, entry.name)

      if (entry.isDirectory()) {
        const pageExists = fs.existsSync(
          path.join(fullPath, entry.name, 'page.tsx')
        )

        const children = walk(entryPath, path.join(basePath, entry.name))

        nav.push({
          name: formatName(entry.name),
          path: pageExists ? urlPath : null,
          children,
        })
      }
    }

    return nav
  }

  return walk(rootDir)
}

function formatName(name: string): string {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
