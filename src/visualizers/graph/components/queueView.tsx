'use client'

export default function QueueView({ queue }: { queue: string[] }) {
  return (
    <div className="mb-4 rounded border bg-gray-50 px-4 py-2 text-sm">
      <div className="mb-1 font-medium text-gray-700">Queue</div>

      <div className="flex items-center gap-2">
        {queue.length === 0 && <span className="text-gray-400">empty</span>}

        {queue.map((node, index) => (
          <div
            key={index}
            className="rounded border bg-blue-100 px-2 py-1 font-medium"
          >
            {node}
          </div>
        ))}
      </div>
    </div>
  )
}
