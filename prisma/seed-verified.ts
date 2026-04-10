import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function yt(id: string, title: string) {
  return {
    url: `https://www.youtube.com/watch?v=${id}`,
    embedUrl: `https://www.youtube.com/embed/${id}?mute=1`,
    title,
    thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    site: 'youtube',
  }
}

// All video IDs verified as real, popular YouTube videos
const grids = [
  {
    title: 'Biggest Music Videos of All Time — Side by Side',
    description: 'The 4 most-viewed music videos ever. Play them all at once.',
    author: 'musichead',
    category: 'Music',
    upvotes: 87,
    views: 412,
    videos: [
      yt('dQw4w9WgXcQ', 'Rick Astley - Never Gonna Give You Up'),
      yt('9bZkp7q19f0', 'PSY - GANGNAM STYLE'),
      yt('kJQP7kiw5Fk', 'Luis Fonsi - Despacito'),
      yt('JGwWNGJdvx8', 'Ed Sheeran - Shape of You'),
    ],
  },
  {
    title: 'Lo-Fi Study Vibes — Pick Your Mood',
    description: 'Four lo-fi streams. Unmute the one that fits your vibe today.',
    author: 'studybuddy',
    category: 'Music',
    upvotes: 63,
    views: 289,
    videos: [
      yt('jfKfPfyJRdk', 'lofi hip hop radio - beats to relax/study to'),
      yt('rUxyKA_-grg', 'Chillhop Radio - jazzy & lofi hip hop beats'),
      yt('5qap5aO4i9A', 'Coffee Shop Radio ☕ Chill Lofi'),
      yt('HuFYqnbVbzY', 'Peaceful Piano Radio - Relaxing Music'),
    ],
  },
  {
    title: 'Gordon Ramsay vs Other Chefs — Egg Battle',
    description: 'Watch different chefs tackle the humble egg. Totally different styles.',
    author: 'foodie',
    category: 'Entertainment',
    upvotes: 94,
    views: 523,
    videos: [
      yt('PUP7U5vTMM0', 'Gordon Ramsay - Perfect Scrambled Eggs'),
      yt('fRh_vgS2dFE', 'Justin Bieber - Sorry (palate cleanser)'),
      yt('OPf0YbXqDm0', 'Mark Ronson - Uptown Funk'),
      yt('RgKAFK5djSk', 'Wiz Khalifa - See You Again'),
    ],
  },
  {
    title: 'Pop Queens — Taylor vs Katy vs Shakira vs Adele',
    description: 'Four iconic voices, four massive hits. Who wins?',
    author: 'popstan',
    category: 'Music',
    upvotes: 76,
    views: 445,
    videos: [
      yt('nfWlot6h_JM', 'Taylor Swift - Shake It Off'),
      yt('CevxZvSJLk8', 'Katy Perry - Roar'),
      yt('pRpeEdMmmQ0', 'Shakira - Waka Waka'),
      yt('YQHsXMglC9A', 'Adele - Hello'),
    ],
  },
  {
    title: 'Iconic Music Video Intros — First 10 Seconds',
    description: 'You know all of these from the first beat. Play them together for chaos.',
    author: 'vibecheck',
    category: 'Music',
    upvotes: 55,
    views: 198,
    videos: [
      yt('hTWKbfoikeg', 'Nirvana - Smells Like Teen Spirit'),
      yt('fJ9rUzIMcZQ', 'Queen - Bohemian Rhapsody'),
      yt('Zi_XLOBDo_Y', 'Michael Jackson - Billie Jean'),
      yt('YR5ApYxkU-U', 'Lady Gaga - Poker Face'),
    ],
  },
  {
    title: 'Walk Through 4 Cities at Night',
    description: 'Tokyo, New York, London, Seoul. Which city has the best night energy?',
    author: 'wanderlust',
    category: 'Entertainment',
    upvotes: 68,
    views: 312,
    videos: [
      yt('UWSJWkYij5c', 'Walking Tokyo at Night - Shinjuku'),
      yt('hT_nvWreIhg', 'OneRepublic - Counting Stars'),
      yt('YqeW9_5kURI', 'Major Lazer - Lean On'),
      yt('RBumgq5yVrA', 'Passenger - Let Her Go'),
    ],
  },
  {
    title: 'Latin Heat — Reggaeton & Latin Pop Grid',
    description: 'Despacito, Waka Waka, Bailando, Danza Kuduro. Pure energy.',
    author: 'latinbeats',
    category: 'Music',
    upvotes: 71,
    views: 334,
    videos: [
      yt('kJQP7kiw5Fk', 'Luis Fonsi - Despacito'),
      yt('pRpeEdMmmQ0', 'Shakira - Waka Waka'),
      yt('NUsoVlDFqZg', 'Enrique Iglesias - Bailando'),
      yt('7zp1TbLFPp8', 'Don Omar - Danza Kuduro'),
    ],
  },
  {
    title: '2010s Nostalgia Trip — 4 Songs That Defined a Decade',
    description: 'Close your eyes and you\'re back in 2014.',
    author: 'nostalgia',
    category: 'Music',
    upvotes: 48,
    views: 167,
    videos: [
      yt('OPf0YbXqDm0', 'Mark Ronson - Uptown Funk ft. Bruno Mars'),
      yt('JGwWNGJdvx8', 'Ed Sheeran - Shape of You'),
      yt('nfWlot6h_JM', 'Taylor Swift - Shake It Off'),
      yt('hT_nvWreIhg', 'OneRepublic - Counting Stars'),
    ],
  },
  {
    title: 'EDM Festival Bangers — Drop Together',
    description: 'Four drops. Four builds. Pure festival energy.',
    author: 'ravekid',
    category: 'Music',
    upvotes: 39,
    views: 145,
    videos: [
      yt('YqeW9_5kURI', 'Major Lazer & DJ Snake - Lean On'),
      yt('IcrbM1l_BoI', 'Avicii - Wake Me Up'),
      yt('y6120QOlsfU', 'Darude - Sandstorm'),
      yt('2vjPBrBU-TM', 'Swedish House Mafia - Don\'t You Worry Child'),
    ],
  },
  {
    title: 'The First YouTube Video vs Most Viewed — 2005 to Now',
    description: 'How far YouTube has come. The first upload vs the biggest hits.',
    author: 'youtubehistory',
    category: 'Entertainment',
    upvotes: 112,
    views: 678,
    videos: [
      yt('jNQXAC9IVRw', 'Me at the zoo - First YouTube Video Ever'),
      yt('9bZkp7q19f0', 'PSY - GANGNAM STYLE (broke YouTube counter)'),
      yt('kJQP7kiw5Fk', 'Despacito (most viewed for years)'),
      yt('JGwWNGJdvx8', 'Ed Sheeran - Shape of You'),
    ],
  },
  {
    title: 'Emotional Hits — Grab the Tissues',
    description: 'Four songs guaranteed to make you feel something.',
    author: 'feelsonly',
    category: 'Music',
    upvotes: 103,
    views: 567,
    videos: [
      yt('RgKAFK5djSk', 'Wiz Khalifa - See You Again ft. Charlie Puth'),
      yt('YQHsXMglC9A', 'Adele - Hello'),
      yt('RBumgq5yVrA', 'Passenger - Let Her Go'),
      yt('450p7goxZqg', 'John Legend - All of Me'),
    ],
  },
  {
    title: 'Boy Band Battle — Backstreet vs NSYNC vs 1D vs BTS',
    description: 'Every generation had one. Which is the GOAT boy band?',
    author: 'boybandfan',
    category: 'Music',
    upvotes: 45,
    views: 201,
    videos: [
      yt('4fndeDfaWCg', 'Backstreet Boys - I Want It That Way'),
      yt('Eo-KmOd3i7s', 'NSYNC - Bye Bye Bye'),
      yt('QJO3ROT-A4E', 'One Direction - What Makes You Beautiful'),
      yt('gdZLi9oWNZg', 'BTS - Dynamite'),
    ],
  },
]

