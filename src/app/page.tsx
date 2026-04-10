'use client'

import { useEffect, useState } from 'react'
import GridCard from '@/components/GridCard'

type SortType = 'hot' | 'new' | 'top'

export default function FeedPage() {
  const [grids, setGrids] = useState<any[]>([])
  const [sort, setSort] = useState<SortType>('hot')
  const [category, setCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ sort })
    if (category) params.set('category', category)
    fetch(`/api/grids?${params}`)
      .then(r => r.json())
      .then(data => {
        setGrids(data)
        setLoading(false)
      })
  }, [sort, category])

  return (
    <div className="flex gap-6">
      {/* Main feed */}
      <div className="flex-1 min-w-0">
        {/* Sort tabs */}
        <div className="flex items-center gap-1 mb-6 bg-zinc-900 rounded-lg p-1 w-fit">
          {(['hot', 'new', 'top'] as SortType[]).map(s => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                sort === s
                  ? 'bg-indigo-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {s === 'hot' ? '🔥 Hot' : s === 'new' ? '✨ New' : '🏆 Top'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500">Loading...</div>
        ) : grids.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📺</div>
            <div className="text-zinc-400 text-lg mb-2">No grids yet</div>
            <div className="text-zinc-600 text-sm">Be the first to create one!</div>
          </div>
        ) : (
          <div className="space-y-4">
            {grids.map(grid => (
              <GridCard key={grid.id} {...grid} />
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sticky top-20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 grid grid-cols-2 grid-rows-2 gap-px rounded overflow-hidden">
              <div className="bg-indigo-500" />
              <div className="bg-pink-500" />
              <div className="bg-green-500" />
              <div className="bg-amber-400" />
            </div>
            <span className="font-bold text-sm">About Griddit</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed mb-4">
            Create and share multi-video grids. Watch sports, streams, news, and more — all at once.
          </p>
          <a
            href="/create"
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
          >
            + Create Grid
          </a>

          <div className="mt-6 pt-4 border-t border-zinc-800">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Categories</h3>
            <div className="flex flex-wrap gap-1.5">
              <span
                onClick={() => setCategory(null)}
                className={`text-xs px-2 py-1 rounded cursor-pointer transition-colors ${!category ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-indigo-400'}`}
              >
                All
              </span>
              {['Sports', 'Gaming', 'Music', 'News', 'Entertainment', 'Education', 'Cooking', 'Science', 'ASMR', 'Relaxing', 'Comedy', 'Fitness', 'Cars', 'Anime', 'Nature', 'Travel'].map(cat => (
                <span
                  key={cat}
                  onClick={() => setCategory(category === cat ? null : cat)}
                  className={`text-xs px-2 py-1 rounded cursor-pointer transition-colors ${category === cat ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-indigo-400'}`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
