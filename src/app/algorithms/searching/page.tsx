import NextPrev from '@/components/nextPrev'

export default function SearchingOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-(--text-main)">
        Searching Algorithms
      </h1>

      <p className="text-(--text-secondary)">
        Searching is the process of finding the position of a target element
        within a collection of data. Efficient searching is essential for
        performance, especially when working with large datasets.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Why Searching Matters
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Retrieves information quickly from large datasets</li>
        <li>Used as a core operation in databases and indexing</li>
        <li>Often combined with sorting for efficiency</li>
        <li>Fundamental to many higher-level algorithms</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Types of Searching
      </h2>

      <p className="text-(--text-secondary)">
        Searching algorithms can be categorized based on assumptions about the
        data and the strategy they use:
      </p>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>
          <strong>Linear search:</strong> No assumptions about data order, scans
          elements one by one
        </li>
        <li>
          <strong>Binary search:</strong> Requires sorted data, repeatedly
          halves the search space
        </li>
        <li>
          <strong>Graph search:</strong> Explores nodes and edges (covered in
          the Graph section)
        </li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Binary Search at a Glance
      </h2>

      <p className="text-(--text-secondary)">
        Binary Search is the most important searching algorithm when working
        with sorted arrays. By eliminating half of the remaining elements at
        each step, it achieves logarithmic time complexity.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Comparison Overview
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-(--border-soft) text-(--text-secondary)">
          <thead className="bg-(--code-bg)">
            <tr>
              <th className="border px-3 py-2 text-left">Algorithm</th>
              <th className="border px-3 py-2">Time</th>
              <th className="border px-3 py-2">Requires Sorted Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">Linear Search</td>
              <td className="border px-3 py-2">O(n)</td>
              <td className="border px-3 py-2">No</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Binary Search</td>
              <td className="border px-3 py-2">O(log n)</td>
              <td className="border px-3 py-2">Yes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Choosing the Right Approach
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>
          Use <strong>Linear Search</strong> when data is unsorted or very small
        </li>
        <li>
          Use <strong>Binary Search</strong> when data is sorted and fast lookup
          is required
        </li>
        <li>Sort the data first if multiple searches are needed</li>
      </ul>

      <NextPrev />
    </div>
  )
}
