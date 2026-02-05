This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or# CS Handbook

CS Handbook is an **interactive computer science reference** designed to help understand
core CS concepts through **clear explanations** and **step-by-step visualizations**.

It serves both as:
- a **personal learning handbook**
- a **structured reference** for algorithms, data structures, and systems concepts

The project emphasizes **conceptual clarity**, **correctness**, and **visual intuition**.

---

## ✨ Features

- 📚 Structured explanations for core computer science topics
- 🧠 Greedy, graph, and sorting algorithm breakdowns
- 🎨 Step-by-step visualizations for selected algorithms
- 🧭 Sidebar navigation with searchable topic tree
- 🔁 Consistent layout with global header, banner, and footer
- 🧪 Designed as a long-term, incrementally expanded knowledge base

---

## 🗂️ Current Sections

- **Algorithms**
  - Greedy algorithms (e.g. Fractional Knapsack)
  - Sorting algorithms
  - Graph algorithms (BFS, DFS, shortest paths, etc.)

- **Data Structures**
  - Arrays, stacks, queues
  - Trees and graphs

- **Coming Soon**
  - Operating Systems
  - Computer Networks
  - Security
  - Machine Learning

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS
- **State & Navigation:** React hooks + custom navigation tree
- **Versioning:** Semantic Versioning (automated)
- **Release Automation:** semantic-release + GitHub Actions

---

## 🔖 Versioning & Releases

This project follows **Semantic Versioning**:


bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Version Details

Version updates are **fully automated** based on commit messages using
**Conventional Commits**:

| Commit type                    | Version bump |
| ------------------------------ | ------------ |
| `fix:`                         | Patch        |
| `feat:`                        | Minor        |
| `feat!:` or `BREAKING CHANGE:` | Major        |

Releases automatically:

- update `package.json`
- generate git tags
- update `CHANGELOG.md`

The current version is displayed directly in the UI footer.

---
