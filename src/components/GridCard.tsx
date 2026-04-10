'use client'

import Link from 'next/link'
import VoteButton from './VoteButton'

interface Video {
  id: string
  thumbnail: string
  title: string
  site: string
}

interface GridCardProps {
  id: string
  title: string
  author: string
  category: string
  upvotes: number
  downvotes: number
  views: number
  createdAt: string
  videos: Video[]
  _count: { comments: number }
}

export default function GridCard({ id, title, author, category, upvotes, downvotes, views, createdAt, videos, _count }: GridCardProps) {
  const score = upvotes - downvotes
  const timeAgo = getTimeAgo(createdAt)
  const previewVideos = videos.slice(0, 4)
  const videoCount = videos.length

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
      {/* Thumbnail mosaic */}
      <Link href={`/g/${id}`}>
        <div className="grid grid-cols-2 grid-rows-2 aspect-video bg-zinc-950 gap-px">
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
        </div>
        {videoCount > 4 && (
          <div className="text-center text-xs text-zinc-500 py-1 bg-zinc-900">
            +{videoCount - 4} more videos
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start gap-3">
          <VoteButton gridId={id} score={score} />

          <div className="flex-1 min-w-0">
            <Link href={`/g/${id}`} className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors line-clamp-2">
              {title}
            </Link>
            <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
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
