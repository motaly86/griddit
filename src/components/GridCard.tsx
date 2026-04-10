'use client'

import { useState } from 'react'
import Link from 'next/link'
import VoteButton from './VoteButton'
import { getGridLayout } from '@/lib/video-parser'

interface Video {
  id: string
  thumbnail: string
  title: string
  site: string
  embedUrl: string
}

interface GridCardProps {
  id: string
  title: string
  description?: string
  author: string
  category: string
  upvotes: number
  downvotes: number
  views: number
  createdAt: string
  videos: Video[]
  _count: { comments: number }
}

export default function GridCard({ id, title, description, author, category, upvotes, downvotes, views, createdAt, videos, _count }: GridCardProps) {
  const [expanded, setExpanded] = useState(false)
  const score = upvotes - downvotes
  const timeAgo = getTimeAgo(createdAt)
  const previewVideos = videos.slice(0, 4)
  const videoCount = videos.length
  const layout = getGridLayout(videoCount)

  return (
    <div className={`bg-zinc-900 border rounded-xl overflow-hidden transition-colors ${expanded ? 'border-indigo-500/50' : 'border-zinc-800 hover:border-zinc-700'}`}>
      {expanded ? (
        /* === EXPANDED: Live video grid === */
        <div>
          {/* Video grid */}
          <div
            className="grid gap-px bg-zinc-950"
            style={{
              gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
              aspectRatio: videoCount <= 2 ? '32/9' : '16/9',
            }}
          >
            {videos.map(video => (
              <div key={video.id} className="relative bg-black">
                <iframe
                  src={video.embedUrl}
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Collapse bar */}
          <button
            onClick={() => setExpanded(false)}
            className="w-full py-1.5 text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-950 hover:bg-zinc-900 transition-colors text-center"
          >
            ▲ Collapse
          </button>
        </div>
      ) : (
        /* === COLLAPSED: Thumbnail mosaic === */
        <div className="cursor-pointer" onClick={() => setExpanded(true)}>
          <div className="grid grid-cols-2 grid-rows-2 aspect-video bg-zinc-950 gap-px relative">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="relative bg-zinc-800 overflow-hidden">
                {previewVideos[i]?.thumbnail ? (
                  <img
                    src={previewVideos[i].thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : previewVideos[i] ? (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                    {previewVideos[i].site}
                  </div>
                ) : (
                  <div className="w-full h-full bg-zinc-900" />
                )}
              </div>
            ))}
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors">
              <div className="w-14 h-14 bg-indigo-600/90 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl ml-1">▶</span>
              </div>
            </div>
          </div>
          {videoCount > 4 && (
            <div className="text-center text-xs text-zinc-500 py-1 bg-zinc-900">
              +{videoCount - 4} more videos
            </div>
          )}
        </div>
      )}

      {/* Info bar */}
      <div className="p-3">
        <div className="flex items-start gap-3">
          <VoteButton gridId={id} score={score} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors line-clamp-2 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
              >
                {title}
              </span>
              <Link
                href={`/g/${id}`}
                className="text-xs text-zinc-600 hover:text-indigo-400 transition-colors flex-shrink-0"
                title="Open full page"
              >
                ↗
              </Link>
            </div>
            {expanded && description && (
              <p className="text-xs text-zinc-400 mt-1">{description}</p>
            )}
            <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500 flex-wrap">
              <span className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded text-[10px] font-medium uppercase">
                {category}
              </span>
              <span>{author}</span>
              <span>·</span>
              <span>{timeAgo}</span>
              <span>·</span>
              <span>{videoCount} videos</span>
              <span>·</span>
              <span>{_count.comments} comments</span>
              <span>·</span>
              <span>{views} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getTimeAgo(dateStr: string) {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}
