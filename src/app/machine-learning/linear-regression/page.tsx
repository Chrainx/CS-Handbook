import NextPrev from '@/components/nextPrev'

export default function LinearRegressionPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        Linear Regression
      </h1>

      <p className="mb-6 text-(--text-secondary)">
        Linear regression is the simplest supervised learning model, and a
        good first concrete example of the train/predict workflow described
        in Introduction to ML: fit a straight line (or, with more features,
        a flat plane/hyperplane) that best predicts a numeric output from
        one or more numeric inputs.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        The Model
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        For a single input feature <code>x</code>, the model predicts{' '}
        <code>ŷ = w·x + b</code> - a line with slope <code>w</code> (weight)
        and intercept <code>b</code> (bias). Training means finding the
        values of <code>w</code> and <code>b</code> that make the
        line&apos;s predictions match the training data as closely as
        possible. With multiple input features, this generalizes to{' '}
        <code>ŷ = w₁x₁ + w₂x₂ + ... + wₙxₙ + b</code> - a hyperplane instead
        of a line, but the same idea.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        The Cost Function
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        To measure &quot;how wrong&quot; a given line is, linear regression typically
        uses <strong>mean squared error (MSE)</strong>: for each training
        example, take the difference between the predicted value and the
        actual value, square it (so positive and negative errors
        don&apos;t cancel out, and larger errors are penalized
        disproportionately more), and average across all examples.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        <code>
          cost(w, b) = (1/n) · Σ (ŷᵢ - yᵢ)²
        </code>{' '}
        - training is the process of finding the <code>w</code> and{' '}
        <code>b</code> that minimize this cost.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Gradient Descent
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        Gradient descent finds that minimum iteratively rather than solving
        for it directly (a direct closed-form solution does exist for plain
        linear regression, but gradient descent is what generalizes to the
        more complex models introduced later in this section):
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Start with arbitrary values for <code>w</code> and <code>b</code> (often 0)</li>
        <li>Compute the gradient of the cost function - the direction that increases cost fastest</li>
        <li>Update each parameter by stepping a small amount in the <em>opposite</em> direction (downhill)</li>
        <li>Repeat until the cost stops decreasing meaningfully</li>
      </ul>

      <p className="mb-6 text-(--text-secondary)">
        The step size is controlled by a <strong>learning rate</strong>: too
        small and training takes a very long time to converge; too large
        and updates can overshoot the minimum and fail to converge at all,
        sometimes even increasing the cost. Choosing a good learning rate is
        one of the most common practical tuning problems across nearly
        every model that uses gradient descent, not just linear regression.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Assumptions and Limitations
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Linear regression assumes the relationship between inputs and
        output is genuinely linear - it will fit a straight line to
        curved data, just badly. It&apos;s also sensitive to{' '}
        <strong>outliers</strong>, since squaring the error in the cost
        function means a single far-off point can pull the fitted line
        noticeably off course. Despite these limitations, it remains widely
        used - it&apos;s fast to train, easy to interpret (each weight
        directly says how much that feature affects the prediction), and a
        good baseline before reaching for a more complex model.
      </p>

      <NextPrev />
    </div>
  )
}
