'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import VideoGrid from '@/components/VideoGrid'
import VoteButton from '@/components/VoteButton'
import Link from 'next/link'

export default function GridViewPage() {
  const { id } = useParams()
  const [grid, setGrid] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/grids/${id}`)
      .then(r => r.json())
      .then(data => {
        setGrid(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="text-center py-20 text-zinc-500">Loading...</div>
  if (!grid) return <div className="text-center py-20 text-zinc-500">Grid not found</div>

  const score = grid.upvotes - grid.downvotes

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back link */}
      <Link href="/" className="text-sm text-zinc-500 hover:text-indigo-400 transition-colors mb-4 inline-block">
        &larr; Back to feed
      </Link>

      {/* Video grid */}
      <VideoGrid videos={grid.videos} />

      {/* Grid info */}
      <div className="mt-4 flex items-start gap-4">
        <VoteButton gridId={grid.id} score={score} />

        <div className="flex-1">
          <h1 className="text-xl font-bold">{grid.title}</h1>
          {grid.description && (
            <p className="text-sm text-zinc-400 mt-1">{grid.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
            <span className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded text-[10px] font-medium uppercase">
              {grid.category}
            </span>
            <span>by {grid.author}</span>
            <span>·</span>
            <span>{grid.views} views</span>
            <span>·</span>
            <span>{grid.videos.length} videos</span>
          </div>
        </div>

        {/* Share */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            alert('Link copied!')
          }}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm px-4 py-2 rounded-lg transition-colors"
        >
          Share
        </button>
      </div>

      {/* Comments */}
      <div className="mt-8 pt-6 border-t border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-400 mb-4">
          {grid._count?.comments || 0} Comments
        </h2>

        {/* Comment form */}
        <CommentForm gridId={grid.id} onCommented={() => {
          fetch(`/api/grids/${id}`).then(r => r.json()).then(setGrid)
        }} />

        {grid.comments?.length > 0 ? (
          <div className="space-y-3 mt-4">
            {grid.comments.map((comment: any) => (
              <div key={comment.id} className="bg-zinc-900 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-zinc-300">{comment.author}</span>
                  <span className="text-xs text-zinc-600">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-zinc-400">{comment.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-600 mt-4">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  )
}

function CommentForm({ gridId, onCommented }: { gridId: string; onCommented: () => void }) {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submit() {
    if (!text.trim()) return
    setSubmitting(true)
    await fetch(`/api/grids/${gridId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, author }),
    })
    setText('')
    setSubmitting(false)
    onCommented()
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 space-y-2">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write a comment..."
        rows={2}
        className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none resize-none"
      />
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Your name (optional)"
          className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none"
        />
        <button
          onClick={submit}
          disabled={submitting || !text.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors ml-auto"
        >
          {submitting ? 'Posting...' : 'Comment'}
        </button>
      </div>
    </div>
  )
}
