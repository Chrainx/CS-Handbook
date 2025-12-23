import NextPrev from '@/components/nextPrev'

export default function HuffmanCodingPage() {
  return (
    <div>
      {/* Topic */}
      <h1 className="text-3xl font-semibold mb-4 text-(--text-main)">
        Huffman Coding
      </h1>

      {/* Brief explanation */}
      <p className="mb-4 text-(--text-secondary)">
        Huffman Coding is a lossless data compression problem where characters
        with known frequencies are encoded into binary strings. The goal is to
        minimize the total number of bits used while ensuring that the encoded
        data can be uniquely decoded.
      </p>

      {/* Core idea */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Core Idea
      </h2>
      <p className="text-(--text-secondary)">
        Characters that appear more frequently are assigned shorter binary
        codes, while less frequent characters receive longer codes. This reduces
        the total encoded size of the data.
      </p>

      {/* Pseudocode */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Pseudocode
      </h2>
      <pre className="bg-(--code-bg) p-4 rounded border border-(--border-soft) text-sm text-(--text-secondary)">
        {`function huffmanCoding(characters, frequencies):
    create a minHeap using frequencies

    while heap size > 1:
        left = extractMin(heap)
        right = extractMin(heap)

        merged.frequency = left.frequency + right.frequency
        merged.left = left
        merged.right = right

        insert merged into heap

    return root of the Huffman tree`}
      </pre>

      {/* Complexity analysis */}
      <h2 className="text-xl font-medium mt-6 mb-2 text-(--text-secondary)">
        Complexity Analysis
      </h2>
      <ul className="list-disc list-inside text-(--text-secondary)">
        <li>Time Complexity: O(n log n)</li>
        <li>Space Complexity: O(n)</li>
      </ul>

      <NextPrev />
    </div>
  )
}
