import NextPrev from '@/components/nextPrev'

export default function MergeSortPage() {
  return (
    <div className="max-w-3xl leading-relaxed space-y-4">
      <h1 className="text-3xl font-semibold text-(--text-main)">Merge Sort</h1>

      <p className="text-(--text-secondary)">
        Merge Sort is a divide-and-conquer algorithm that divides the array into
        halves, recursively sorts each half, and then merges the two sorted
        halves into a fully sorted array. It is stable and guarantees O(n log n)
        time in all cases.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Why Merge Sort Works
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Split the array into two halves</li>
        <li>Recursively sort the left half</li>
        <li>Recursively sort the right half</li>
        <li>Merge the two sorted halves</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Key Insight
      </h2>

      <p className="text-(--text-secondary)">
        Merge Sort separates the concerns of division and ordering: recursion
        handles breaking the problem down, while the merge step ensures the
        final ordering is correct.
      </p>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-sm text-(--text-secondary) overflow-x-auto">
        {`function mergeSort(arr):
    if length <= 1:
        return arr

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

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Best case: O(n log n)</li>
        <li>Average case: O(n log n)</li>
        <li>Worst case: O(n log n)</li>
        <li>Space complexity: O(n)</li>
        <li>Stable: Yes</li>
      </ul>

      <h2 className="text-xl font-medium mt-6 text-(--text-secondary)">
        When to Use Merge Sort
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>When stability is required</li>
        <li>When sorting linked lists</li>
        <li>When worst-case guarantees are important</li>
        <li>When predictable performance is needed</li>
      </ul>

      <NextPrev />
    </div>
  )
}
