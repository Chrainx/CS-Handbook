import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4 tracking-tight text-foreground">
          CS Handbook
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          An interactive computer science handbook covering core concepts across
          algorithms, data structures, systems, and more, with clear
          explanations and step-by-step visualizations.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Built and expanded incrementally as a personal learning and reference
          project.
        </p>
      </section>

      {/* Category grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active categories */}
          <CategoryCard
            title="Algorithms"
            href="/algorithms"
            description="Sorting, searching, graph algorithms, dynamic programming."
          />
          <CategoryCard
            title="Data Structures"
            href="/data-structures"
            description="Arrays, linked lists, stacks, queues, trees, graphs."
          />

          <CategoryCard
            title="Operating Systems"
            href="/operating-systems"
            description="Processes, threads, memory management, scheduling."
          />
          <CategoryCard
            title="Networks"
            href="/networks"
            description="TCP/IP, routing, congestion control, protocols."
          />
          <CategoryCard
            title="Security"
            href="/security"
            description="Cryptography, TLS, attacks, system security."
          />
          <CategoryCard
            title="Machine Learning"
            href="/machine-learning"
            description="Regression, classification, neural networks."
          />
        </div>
      </section>
    </div>
  )
}

/* =========================
   Components
   ========================= */

function CategoryCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="block p-6 rounded-xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
    >
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  )
}
