import NextPrev from '@/components/nextPrev'

export default function MachineLearningOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Machine Learning
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Machine learning is about building programs that improve at a task
        from data, rather than from explicitly programmed rules. Instead of
        writing the logic by hand, you choose a model, show it examples, and
        let a training process adjust the model&apos;s parameters to fit
        those examples.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>
      <p className="text-(--text-secondary)">
        Most ML problems follow the same shape: define a model with
        adjustable parameters, define a cost function that measures how wrong
        the model&apos;s predictions currently are, and use an optimization
        procedure (often gradient descent) to adjust the parameters and
        reduce that cost, using training data as the source of truth.
      </p>

      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        What Will Be Covered
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Introduction to ML: supervised, unsupervised, and reinforcement learning</li>
        <li>Linear regression and gradient descent</li>
        <li>Logistic regression / classification</li>
        <li>Decision trees</li>
        <li>k-Nearest Neighbors</li>
        <li>k-Means clustering</li>
        <li>Neural network basics</li>
        <li>Model evaluation: train/test splits, precision/recall, overfitting</li>
      </ul>

      <p className="mt-4 text-sm text-muted-foreground">
        This section is being built out incrementally - Introduction to ML
        and Linear Regression are live today, with the rest of the
        curriculum above coming in follow-up updates.
      </p>

      <NextPrev />
    </div>
  )
}
