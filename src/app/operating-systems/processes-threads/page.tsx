import NextPrev from '@/components/nextPrev'

export default function ProcessesThreadsPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        Processes &amp; Threads
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        A <strong>process</strong> is a program in execution: its code, its
        own private memory (stack, heap, data), and the OS bookkeeping needed
        to run and eventually stop it. A <strong>thread</strong> is a unit of
        execution *within* a process - a process always has at least one, and
        can have many that share the same memory space.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Process Lifecycle
      </h2>

      <p className="mb-2 text-(--text-secondary)">
        Every process moves through a small set of states as the OS scheduler
        decides which process gets the CPU next:
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>New</strong> — the process is being created
        </li>
        <li>
          <strong>Ready</strong> — waiting for the CPU, could run immediately
        </li>
        <li>
          <strong>Running</strong> — currently executing on the CPU
        </li>
        <li>
          <strong>Waiting (Blocked)</strong> — waiting on I/O or an event
          (e.g. disk read, network response)
        </li>
        <li>
          <strong>Terminated</strong> — finished execution, awaiting cleanup
        </li>
      </ul>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Process Control Block (PCB)
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        The OS tracks each process using a Process Control Block: process ID,
        current state, saved CPU register values, program counter, memory
        allocation info, and open file handles. When the OS switches from one
        process to another, it saves the running process&apos;s registers
        into its PCB and loads the next process&apos;s saved registers - this
        save-and-restore is what a <strong>context switch</strong> actually
        does.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Threads vs. Processes
      </h2>

      <p className="mb-2 text-(--text-secondary)">
        Threads within the same process share the process&apos;s memory
        (heap, global/static data, open files), but each thread keeps its own
        stack, registers, and program counter. This has real consequences:
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          Creating a thread is cheaper than creating a process - no new
          address space needs to be set up
        </li>
        <li>
          Switching between threads of the same process is cheaper than
          switching between processes, since shared memory mappings don&apos;t
          need to change
        </li>
        <li>
          Threads can communicate directly through shared memory, but that
          same sharing is what makes race conditions possible - covered in
          Process Synchronization, later in this section
        </li>
        <li>
          A crash in one thread (e.g. an unhandled fault) can bring down the
          whole process, since they share the same address space; a crash in
          one process does not affect other processes, which are isolated
        </li>
      </ul>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Context Switching Cost
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Context switches are not free: saving/restoring registers, flushing
        or reloading CPU caches and the TLB (translation lookaside buffer),
        and updating the memory management unit&apos;s page tables all take
        time the CPU could otherwise spend running code. This is why
        schedulers try to balance responsiveness (switching often enough that
        no process waits too long) against throughput (not switching so often
        that overhead dominates) - the exact trade-off explored next, in CPU
        Scheduling.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Key Characteristics
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Processes provide isolation at the cost of heavier creation and
        switching; threads provide cheap concurrency at the cost of shared
        state that must be synchronized carefully. Most real programs use
        both: multiple processes for isolation between unrelated programs,
        and multiple threads within a process for concurrency between related
        tasks.
      </p>

      <NextPrev />
    </div>
  )
}
