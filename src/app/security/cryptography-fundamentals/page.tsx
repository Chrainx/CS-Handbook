import NextPrev from '@/components/nextPrev'

export default function CryptographyFundamentalsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        Cryptography Fundamentals
      </h1>

      <p className="mb-6 text-(--text-secondary)">
        Cryptography lets two parties communicate confidentially over a
        channel an attacker can observe, and lets a receiver verify that a
        message came from who it claims and wasn&apos;t altered in transit.
        Nearly every mechanism in this section builds on two core
        approaches: symmetric and asymmetric encryption.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Symmetric Encryption
      </h2>

      <p className="mb-2 text-(--text-secondary)">
        Both parties share the <strong>same secret key</strong>, used both to
        encrypt and decrypt. Modern algorithms like AES are fast and secure,
        but the hard problem symmetric encryption doesn&apos;t solve is:{' '}
        <em>how do two parties who&apos;ve never met agree on a shared
        secret key in the first place</em>, without an eavesdropper
        capturing it?
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Fast - suitable for encrypting large amounts of data</li>
        <li>Same key encrypts and decrypts, so the key itself must stay secret</li>
        <li>Doesn&apos;t solve key distribution on its own</li>
      </ul>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Asymmetric (Public-Key) Encryption
      </h2>

      <p className="mb-2 text-(--text-secondary)">
        Each party has a <strong>key pair</strong>: a public key that can be
        shared with anyone, and a private key that never leaves their
        possession. Data encrypted with the public key can only be decrypted
        with the matching private key. This solves the key-distribution
        problem symmetric encryption has - the public key can be shared
        openly - but asymmetric algorithms (like RSA) are much slower than
        symmetric ones, which is why they&apos;re rarely used to encrypt bulk
        data directly.
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Public key can be shared openly - no secure channel needed to distribute it</li>
        <li>Private key never needs to be transmitted anywhere</li>
        <li>Much slower than symmetric encryption - typically used to exchange a symmetric key, not to encrypt the actual data</li>
      </ul>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Key Exchange (Diffie-Hellman, Conceptually)
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        In practice, systems combine both: use asymmetric cryptography (or a
        dedicated key-exchange algorithm like Diffie-Hellman) just once, to
        let two parties agree on a shared secret over an insecure channel -
        then switch to fast symmetric encryption using that shared secret
        for the rest of the conversation. Diffie-Hellman achieves this
        through a clever mathematical trick: each side combines their own
        secret with a public value from the other side, in a way where both
        sides land on the same shared result, but an eavesdropper who only
        sees the public values exchanged cannot feasibly compute that same
        result. This exact &quot;asymmetric handshake, then symmetric bulk
        transfer&quot; pattern is precisely what happens in a TLS/HTTPS
        handshake - covered next in this section.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Why This Matters
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Almost every secure system you interact with - HTTPS, SSH, encrypted
        messaging - is built from this same combination: asymmetric
        cryptography to solve the key-distribution problem, symmetric
        cryptography for fast bulk encryption once a shared key exists.
        Recognizing that pattern makes the rest of this section&apos;s
        topics (hashing, TLS, authentication) much easier to reason about.
      </p>

      <NextPrev />
    </div>
  )
}
