import NextPrev from '@/components/nextPrev'

export default function OperatingSystemsOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Operating Systems
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        An operating system manages a computer&apos;s hardware and provides
        the services that every program relies on: running multiple programs
        at once, sharing memory safely between them, and coordinating access
        to disks, files, and devices.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>
      <p className="text-(--text-secondary)">
        Most OS topics come down to managing a scarce, shared resource - CPU
        time, memory, or disk - fairly and efficiently between competing
        programs, while keeping them isolated from each other.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        What Will Be Covered
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Processes &amp; threads, and the cost of context switching</li>
        <li>CPU scheduling algorithms (FCFS, SJF, Round Robin, Priority)</li>
        <li>Process synchronization: race conditions, mutexes, semaphores</li>
        <li>Classic synchronization problems (Producer-Consumer, Dining Philosophers)</li>
        <li>Deadlocks: conditions, prevention, avoidance, and detection</li>
        <li>Memory management: paging and segmentation</li>
        <li>Virtual memory and page replacement policies</li>
        <li>File systems and disk scheduling</li>
      </ul>

      <p className="mt-4 text-sm text-muted-foreground">
        This section is being built out incrementally - Processes &amp;
        Threads is live today, with the rest of the curriculum above coming
        in follow-up updates.
      </p>

      <NextPrev />
    </div>
  )
}
