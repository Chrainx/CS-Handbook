export default function BinarySearchPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Binary Search</h1>

      <p className="mb-4">
        Binary search finds an element in a sorted array by repeatedly dividing
        the search interval in half.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Pseudocode</h2>
      <pre className="bg-gray-200 p-4 rounded">
        {`function binarySearch(arr, target):
    left = 0
    right = n - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target: return mid
        if arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1
`}
      </pre>

      <h2 className="text-xl font-semibold mt-6 mb-2">Complexity</h2>
      <ul className="list-disc list-inside">
        <li>Time: O(log n)</li>
        <li>Space: O(1)</li>
      </ul>
    </div>
  )
}
