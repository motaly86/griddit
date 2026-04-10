'use client'

import { useState } from 'react'
import { getGridLayout } from '@/lib/video-parser'

interface Video {
  id: string
  url: string
  embedUrl: string
  title: string
  site: string
  thumbnail: string
}

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [maximized, setMaximized] = useState<string | null>(null)
  const layout = getGridLayout(videos.length)

  const visibleVideos = maximized ? videos.filter(v => v.id === maximized) : videos
  const cols = maximized ? 1 : layout.cols

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-xs text-zinc-500">{videos.length} videos</span>
        {maximized && (
          <button
            onClick={() => setMaximized(null)}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded transition-colors"
          >
            Show All
          </button>
        )}
      </div>

      {/* Grid */}
      <div
        className="grid gap-1 w-full bg-zinc-950 rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          aspectRatio: maximized ? '16/9' : undefined,
        }}
      >
        {visibleVideos.map(video => (
          <div
            key={video.id}
            className="relative bg-black group cursor-pointer"
            style={{ aspectRatio: '16/9' }}
            onDoubleClick={() => setMaximized(maximized === video.id ? null : video.id)}
          >
            {video.site === 'generic' ? (
              <video
                src={video.embedUrl}
                className="w-full h-full"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <iframe
                src={video.embedUrl}
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            )}

            {/* Hover overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-300 truncate flex-1">{video.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setMaximized(maximized === video.id ? null : video.id) }}
                  className="text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded"
                >
                  {maximized === video.id ? 'Minimize' : 'Maximize'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
