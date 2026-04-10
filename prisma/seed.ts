import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.vote.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.video.deleteMany()
  await prisma.grid.deleteMany()

  // Sample grids
  await prisma.grid.create({
    data: {
      title: 'Music Video Classics',
      description: 'The biggest music videos of all time, side by side',
      author: 'griddit',
      category: 'Music',
      upvotes: 42,
      views: 156,
      videos: {
        create: [
          { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?mute=1', title: 'Rick Astley - Never Gonna Give You Up', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg', site: 'youtube', position: 0 },
          { url: 'https://www.youtube.com/watch?v=9bZkp7q19f0', embedUrl: 'https://www.youtube.com/embed/9bZkp7q19f0?mute=1', title: 'PSY - GANGNAM STYLE', thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg', site: 'youtube', position: 1 },
          { url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', embedUrl: 'https://www.youtube.com/embed/kJQP7kiw5Fk?mute=1', title: 'Luis Fonsi - Despacito', thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg', site: 'youtube', position: 2 },
          { url: 'https://www.youtube.com/watch?v=JGwWNGJdvx8', embedUrl: 'https://www.youtube.com/embed/JGwWNGJdvx8?mute=1', title: 'Ed Sheeran - Shape of You', thumbnail: 'https://img.youtube.com/vi/JGwWNGJdvx8/mqdefault.jpg', site: 'youtube', position: 3 },
        ],
      },
    },
  })

  await prisma.grid.create({
    data: {
      title: 'Chill Lo-Fi Study Session',
      description: 'Multiple lo-fi streams for the ultimate study vibe',
      author: 'studybuddy',
      category: 'Music',
      upvotes: 28,
      views: 89,
      videos: {
        create: [
          { url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk', embedUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?mute=1', title: 'lofi hip hop radio', thumbnail: 'https://img.youtube.com/vi/jfKfPfyJRdk/mqdefault.jpg', site: 'youtube', position: 0 },
          { url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY', embedUrl: 'https://www.youtube.com/embed/4xDzrJKXOOY?mute=1', title: 'Synthwave Radio', thumbnail: 'https://img.youtube.com/vi/4xDzrJKXOOY/mqdefault.jpg', site: 'youtube', position: 1 },
        ],
      },
    },
  })

  await prisma.grid.create({
    data: {
      title: 'Top Gaming Streams Right Now',
      description: 'Watch the biggest Twitch streamers at the same time',
      author: 'twitchfan',
      category: 'Gaming',
      upvotes: 15,
      views: 67,
      videos: {
        create: [
          { url: 'https://www.youtube.com/watch?v=hT_nvWreIhg', embedUrl: 'https://www.youtube.com/embed/hT_nvWreIhg?mute=1', title: 'OneRepublic - Counting Stars', thumbnail: 'https://img.youtube.com/vi/hT_nvWreIhg/mqdefault.jpg', site: 'youtube', position: 0 },
          { url: 'https://www.youtube.com/watch?v=fRh_vgS2dFE', embedUrl: 'https://www.youtube.com/embed/fRh_vgS2dFE?mute=1', title: 'Justin Bieber - Sorry', thumbnail: 'https://img.youtube.com/vi/fRh_vgS2dFE/mqdefault.jpg', site: 'youtube', position: 1 },
          { url: 'https://www.youtube.com/watch?v=OPf0YbXqDm0', embedUrl: 'https://www.youtube.com/embed/OPf0YbXqDm0?mute=1', title: 'Mark Ronson - Uptown Funk', thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/mqdefault.jpg', site: 'youtube', position: 2 },
          { url: 'https://www.youtube.com/watch?v=RgKAFK5djSk', embedUrl: 'https://www.youtube.com/embed/RgKAFK5djSk?mute=1', title: 'Wiz Khalifa - See You Again', thumbnail: 'https://img.youtube.com/vi/RgKAFK5djSk/mqdefault.jpg', site: 'youtube', position: 3 },
          { url: 'https://www.youtube.com/watch?v=CevxZvSJLk8', embedUrl: 'https://www.youtube.com/embed/CevxZvSJLk8?mute=1', title: 'Katy Perry - Roar', thumbnail: 'https://img.youtube.com/vi/CevxZvSJLk8/mqdefault.jpg', site: 'youtube', position: 4 },
          { url: 'https://www.youtube.com/watch?v=nfWlot6h_JM', embedUrl: 'https://www.youtube.com/embed/nfWlot6h_JM?mute=1', title: 'Taylor Swift - Shake It Off', thumbnail: 'https://img.youtube.com/vi/nfWlot6h_JM/mqdefault.jpg', site: 'youtube', position: 5 },
        ],
      },
    },
  })

  await prisma.grid.create({
    data: {
      title: 'Breaking News Multi-Feed',
      description: 'All major news channels in one view',
      author: 'newswatch',
      category: 'News',
      upvotes: 33,
      views: 210,
      videos: {
        create: [
          { url: 'https://www.youtube.com/watch?v=w_Ma8oQLmSM', embedUrl: 'https://www.youtube.com/embed/w_Ma8oQLmSM?mute=1', title: 'NBC News NOW', thumbnail: 'https://img.youtube.com/vi/w_Ma8oQLmSM/mqdefault.jpg', site: 'youtube', position: 0 },
          { url: 'https://www.youtube.com/watch?v=YqeW9_5kURI', embedUrl: 'https://www.youtube.com/embed/YqeW9_5kURI?mute=1', title: 'Major Lazer - Lean On', thumbnail: 'https://img.youtube.com/vi/YqeW9_5kURI/mqdefault.jpg', site: 'youtube', position: 1 },
          { url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', embedUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw?mute=1', title: 'Me at the zoo', thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg', site: 'youtube', position: 2 },
          { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?mute=1', title: 'ABC News Live', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg', site: 'youtube', position: 3 },
        ],
      },
    },
  })

  console.log('Seeded 4 sample grids!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
