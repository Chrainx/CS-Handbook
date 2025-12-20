export default function MergeSortPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Merge Sort
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Merge Sort is a divide-and-conquer algorithm that divides the array into
        halves, recursively sorts each half, and then merges the two sorted
        halves into a fully sorted array. It is stable and guarantees O(n log n)
        time in all cases.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Why Merge Sort Works
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Split the array into two halves</li>
        <li>Recursively sort the left half</li>
        <li>Recursively sort the right half</li>
        <li>Merge the two sorted halves</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function mergeSort(arr):
    if length <= 1: return arr

    mid = length / 2
    left = mergeSort(arr[0 : mid])
    right = mergeSort(arr[mid : end])

    return merge(left, right)


function merge(left, right):
    result = []
    while left and right:
        if left[0] <= right[0]:
            append left[0] to result
            left = left[1:]
        else:
            append right[0] to result
            right = right[1:]

    append remaining items of left
    append remaining items of right

    return result`}
      </pre>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Best: O(n log n)</li>
        <li>Average: O(n log n)</li>
        <li>Worst: O(n log n)</li>
        <li>Space: O(n) — extra array required</li>
        <li>Stable: Yes</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Use Merge Sort
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>When stability is required</li>
        <li>When sorting linked lists</li>
        <li>When worst-case guarantees are needed</li>
        <li>When recursion depth is not an issue</li>
      </ul>
    </div>
  )
}
