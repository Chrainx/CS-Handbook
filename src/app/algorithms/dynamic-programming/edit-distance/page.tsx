import NextPrev from '@/components/nextPrev'

export default function EditDistancePage() {
  return (
    <div>
      {/* Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Edit Distance
      </h1>

      {/* Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        Edit Distance computes the minimum number of operations needed to
        convert one string into another. The allowed operations are insertion,
        deletion, and replacement of characters.
      </p>

      {/* Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        The solution considers prefixes of both strings. For each prefix pair,
        it determines the minimum number of operations required to transform one
        prefix into the other, using previously computed results for smaller
        prefixes.
      </p>

      {/* Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function editDistance(A, B):
    n = length(A)
    m = length(B)

    dp = array of size (n+1) x (m+1)

    for i from 0 to n:
        dp[i][0] = i

    for j from 0 to m:
        dp[0][j] = j

    for i from 1 to n:
        for j from 1 to m:
            if A[i-1] == B[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],     // deletion
                    dp[i][j-1],     // insertion
                    dp[i-1][j-1]    // replacement
                )

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
        <li>When transforming one string into another</li>
        <li>When computing string similarity</li>
        <li>In spell checking and auto-correction systems</li>
        <li>In text comparison tools</li>
      </ul>

      <NextPrev />
    </div>
  )
}
