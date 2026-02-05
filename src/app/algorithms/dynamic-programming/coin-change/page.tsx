import NextPrev from '@/components/nextPrev'

export default function CoinChangePage() {
  return (
    <div>
      {/* 1. Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Coin Change
      </h1>

      {/* 2. Brief Explanation */}
      <p className="mb-4 text-(--text-secondary)">
        The Coin Change problem asks for the minimum number of coins needed to
        make up a given amount using a set of coin denominations. Each coin may
        be used an unlimited number of times.
      </p>

      {/* 3. Core Idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        The problem is solved by computing the minimum number of coins required
        for every amount from 0 up to the target amount. For each amount, all
        coin denominations are tried, and the best (minimum) result is stored
        and reused.
      </p>

      <p className="mb-4 text-(--text-secondary)">
        Each subproblem represents a smaller amount, and the solution for a
        larger amount depends on previously computed results for smaller
        amounts.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Key Insight
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        The optimal solution for any amount depends only on optimal solutions to
        smaller amounts. Once the minimum number of coins needed for a smaller
        amount is known, it can be reused to construct the solution for larger
        amounts. This ensures each subproblem is solved once and never
        recomputed.
      </p>

      {/* 4. Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>

      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-(--text-secondary)">
        {`function coinChange(coins, amount):
    dp = array of size (amount + 1)
    fill dp with infinity
    dp[0] = 0

    for a from 1 to amount:
        for each coin in coins:
            if coin <= a:
                dp[a] = min(dp[a], dp[a - coin] + 1)

    if dp[amount] is infinity:
        return -1
    else:
        return dp[amount]
`}
      </pre>

      {/* 5. Complexity Analysis */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O(amount × n), where n is the number of coins</li>
        <li>Space Complexity: O(amount)</li>
      </ul>

      {/* 6. When to Be Used */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Be Used
      </h2>

      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Problems involving unlimited use of items</li>
        <li>Optimization problems over numeric ranges</li>
        <li>Currency and change-making problems</li>
        <li>As a basic example of one-dimensional DP</li>
      </ul>

      <NextPrev />
    </div>
  )
}
