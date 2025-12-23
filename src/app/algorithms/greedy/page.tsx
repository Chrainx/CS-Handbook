import NextPrev from '@/components/nextPrev'

export default function GreedyOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Greedy Algorithms
      </h1>

      <p className="mb-6 text-(--text-secondary)">
        Greedy algorithms solve problems by making a sequence of decisions,
        where each decision is chosen to be the best at the current step. Once a
        decision is made, it is not changed.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        What This Section Covers
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Problems where decisions are made step by step</li>
        <li>Algorithms that rely on locally optimal choices</li>
        <li>Scheduling, selection, and optimization problems</li>
      </ul>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        How to Read This Section
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Each algorithm in this section demonstrates a specific greedy strategy.
        The pages explain the decision rule used, how the solution is
        constructed, and the conditions under which the approach works
        correctly.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Topics in This Section
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Activity Selection</li>
        <li>Interval Scheduling</li>
        <li>Fractional Knapsack</li>
        <li>Huffman Coding</li>
        <li>Job Sequencing with Deadlines</li>
      </ul>

      <NextPrev />
    </div>
  )
}
