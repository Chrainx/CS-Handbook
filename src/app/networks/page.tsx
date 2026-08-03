import NextPrev from '@/components/nextPrev'

export default function NetworksOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Networks
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Computer networks let independent machines exchange data reliably
        over links that can lose, reorder, or delay packets. Most networking
        topics are really about building predictable behavior on top of an
        unreliable, shared medium.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>
      <p className="text-(--text-secondary)">
        Networking is organized in layers, each solving one problem
        (addressing, routing, reliable delivery, application protocols) and
        exposing a simple interface to the layer above - so higher layers
        don&apos;t need to know how lower layers work.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        What Will Be Covered
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Networking models: OSI vs. TCP/IP layering, encapsulation</li>
        <li>Addressing: IPv4/IPv6, subnetting, CIDR notation</li>
        <li>Routing fundamentals and routing algorithms (cross-linking the existing Dijkstra/Bellman-Ford graph visualizers)</li>
        <li>Transport layer: TCP (handshake, reliability, flow control) and UDP</li>
        <li>Congestion control</li>
        <li>DNS resolution</li>
        <li>HTTP/HTTPS</li>
      </ul>

      <p className="mt-4 text-sm text-muted-foreground">
        This section is being built out incrementally - Networking Models is
        live today, with the rest of the curriculum above coming in
        follow-up updates.
      </p>

      <NextPrev />
    </div>
  )
}
