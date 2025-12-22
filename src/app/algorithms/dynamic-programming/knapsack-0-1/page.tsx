import NextPrev from '@/components/nextPrev'

export default function Knapsack01Page() {
  return (
    <div>
      {/* 1. Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        0/1 Knapsack
      </h1>

      {/* 2. Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        The 0/1 Knapsack problem is an optimization problem where a set of
        items, each with a weight and a value, must be selected to maximize
        total value without exceeding a given weight capacity. Each item can
        either be taken once or not taken at all.
      </p>

      {/* 3. Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        The core idea of the 0/1 Knapsack problem is to consider items one by
        one and decide whether to include each item in the knapsack or not. For
        every item and every possible capacity, the algorithm stores the maximum
        value that can be achieved.
      </p>

      <p className="mb-4 text-(--text-secondary)">
        At each step, there are two choices: exclude the current item and keep
        the previous best value, or include the item and add its value to the
        best result achievable with the remaining capacity. The better of these
        two choices is stored and reused for future decisions.
      </p>

      {/* 4. Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function knapsack(weights, values, capacity):
    n = number of items
    dp = 2D array of size (n+1) x (capacity+1)

    for i from 0 to n:
        for w from 0 to capacity:
            if i == 0 or w == 0:
                dp[i][w] = 0
            else if weights[i-1] <= w:
                exclude = dp[i-1][w]
                include = values[i-1] + dp[i-1][w - weights[i-1]]
                dp[i][w] = max(exclude, include)
            else:
                dp[i][w] = dp[i-1][w]

    return dp[n][capacity]
`}
      </pre>

      {/* 5. Complexity Analysis */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O(n × W)</li>
        <li>Space Complexity: O(n × W)</li>
      </ul>

      {/* 6. When to Be Used */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Be Used
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Resource allocation problems</li>
        <li>Optimization under constraints</li>
        <li>Problems requiring binary decisions per item</li>
        <li>As a foundation for many other DP problems</li>
      </ul>

      <NextPrev />
    </div>
  )
}
