import NextPrev from '@/components/nextPrev'

export default function SecurityOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Security
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Security is about protecting systems and data against attackers with
        real incentives to break them. This section covers the building
        blocks (cryptography, authentication, authorization) and the common
        ways systems fail, framed around how to prevent those failures.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>
      <p className="text-(--text-secondary)">
        Nearly every security mechanism answers one of three questions: is
        this data confidential (only the intended reader can read it), is it
        unmodified (integrity), and is the party on the other end who they
        claim to be (authentication)?
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        What Will Be Covered
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Cryptography fundamentals: symmetric vs. asymmetric encryption, key exchange</li>
        <li>Hashing and integrity: hash functions, salted password hashing, HMAC</li>
        <li>TLS/HTTPS handshake and certificate chains</li>
        <li>Authentication: passwords, sessions vs. tokens, MFA</li>
        <li>Authorization: OAuth 2.0 / OIDC, role-based access control</li>
        <li>Common web vulnerabilities (XSS, CSRF, SQL injection) and how to prevent them</li>
        <li>Memory-safety vulnerabilities at a conceptual level</li>
        <li>Secure coding practices</li>
      </ul>

      <p className="mt-4 text-sm text-muted-foreground">
        This section is being built out incrementally - Cryptography
        Fundamentals and Hashing &amp; Integrity are live today, with the
        rest of the curriculum above coming in follow-up updates. All
        content here is educational and defensive in framing: how
        mechanisms and vulnerabilities work, and how to guard against them.
      </p>

      <NextPrev />
    </div>
  )
}
