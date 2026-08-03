import NextPrev from '@/components/nextPrev'

export default function HashingIntegrityPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        Hashing &amp; Integrity
      </h1>

      <p className="mb-6 text-(--text-secondary)">
        Cryptography Fundamentals covered confidentiality - keeping data
        secret. Hashing solves a different problem: proving data
        hasn&apos;t been altered, without needing to keep it secret at all.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Hash Functions
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        A cryptographic hash function takes an input of any size and
        produces a fixed-size output (a <em>digest</em>) with three
        properties a general-purpose hash table function (see the Hash
        Table data structure) doesn&apos;t need to have:
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Deterministic</strong> — the same input always produces
          the same digest
        </li>
        <li>
          <strong>One-way</strong> — computing the digest from the input is
          fast, but recovering the input from the digest is computationally
          infeasible
        </li>
        <li>
          <strong>Collision-resistant</strong> — it&apos;s computationally
          infeasible to find two different inputs that produce the same
          digest
        </li>
      </ul>

      <p className="mb-6 text-(--text-secondary)">
        Even a one-bit change to the input should produce a completely
        different-looking digest (the <em>avalanche effect</em>) - this is
        what makes a hash useful for detecting tampering: publish a file
        alongside its hash, and anyone can verify the file wasn&apos;t
        modified by recomputing the hash and comparing.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Collision Resistance in Practice
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Older hash functions (MD5, SHA-1) are considered broken specifically
        because practical collisions were found for them - two different
        inputs producing the same digest, undermining the entire point of
        using a hash to detect tampering. Modern systems use SHA-256 or
        stronger, where no practical collision is known.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Salted Password Hashing
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        Storing a password as a plain hash (e.g. <code>sha256(password)</code>)
        is not secure on its own: an attacker who steals a database of
        password hashes can precompute hashes for common passwords (a{' '}
        <em>rainbow table</em>) and instantly look up matches.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        A <strong>salt</strong> - a random value generated per-user and
        stored alongside the hash - is combined with the password before
        hashing (<code>hash(password + salt)</code>). Since every
        user&apos;s salt differs, identical passwords produce different
        stored hashes, and a precomputed rainbow table becomes useless -
        the attacker would need to rebuild it per salt. Beyond salting,
        purpose-built password hashing algorithms (bcrypt, scrypt, Argon2)
        are also deliberately slow and memory-hard, making brute-force
        guessing expensive even at scale - a general-purpose fast hash like
        SHA-256 is the wrong tool for password storage precisely because
        speed helps the attacker, not the defender.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        HMAC
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        A plain hash proves data wasn&apos;t altered, but anyone can compute
        a hash - it doesn&apos;t prove who sent the data. An{' '}
        <strong>HMAC</strong> (Hash-based Message Authentication Code) combines
        a hash function with a secret key shared between sender and
        receiver, so only someone holding that key could have produced a
        valid HMAC for a given message. This is what lets a receiver verify
        both that a message is unaltered <em>and</em> that it genuinely came
        from someone holding the shared secret - the same building block
        used inside the TLS handshake covered next in this section.
      </p>

      <NextPrev />
    </div>
  )
}
