import NextPrev from '@/components/nextPrev'

export default function AddressingPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        Addressing
      </h1>

      <p className="mb-6 text-(--text-secondary)">
        Every device on a network needs a unique address so packets know
        where to go - the internet layer&apos;s job (see Networking Models).
        IP addressing schemes define how those addresses are structured and
        how a router decides where a given address should be routed to.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        IPv4
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        An IPv4 address is 32 bits, written as four decimal numbers
        (0-255) separated by dots - e.g. <code>192.168.1.10</code>. That
        gives roughly 4.3 billion possible addresses, which sounded like a
        lot in the 1980s and has since run out for the public internet -
        the practical reason IPv6 exists.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Subnetting
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        An IP address is split into a <strong>network portion</strong>{' '}
        (identifying which network a device belongs to) and a{' '}
        <strong>host portion</strong> (identifying the specific device
        within that network). A <strong>subnet mask</strong> marks where
        that split happens - e.g. <code>255.255.255.0</code> means the
        first 24 bits are the network portion and the last 8 bits identify
        the host.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        Subnetting - splitting a large network into smaller subnetworks -
        exists so routers only need to know how to reach a subnet as a
        whole, not every individual device inside it, and so an
        organization can isolate and separately manage different parts of
        its network (e.g. one subnet per office floor).
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        CIDR Notation
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        CIDR (Classless Inter-Domain Routing) notation writes the network
        portion&apos;s size directly as a suffix - <code>192.168.1.0/24</code>{' '}
        means the first 24 bits are the network portion, equivalent to a{' '}
        <code>255.255.255.0</code> subnet mask. The <code>/24</code> leaves
        8 bits for hosts, or 2⁸ = 256 addresses (254 usable, since the first
        and last are reserved for the network address and broadcast
        address). A smaller suffix means a bigger network: <code>/16</code>{' '}
        leaves 16 host bits (65,536 addresses), <code>/8</code> leaves 24
        (16.7 million).
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        IPv6
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        IPv6 addresses are 128 bits, written as eight groups of four hex
        digits separated by colons - e.g.{' '}
        <code>2001:0db8:0000:0000:0000:ff00:0042:8329</code>, often
        shortened by dropping leading zeros in a group and collapsing one
        run of all-zero groups with <code>::</code> (e.g.{' '}
        <code>2001:db8::ff00:42:8329</code>). 128 bits gives an
        astronomically larger address space than IPv4&apos;s 32 - enough
        that every device can plausibly have a unique public address
        without the address-exhaustion pressure that drove IPv4 toward
        widespread NAT (Network Address Translation) use.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Public vs. Private Addresses
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Certain IPv4 ranges (like <code>192.168.0.0/16</code> and{' '}
        <code>10.0.0.0/8</code>) are reserved as <strong>private</strong> -
        not routable on the public internet, reusable identically inside
        any number of private networks (most home routers use one of
        these ranges internally). A NAT device at the network&apos;s edge
        translates between these private addresses and a single public
        address, which is both how most home networks share one public IP
        among many devices and one of the practical workarounds that
        stretched IPv4&apos;s limited address space for decades.
      </p>

      <NextPrev />
    </div>
  )
}
