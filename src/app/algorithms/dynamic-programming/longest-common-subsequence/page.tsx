import NextPrev from '@/components/nextPrev'

export default function LCSPage() {
  return (
    <div>
      {/* Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Longest Common Subsequence (LCS)
      </h1>

      {/* Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        The Longest Common Subsequence problem finds the maximum-length sequence
        that appears in two sequences in the same order. The elements of the
        subsequence do not need to be contiguous.
      </p>

      {/* Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        The solution is built by comparing prefixes of the two sequences. For
        each prefix pair, we determine the length of the longest common
        subsequence that can be formed. Each decision depends on previously
        computed prefix results.
      </p>

      {/* Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function LCS(A, B):
    n = length(A)
    m = length(B)

    dp = array of size (n+1) x (m+1)
    initialize all dp values to 0

    for i from 1 to n:
        for j from 1 to m:
            if A[i-1] == B[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[n][m]`}
      </pre>

      {/* Complexity */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O(n × m)</li>
        <li>Space Complexity: O(n × m)</li>
        <li>Space can be optimized using row compression</li>
      </ul>

      {/* When to Be Used */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Be Used
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>When comparing two sequences</li>
        <li>When order matters but elements may be skipped</li>
        <li>When measuring similarity between strings or sequences</li>
        <li>In text comparison and sequence analysis</li>
      </ul>

      <NextPrev />
    </div>
  )
}
