export interface ParsedVideo {
  url: string
  embedUrl: string
  title: string
  thumbnail: string
  site: string
}

export function parseVideoUrl(url: string): ParsedVideo | null {
  try {
    new URL(url)
  } catch {
    return null
  }

  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  )
  if (ytMatch) {
    const id = ytMatch[1]
    return {
      url,
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=0&mute=1`,
      title: `YouTube ${id}`,
      thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
      site: 'youtube',
    }
  }

  // Twitch channel
  const twChannel = url.match(/twitch\.tv\/([a-zA-Z0-9_]{3,25})(?:\/|$)/)
  if (twChannel) {
    const channel = twChannel[1]
    const reserved = ['directory', 'videos', 'settings', 'subscriptions', 'inventory', 'drops', 'wallet', 'search']
    if (!reserved.includes(channel.toLowerCase())) {
      return {
        url,
        embedUrl: `https://player.twitch.tv/?channel=${channel}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&muted=true`,
        title: channel,
        thumbnail: '',
        site: 'twitch',
      }
    }
  }

  // Twitch video/clip
  const twVideo = url.match(/twitch\.tv\/videos\/(\d+)/)
  if (twVideo) {
    return {
      url,
      embedUrl: `https://player.twitch.tv/?video=v${twVideo[1]}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&muted=true`,
      title: `Twitch Video ${twVideo[1]}`,
      thumbnail: '',
      site: 'twitch',
    }
  }

  // Generic - try as direct video
  return {
    url,
    embedUrl: url,
    title: new URL(url).hostname,
    thumbnail: '',
    site: 'generic',
  }
}

export function getGridLayout(count: number) {
  if (count <= 0) return { cols: 1, rows: 1 }
  if (count === 1) return { cols: 1, rows: 1 }
  if (count === 2) return { cols: 2, rows: 1 }
  if (count <= 4) return { cols: 2, rows: 2 }
  if (count <= 6) return { cols: 3, rows: 2 }
  if (count <= 9) return { cols: 3, rows: 3 }
  if (count <= 12) return { cols: 4, rows: 3 }
  if (count <= 16) return { cols: 4, rows: 4 }
  if (count <= 25) return { cols: 5, rows: 5 }
  return { cols: 6, rows: 6 }
}
