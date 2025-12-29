import NextPrev from '@/components/nextPrev'

export default function SortingOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-(--text-main)">
        Sorting Algorithms
      </h1>

      <p className="text-(--text-secondary)">
        Sorting is the process of arranging elements in a specific order,
        usually ascending or descending. Efficient sorting is a fundamental
        building block in computer science and is used to optimize searching,
        data processing, and algorithm design.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Why Sorting Matters
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Enables faster searching (e.g. binary search)</li>
        <li>Improves data organization and readability</li>
        <li>Used as a subroutine in many algorithms</li>
        <li>Helps reveal patterns in data</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Categories of Sorting Algorithms
      </h2>

      <p className="text-(--text-secondary)">
        Sorting algorithms can be broadly categorized based on their strategy
        and performance characteristics:
      </p>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>
          <strong>Simple sorts:</strong> Insertion Sort, Selection Sort (easy to
          implement, inefficient for large inputs)
        </li>
        <li>
          <strong>Divide and conquer sorts:</strong> Merge Sort, Quick Sort
          (efficient for large datasets)
        </li>
        {/* <li>
          <strong>Heap-based sorts:</strong> Heap Sort (guaranteed performance,
          in-place)
        </li> */}
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Comparison Overview
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-(--border-soft) text-(--text-secondary)">
          <thead className="bg-(--code-bg)">
            <tr>
              <th className="border px-3 py-2 text-left">Algorithm</th>
              <th className="border px-3 py-2">Time</th>
              <th className="border px-3 py-2">Space</th>
              <th className="border px-3 py-2">Stable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">Insertion Sort</td>
              <td className="border px-3 py-2">O(n²)</td>
              <td className="border px-3 py-2">O(1)</td>
              <td className="border px-3 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Selection Sort</td>
              <td className="border px-3 py-2">O(n²)</td>
              <td className="border px-3 py-2">O(1)</td>
              <td className="border px-3 py-2">No</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Merge Sort</td>
              <td className="border px-3 py-2">O(n log n)</td>
              <td className="border px-3 py-2">O(n)</td>
              <td className="border px-3 py-2">Yes</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">Quick Sort</td>
              <td className="border px-3 py-2">O(n log n)*</td>
              <td className="border px-3 py-2">O(log n)</td>
              <td className="border px-3 py-2">No</td>
            </tr>
            {/* <tr>
              <td className="border px-3 py-2">Heap Sort</td>
              <td className="border px-3 py-2">O(n log n)</td>
              <td className="border px-3 py-2">O(1)</td>
              <td className="border px-3 py-2">No</td>
            </tr> */}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-(--text-secondary)">
        * Quick Sort has O(n²) worst-case time, but performs well in practice.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Choosing the Right Algorithm
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>
          Use <strong>Insertion Sort</strong> for small or nearly sorted data
        </li>
        <li>
          Use <strong>Merge Sort</strong> when stability is required
        </li>
        <li>
          Use <strong>Quick Sort</strong> for fast average performance
        </li>
        {/* <li>
          Use <strong>Heap Sort</strong> when memory usage must be minimal
        </li> */}
      </ul>

      <NextPrev />
    </div>
  )
}
