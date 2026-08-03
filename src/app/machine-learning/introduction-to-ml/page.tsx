import NextPrev from '@/components/nextPrev'

export default function IntroductionToMlPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">
        Introduction to Machine Learning
      </h1>

      <p className="mb-6 text-(--text-secondary)">
        Machine learning builds programs that learn a task from data instead
        of from explicitly written rules. Rather than hand-coding &quot;if
        this pattern, do that,&quot; you give a model examples, and a training
        procedure adjusts the model&apos;s internal parameters so its
        predictions get closer to the correct answers over time.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Supervised Learning
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        The training data includes the correct answer (&quot;label&quot;) for every
        example - e.g. house features paired with the house&apos;s actual
        sale price, or an email paired with whether it&apos;s spam. The model
        learns to predict the label for new, unseen inputs. Most of this
        section&apos;s upcoming topics - linear regression, logistic
        regression, decision trees, k-nearest neighbors - are supervised
        learning methods.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Unsupervised Learning
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        The training data has <strong>no</strong> labels - the goal is to
        find structure in the data itself, such as grouping similar items
        together (clustering) or reducing many features down to the few that
        matter most (dimensionality reduction). k-Means clustering, covered
        later in this section, is a canonical unsupervised method.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Reinforcement Learning
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        An agent learns by interacting with an environment and receiving
        rewards or penalties for its actions, gradually learning a strategy
        (policy) that maximizes cumulative reward - the approach behind
        systems that learn to play games or control robots. It&apos;s the
        least similar of the three to the other topics in this section, and
        is mentioned here mainly for completeness.
      </p>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        The General Train / Predict Workflow
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Choose a model</strong> — a function with adjustable
          parameters (e.g. the slope and intercept of a line, for linear
          regression)
        </li>
        <li>
          <strong>Define a cost function</strong> — a number measuring how
          wrong the model&apos;s current predictions are on the training data
        </li>
        <li>
          <strong>Train</strong> — use an optimization procedure (commonly
          gradient descent) to adjust the parameters and reduce the cost
        </li>
        <li>
          <strong>Evaluate</strong> — check how well the trained model
          performs on data it hasn&apos;t seen before, not just the data it
          trained on
        </li>
        <li>
          <strong>Predict</strong> — use the trained model to make
          predictions on new inputs
        </li>
      </ul>

      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Why the Train/Test Distinction Matters
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        A model that performs perfectly on its training data but poorly on
        new data has <strong>overfit</strong> - it memorized the training
        examples rather than learning the underlying pattern. This is why
        the evaluation step always holds out data the model never trained
        on; it&apos;s the only way to estimate how the model will actually
        perform in the real world. This idea - and how to measure it
        properly - is covered in depth in Model Evaluation, later in this
        section.
      </p>

      <NextPrev />
    </div>
  )
}
