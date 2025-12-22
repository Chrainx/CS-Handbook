import NextPrev from '@/components/nextPrev'

export default function LISPage() {
  return (
    <div>
      {/* 1. Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Longest Increasing Subsequence
      </h1>

      {/* 2. Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        The Longest Increasing Subsequence (LIS) problem asks for the length of
        the longest subsequence of an array such that the elements of the
        subsequence are strictly increasing.
      </p>

      {/* 3. Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        For each position in the array, compute the length of the longest
        increasing subsequence that ends exactly at that position. The final
        answer is the maximum value among all these computed lengths.
      </p>

      <p className="mb-4 text-(--text-secondary)">
        Each position builds upon previous positions with smaller values,
        ensuring that the increasing order is maintained.
      </p>

      {/* 4. Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function LIS(nums):
    n = length of nums
    dp = array of size n
    fill dp with 1

    for i from 0 to n - 1:
        for j from 0 to i - 1:
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max value in dp
`}
      </pre>

      {/* 5. Complexity Analysis */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O(n²)</li>
        <li>Space Complexity: O(n)</li>
      </ul>

      {/* 6. When to Be Used */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Be Used
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Sequence optimization problems</li>
        <li>Problems involving ordered subsequences</li>
        <li>As a foundation for more advanced sequence DP problems</li>
      </ul>

      <NextPrev />
    </div>
  )
}
