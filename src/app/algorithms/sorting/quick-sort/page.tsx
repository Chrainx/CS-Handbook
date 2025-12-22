import NextPrev from '@/components/nextPrev'

export default function QuickSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-(--text-main)">Quick Sort</h1>

      <p className="text-(--text-secondary)">
        Quick Sort is a divide-and-conquer algorithm that partitions the array
        around a pivot element and recursively sorts the partitions.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="text-(--text-secondary)">
        Elements smaller than the pivot are placed before it, while larger
        elements are placed after it.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Best case: O(n log n)</li>
        <li>Average case: O(n log n)</li>
        <li>Worst case: O(n²)</li>
        <li>Space complexity: O(log n)</li>
        <li>Stable: No</li>
      </ul>

      <NextPrev />
    </div>
  )
}
