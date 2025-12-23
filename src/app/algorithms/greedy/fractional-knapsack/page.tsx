import NextPrev from '@/components/nextPrev'

export default function FractionalKnapsackPage() {
  return (
    <div>
      {/* Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Fractional Knapsack
      </h1>

      {/* Brief explanation */}
      <p className="mb-4 text-(--text-secondary)">
        Fractional Knapsack is an optimization problem where items can be
        divided into fractions. The objective is to maximize total value while
        staying within a fixed weight capacity.
      </p>

      {/* Core idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>
      <p className="text-(--text-secondary)">
        Since items can be split, the optimal strategy is to always take the
        item with the highest value per unit weight first. This greedy choice is
        safe because any remaining capacity can be filled with fractions of the
        best available item.
      </p>

      {/* Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-sm text-(--text-secondary)">
        {`function fractionalKnapsack(items, capacity):
    sort items by value / weight descending
    totalValue = 0

    for each item in items:
        if capacity == 0:
            break

        if item.weight <= capacity:
            capacity -= item.weight
            totalValue += item.value
        else:
            fraction = capacity / item.weight
            totalValue += item.value * fraction
            capacity = 0

    return totalValue`}
      </pre>

      {/* Complexity analysis */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O(n log n)</li>
        <li>Space Complexity: O(1)</li>
      </ul>

      {/* When to be used */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        When to Be Used
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>When items can be divided into fractions</li>
        <li>When maximizing total value is the primary goal</li>
        <li>When a fast, greedy solution is acceptable</li>
      </ul>

      <NextPrev />
    </div>
  )
}
