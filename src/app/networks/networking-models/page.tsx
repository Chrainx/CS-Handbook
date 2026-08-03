import NextPrev from '@/components/nextPrev'

export default function NetworkingModelsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        Networking Models
      </h1>

      <p className="mb-6 text-(--text-secondary)">
        Networking is organized in layers so each one only has to solve a
        single problem, using services provided by the layer below and
        offering services to the layer above. Two layering models are
        commonly referenced: the theoretical <strong>OSI model</strong>{' '}
        (7 layers) and the practical <strong>TCP/IP model</strong> (4
        layers) that the real internet actually runs on.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        The OSI Model (7 Layers)
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>7. Application</strong> — user-facing protocols (HTTP, DNS)
        </li>
        <li>
          <strong>6. Presentation</strong> — data formatting, encryption,
          compression
        </li>
        <li>
          <strong>5. Session</strong> — managing connections/sessions between
          applications
        </li>
        <li>
          <strong>4. Transport</strong> — end-to-end delivery (TCP, UDP)
        </li>
        <li>
          <strong>3. Network</strong> — logical addressing and routing (IP)
        </li>
        <li>
          <strong>2. Data Link</strong> — node-to-node delivery on the same
          physical link (Ethernet, MAC addresses)
        </li>
        <li>
          <strong>1. Physical</strong> — raw bits over a physical medium
          (cables, radio signals)
        </li>
      </ul>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        The TCP/IP Model (4 Layers)
      </h2>

      <p className="mb-2 text-(--text-secondary)">
        The internet in practice collapses OSI&apos;s 7 layers into 4, since
        several of OSI&apos;s distinctions (Session, Presentation) are rarely
        implemented as separate protocol layers:
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Application</strong> — HTTP, DNS, and other user-facing
          protocols (OSI layers 5-7 combined)
        </li>
        <li>
          <strong>Transport</strong> — TCP, UDP (same as OSI layer 4)
        </li>
        <li>
          <strong>Internet</strong> — IP addressing and routing (same as OSI
          layer 3)
        </li>
        <li>
          <strong>Link</strong> — physical transmission and local delivery
          (OSI layers 1-2 combined)
        </li>
      </ul>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Encapsulation
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        As data moves down the stack on the sending side, each layer wraps
        the data from the layer above with its own header (and sometimes a
        trailer): application data becomes a TCP segment, which becomes an IP
        packet, which becomes an Ethernet frame. The receiving side unwraps
        these headers in reverse order, one layer at a time, until only the
        original application data remains - this wrapping/unwrapping is
        called <strong>encapsulation</strong>, and it&apos;s what lets each
        layer stay ignorant of how the layers around it are implemented.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Why the Layering Matters
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Because layers only depend on the interface exposed by the layer
        below, they can evolve independently: Wi-Fi replaced Ethernet cables
        at the link layer without changing IP; HTTP/2 and HTTP/3 changed how
        the application layer behaves without changing TCP or IP underneath.
        This separation of concerns is the same reason the rest of this
        section can discuss addressing, routing, and transport-layer
        reliability as mostly-independent topics.
      </p>

      <NextPrev />
    </div>
  )
}
