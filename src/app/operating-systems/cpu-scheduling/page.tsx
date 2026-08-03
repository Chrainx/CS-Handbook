import NextPrev from '@/components/nextPrev'

export default function CpuSchedulingPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        CPU Scheduling
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        When multiple processes are ready to run, the OS scheduler decides
        which one gets the CPU next. Different scheduling algorithms make
        that decision differently, trading off fairness, responsiveness, and
        overall throughput.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        Two metrics come up constantly when comparing algorithms:{' '}
        <strong>waiting time</strong> (how long a process sits in the ready
        queue before running) and <strong>turnaround time</strong> (total
        time from arrival to completion, including any waiting).
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        First-Come, First-Served (FCFS)
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Processes run strictly in arrival order, with no preemption - once a
        process starts, it runs to completion. Simple to implement, but a
        single long process at the front of the queue delays every process
        behind it (the <em>convoy effect</em>), even if they&apos;d only need
        a moment of CPU time.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Shortest Job First (SJF)
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        Always runs whichever ready process has the shortest remaining burst
        time. Provably minimizes average waiting time among non-preemptive
        algorithms, but requires knowing (or estimating) how long each
        process will run - not always available in practice.
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Non-preemptive SJF</strong> — once started, a process runs
          to completion even if a shorter job arrives
        </li>
        <li>
          <strong>Preemptive SJF (Shortest Remaining Time First)</strong> — a
          newly-arrived process with a shorter remaining burst interrupts
          the currently running one
        </li>
      </ul>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Round Robin
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Each process gets a fixed <strong>time quantum</strong>; if it
        hasn&apos;t finished when its quantum expires, it&apos;s preempted
        and moved to the back of the ready queue. Designed for fairness and
        responsiveness in time-sharing systems - a very small quantum makes
        the system feel responsive but wastes time on context switches
        (see Processes &amp; Threads); a very large quantum degrades toward
        FCFS.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Priority Scheduling
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Each process is assigned a priority, and the scheduler always runs
        the highest-priority ready process. The major risk is{' '}
        <strong>starvation</strong>: a low-priority process can wait
        indefinitely if higher-priority processes keep arriving. The
        standard fix is <strong>aging</strong> - gradually increasing a
        waiting process&apos;s priority the longer it sits in the queue, so
        it&apos;s eventually guaranteed to run.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Multilevel Queue &amp; Multilevel Feedback Queue
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        A <strong>multilevel queue</strong> splits the ready queue into
        separate queues by process category (e.g. interactive vs. batch),
        each with its own scheduling algorithm and relative priority -
        simple, but a process is permanently assigned to one queue.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        A <strong>multilevel feedback queue</strong> improves on this by
        letting processes move between queues based on observed behavior: a
        process that uses its full time quantum repeatedly gets demoted
        toward lower-priority, longer-quantum queues (it&apos;s probably
        CPU-bound), while one that frequently gives up the CPU early (e.g.
        waiting on I/O) stays at higher priority - approximating SJF-like
        behavior without needing to know burst times in advance.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Comparing the Algorithms
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>FCFS: simple, but prone to the convoy effect</li>
        <li>SJF/SRTF: optimal average waiting time, but needs burst-time knowledge</li>
        <li>Round Robin: fair and responsive, tuned by quantum size</li>
        <li>Priority: flexible, but needs aging to avoid starvation</li>
        <li>Multilevel Feedback Queue: adapts to process behavior automatically, at the cost of more tuning parameters</li>
      </ul>

      <p className="mb-6 text-(--text-secondary)">
        Real operating systems (Linux&apos;s Completely Fair Scheduler, for
        instance) borrow ideas from several of these rather than
        implementing any one algorithm exactly as described above.
      </p>

      <NextPrev />
    </div>
  )
}
