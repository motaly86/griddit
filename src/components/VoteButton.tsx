'use client'

import { useState } from 'react'

export default function VoteButton({ gridId, score: initialScore }: { gridId: string; score: number }) {
  const [score, setScore] = useState(initialScore)
  const [voted, setVoted] = useState<number | null>(null)

  async function vote(value: number) {
    const res = await fetch(`/api/grids/${gridId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    })
    const data = await res.json()
    setVoted(data.voted)

    // Refresh score
    const gridRes = await fetch(`/api/grids/${gridId}`)
    const grid = await gridRes.json()
    setScore(grid.upvotes - grid.downvotes)
  }

  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        onClick={() => vote(1)}
        className={`text-lg leading-none transition-colors ${voted === 1 ? 'text-indigo-400' : 'text-zinc-600 hover:text-indigo-400'}`}
      >
        ▲
      </button>
      <span className={`text-xs font-bold ${score > 0 ? 'text-indigo-400' : score < 0 ? 'text-red-400' : 'text-zinc-500'}`}>
        {score}
      </span>
      <button
        onClick={() => vote(-1)}
        className={`text-lg leading-none transition-colors ${voted === -1 ? 'text-red-400' : 'text-zinc-600 hover:text-red-400'}`}
      >
        ▼
      </button>
    </div>
  )
}