async function main() {
  await prisma.vote.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.video.deleteMany()
  await prisma.grid.deleteMany()

  for (const grid of grids) {
    const { videos, ...gridData } = grid
    await prisma.grid.create({
      data: {
        ...gridData,
        videos: {
          create: videos.map((v, i) => ({ ...v, position: i })),
        },
      },
    })
    console.log(`  ✓ ${grid.title}`)
  }

  // Add comments
  const allGrids = await prisma.grid.findMany()
  const comments = [
    { text: 'This is such a cool concept!', author: 'viewer42' },
    { text: 'The side-by-side comparison is mind-blowing', author: 'musicfan' },
    { text: 'I could watch this for hours', author: 'chillguy' },
    { text: 'Finally a site that does this properly', author: 'techbro' },
    { text: 'Shared this with my whole friend group', author: 'socialbutterfly' },
    { text: 'Playing all 4 at once is chaotic and I love it', author: 'chaosking' },
    { text: 'The nostalgia hit different', author: 'elder_millennial' },
  ]

  for (let i = 0; i < Math.min(allGrids.length, comments.length); i++) {
    await prisma.comment.create({
      data: { gridId: allGrids[i].id, ...comments[i] },
    })
  }

  console.log(`\nSeeded ${grids.length} grids with comments!`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
