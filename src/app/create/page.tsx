'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { parseVideoUrl, type ParsedVideo } from '@/lib/video-parser'

export default function CreatePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('General')
  const [urlInput, setUrlInput] = useState('')
  const [videos, setVideos] = useState<ParsedVideo[]>([])
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function addVideo() {
    const url = urlInput.trim()
    if (!url) return

    if (videos.some(v => v.url === url)) {
      setError('Already added')
      return
    }
    if (videos.length >= 32) {
      setError('Maximum 32 videos')
      return
    }

    const parsed = parseVideoUrl(url)
    if (!parsed) {
      setError('Invalid URL')
      return
    }

    setVideos([...videos, parsed])
    setUrlInput('')
    setError('')
  }

  function removeVideo(index: number) {
    setVideos(videos.filter((_, i) => i !== index))
  }

  async function submit() {
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    if (videos.length === 0) {
      setError('Add at least one video')
      return
    }

    setSubmitting(true)
    const res = await fetch('/api/grids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),
        author: author.trim() || 'Anonymous',
        category,
        videos,
      }),
    })

    if (res.ok) {
      const grid = await res.json()
      router.push(`/g/${grid.id}`)
    } else {
      setError('Failed to create grid')
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create a Grid</h1>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. NFL Sunday Red Zone 4-Pack"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What are we watching?"
            rows={2}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none resize-none"
          />
        </div>

        {/* Author + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Your Name</label>
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Anonymous"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:border-indigo-500 focus:outline-none"
            >
              {['General', 'Sports', 'Gaming', 'Music', 'News', 'Entertainment', 'Education', 'Cooking', 'Science', 'ASMR', 'Relaxing', 'Comedy', 'Fitness', 'Cars', 'Anime', 'Nature', 'Travel'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add video URL */}
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Add Videos ({videos.length}/32)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addVideo()}
              placeholder="Paste a YouTube, Twitch, or video URL..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none"
            />
            <button
              onClick={addVideo}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Video list */}
        {videos.length > 0 && (
          <div className="space-y-2">
            {videos.map((video, i) => (
              <div key={i} className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-2">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt="" className="w-20 h-12 rounded object-cover bg-zinc-800" />
                ) : (
                  <div className="w-20 h-12 rounded bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">
                    {video.site}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{video.title}</div>
                  <div className="text-xs text-zinc-500 truncate">{video.url}</div>
                </div>
                <button
                  onClick={() => removeVideo(i)}
                  className="text-zinc-600 hover:text-red-400 text-xl px-2 transition-colors"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Preview */}
        {videos.length > 0 && (
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Preview ({videos.length} videos)</label>
            <div
              className="grid gap-1 bg-zinc-950 rounded-lg overflow-hidden"
              style={{
                gridTemplateColumns: `repeat(${Math.min(videos.length, videos.length <= 4 ? 2 : 3)}, 1fr)`,
              }}
            >
              {videos.map((video, i) => (
                <div key={i} className="aspect-video bg-zinc-800 relative overflow-hidden">
                  {video.thumbnail ? (
                    <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">
                      {video.site} — {video.title}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white text-lg">
                      ▶
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={submit}
          disabled={submitting}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
        >
          {submitting ? 'Publishing...' : 'Publish Grid'}
        </button>
      </div>
    </div>
  )
}
