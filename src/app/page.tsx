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
          <CategoryCard
            title="Algorithms"
            href="/algorithms"
            description="Sorting, searching, graph algorithms, dynamic programming."
          />
          <CategoryCard
            title="Data Structures"
            href="/data-structures"
            description="Arrays, trees, heaps, hash tables, graphs."
          />
          <CategoryCard
            title="Operating Systems"
            href="/operating-systems"
            description="Processes, threads, memory, scheduling."
          />
          <CategoryCard
            title="Networks"
            href="/networks"
            description="TCP/IP, routing, congestion control."
          />
          <CategoryCard
            title="Security"
            href="/security"
            description="TLS, encryption, attacks, firewalls."
          />
          <CategoryCard
            title="Machine Learning"
            href="/machine-learning"
            description="Regression, classification, deep learning."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-10 text-sm">
        Built with Next.js & Tailwind — by Fredy.
      </footer>
    </div>
  )
}

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
