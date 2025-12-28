import NextPrev from '@/components/nextPrev'

export default function QuickSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-(--text-main)">Quick Sort</h1>

      <p className="text-(--text-secondary)">
        Quick Sort is a divide-and-conquer sorting algorithm that recursively
        partitions the array around a pivot element. After partitioning, the
        pivot is placed in its final sorted position, and the same process is
        applied to the left and right subarrays.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="text-(--text-secondary)">
        The algorithm selects a pivot element and rearranges the array so that
        all elements smaller than the pivot appear before it, while all elements
        larger appear after it. This partitioning step places the pivot in its
        correct sorted position. The process is then applied recursively to the
        two partitions. Good pivot selection results in balanced partitions and
        efficient performance.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-sm text-(--text-secondary) overflow-x-auto">
        {`function quickSort(arr, low, high):
    if low < high:
        pivotIndex = partition(arr, low, high)
        quickSort(arr, low, pivotIndex - 1)
        quickSort(arr, pivotIndex + 1, high)


function partition(arr, low, high):
    pivot = arr[high]
    i = low - 1

    for j = low to high - 1:
        if arr[j] <= pivot:
            i = i + 1
            swap arr[i] and arr[j]

    swap arr[i + 1] and arr[high]
    return i + 1`}
      </pre>

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

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        When to Use Quick Sort
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>When average-case performance matters</li>
        <li>When in-place sorting is preferred</li>
        <li>When cache efficiency is important</li>
        <li>When random or median-based pivot selection is used</li>
      </ul>

      <NextPrev />
    </div>
  )
}
