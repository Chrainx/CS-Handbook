import NextPrev from '@/components/nextPrev'

export default function TreePage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-(--text-main)">Tree</h1>

      <p className="mb-4 text-(--text-secondary)">
        A tree is a non-linear data structure used to represent hierarchical
        relationships. It consists of nodes connected by edges, with a single
        node designated as the <em>root</em>.
      </p>

      <p className="mb-6 text-(--text-secondary)">
        Unlike linear data structures, trees allow data to be organized in
        parent–child relationships, making them suitable for representing
        structured data such as file systems, organizational charts, and
        expression hierarchies.
      </p>

      {/* Terminology */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Basic Terminology
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Root</strong> — the topmost node of the tree
        </li>
        <li>
          <strong>Parent</strong> — a node that has child nodes
        </li>
        <li>
          <strong>Child</strong> — a node that descends from a parent
        </li>
        <li>
          <strong>Leaf</strong> — a node with no children
        </li>
        <li>
          <strong>Height</strong> — the number of edges on the longest path from
          the root to a leaf
        </li>
      </ul>

      {/* Structure */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Structure
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Trees are typically defined recursively: a tree consists of a root node
        and zero or more subtrees. Each subtree is itself a tree.
      </p>

      {/* Types */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Types of Trees
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Binary Tree</strong> — each node has at most two children
        </li>
        <li>
          <strong>Binary Search Tree (BST)</strong> — a binary tree with
          ordering constraints on node values
        </li>
        <li>
          <strong>Balanced Trees</strong> — trees designed to keep height small
          (e.g. AVL trees, Red-Black trees)
        </li>
        <li>
          <strong>Heap</strong> — a tree structure with the heap property
        </li>
      </ul>

      {/* Traversal */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Tree Traversal
      </h2>

      <p className="mb-4 text-(--text-secondary)">
        Traversal refers to the process of visiting all nodes in a tree in a
        specific order. Common traversal strategies include:
      </p>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>
          <strong>Preorder</strong> — root, left subtree, right subtree
        </li>
        <li>
          <strong>Inorder</strong> — left subtree, root, right subtree
        </li>
        <li>
          <strong>Postorder</strong> — left subtree, right subtree, root
        </li>
        <li>
          <strong>Level-order</strong> — traverse level by level (uses a queue)
        </li>
      </ul>

      {/* Complexity */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Time Complexity
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        The time complexity of tree operations depends on the height of the
        tree. In balanced trees, operations such as insertion, deletion, and
        search typically take O(log n) time. In unbalanced trees, these
        operations can degrade to O(n).
      </p>

      {/* Use cases */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Common Use Cases
      </h2>

      <ul className="list-disc list-inside mb-6 text-(--text-secondary)">
        <li>Representing hierarchical data</li>
        <li>Implementing search structures (BSTs)</li>
        <li>Syntax trees in compilers</li>
        <li>Indexing structures in databases</li>
      </ul>

      {/* Notes */}
      <h2 className="text-xl font-medium mb-2 text-(--text-secondary)">
        Key Characteristics
      </h2>

      <p className="mb-6 text-(--text-secondary)">
        Trees provide a powerful way to organize data hierarchically. Their
        performance and usefulness depend heavily on how well-balanced the tree
        remains during operations.
      </p>

      <NextPrev />
    </div>
  )
}
