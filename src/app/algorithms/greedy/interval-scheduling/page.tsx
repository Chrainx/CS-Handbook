import NextPrev from '@/components/nextPrev'

export default function IntervalSchedulingPage() {
  return (
    <div>
      {/* Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Interval Scheduling
      </h1>

      {/* Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        Interval Scheduling selects a set of non-overlapping intervals from a
        given collection such that the total number of selected intervals is
        maximized.
      </p>

      {/* Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        Intervals are chosen in an order that leaves as much room as possible
        for future selections. By selecting the interval that ends earliest, the
        remaining timeline can accommodate more intervals afterward.
      </p>

      {/* Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function intervalScheduling(intervals):
    sort intervals by end time

    selected = []
    currentEnd = -infinity

    for each interval in intervals:
        if interval.start >= currentEnd:
            selected.append(interval)
            currentEnd = interval.end

    return selected`}
      </pre>

      {/* Complexity */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O(n log n) due to sorting</li>
        <li>Space Complexity: O(1) excluding output</li>
      </ul>

      {/* When to Be Used */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Be Used
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>When scheduling tasks with start and end times</li>
        <li>When selecting the maximum number of non-overlapping intervals</li>
        <li>When only one interval can be processed at a time</li>
        <li>When intervals cannot be split or reordered</li>
      </ul>

      <NextPrev />
    </div>
  )
}
