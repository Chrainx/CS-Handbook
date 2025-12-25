export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">CS Handbook</h1>
        <p className="text-xl text-gray-600">
          A comprehensive collection of algorithms, data structures, systems,
          and computer science knowledge — explained clearly by me.
        </p>
      </section>

      {/* Category grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>

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

          {/* Coming soon */}
          <ComingSoonCard
            title="Operating Systems"
            description="Processes, threads, memory management, scheduling."
          />
          <ComingSoonCard
            title="Networks"
            description="TCP/IP, routing, congestion control, protocols."
          />
          <ComingSoonCard
            title="Security"
            description="Cryptography, TLS, attacks, system security."
          />
          <ComingSoonCard
            title="Machine Learning"
            description="Regression, classification, neural networks."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-10 text-sm">
        Built with Next.js & Tailwind — by Fredy
      </footer>
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
    <a
      href={href}
      className="block p-6 border border-(--border-soft) rounded-xl hover:shadow-md transition bg-(--bg)"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </a>
  )
}

function ComingSoonCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="p-6 border border-dashed border-(--border-soft) rounded-xl bg-(--bg) opacity-70 cursor-not-allowed">
      <h3 className="text-xl font-semibold mb-2">
        {title}{' '}
        <span className="ml-2 text-xs text-gray-400 align-middle">
          (Coming soon)
        </span>
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
