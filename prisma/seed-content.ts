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

const grids = [
  // === MUSIC ===
  {
    title: '90s vs 2000s vs 2010s vs 2020s — Same Energy',
    description: 'One iconic hit from each decade. Play them all and feel the evolution of pop.',
    author: 'musichead',
    category: 'Music',
    upvotes: 87,
    views: 412,
    videos: [
      yt('dQw4w9WgXcQ', 'Rick Astley - Never Gonna Give You Up (1987)'),
      yt('6M6samPEMpM', 'Destiny\'s Child - Say My Name (1999)'),
      yt('OPf0YbXqDm0', 'Mark Ronson ft. Bruno Mars - Uptown Funk (2014)'),
      yt('kJQP7kiw5Fk', 'Luis Fonsi - Despacito (2017)'),
    ],
  },
  {
    title: 'Lo-Fi Study Session — 4 Streams at Once',
    description: 'The ultimate focus mode. Pick which vibe suits you today.',
    author: 'studybuddy',
    category: 'Music',
    upvotes: 63,
    views: 289,
    videos: [
      yt('jfKfPfyJRdk', 'lofi hip hop radio - beats to relax/study to'),
      yt('4xDzrJKXOOY', 'Synthwave Radio - Neon Dreams'),
      yt('5qap5aO4i9A', 'Coffee Shop Radio - Rainy Day Jazz'),
      yt('rUxyKA_-grg', 'Chillhop Radio - Cozy Beats'),
    ],
  },
  {
    title: 'Guitar Gods Shredding — Side by Side',
    description: 'Hendrix, Page, Van Halen, and Slash. Who\'s the GOAT?',
    author: 'riffmaster',
    category: 'Music',
    upvotes: 55,
    views: 198,
    videos: [
      yt('TLV4_xaYynY', 'Jimi Hendrix - All Along The Watchtower'),
      yt('QkF3oxziUI4', 'Led Zeppelin - Stairway to Heaven'),
      yt('sI66hcu9fJk', 'Van Halen - Eruption Guitar Solo'),
      yt('o1tj2zJ2Wvg', 'Guns N\' Roses - Sweet Child O\' Mine'),
    ],
  },

  // === COOKING ===
  {
    title: 'Gordon Ramsay vs Jamie Oliver vs Julia Child vs Jacques Pépin',
    description: 'Four legendary chefs making eggs. Completely different techniques.',
    author: 'foodie',
    category: 'Entertainment',
    upvotes: 94,
    views: 523,
    videos: [
      yt('PUP7U5vTMM0', 'Gordon Ramsay - Perfect Scrambled Eggs'),
      yt('s9r-CxnCXkg', 'Jamie Oliver - How to Cook Perfect Eggs'),
      yt('4RoLavF2ZLU', 'Jacques Pépin - Perfect Omelette'),
      yt('dU_B3QNu_Ks', 'Julia Child - The French Omelette'),
    ],
  },

  // === NATURE / RELAXING ===
  {
    title: 'Earth from Every Angle — Relaxing Nature Grid',
    description: 'Ocean, mountains, forest, northern lights. Put this on your second monitor.',
    author: 'naturelover',
    category: 'Entertainment',
    upvotes: 71,
    views: 334,
    videos: [
      yt('BHACKCNDMW8', '4K Ocean Waves - Relaxing Beach'),
      yt('CjB_oVeq8Lo', '4K Mountain Sunrise Timelapse'),
      yt('xNN7iTA57jM', 'Relaxing Rain on Leaves - Forest Ambience'),
      yt('VgTOJcFMxnI', 'Northern Lights in Real Time 4K'),
    ],
  },

  // === GAMING ===
  {
    title: 'Speedrun History — Same Game, Years Apart',
    description: 'Watch how speedrun records evolved over the years for Super Mario 64',
    author: 'speedrunfan',
    category: 'Gaming',
    upvotes: 48,
    views: 167,
    videos: [
      yt('5UJLsjT5gXo', 'SM64 16 Star - 2004 Record'),
      yt('8s3m4YEqGIA', 'SM64 - Simply\'s Current Record'),
      yt('j5j6l9ULxmI', 'SM64 120 Star World Record History'),
      yt('wjge1bVobN0', 'How Speedrunners Broke Mario 64'),
    ],
  },

  // === NEWS / EDUCATIONAL ===
  {
    title: 'Same News, Different Countries',
    description: 'How different countries cover world events. Eye-opening perspective.',
    author: 'worldnews',
    category: 'News',
    upvotes: 112,
    views: 678,
    videos: [
      yt('w_Ma8oQLmSM', 'NBC News NOW Live'),
      yt('9Auq9mYxFEE', 'Sky News Live'),
      yt('GE_SfNVNyqk', 'Al Jazeera English Live'),
      yt('V1SZGBE5abI', 'France 24 English Live'),
    ],
  },
  {
    title: 'Learn a Language — 4 Teachers, 4 Styles',
    description: 'Same language, totally different teaching approaches. Find your match.',
    author: 'polyglot',
    category: 'Education',
    upvotes: 39,
    views: 145,
    videos: [
      yt('RKJkMD6M9Yc', 'Spanish in 10 Minutes - Crash Course'),
      yt('TYEVBmIxGIE', 'Learn Spanish - Grammar Deep Dive'),
      yt('cMKAsNmUtMM', 'Spanish with Music - Songs Method'),
      yt('UOx_G9-JFps', 'Street Spanish - Real Conversations'),
    ],
  },

  // === SPORTS ===
  {
    title: 'Greatest Goals in Football History — 4 Angles',
    description: 'Maradona, Messi, Ronaldo, Zidane. The most iconic moments.',
    author: 'goalmaster',
    category: 'Sports',
    upvotes: 76,
    views: 445,
    videos: [
      yt('1wVho3I0NtU', 'Maradona - Hand of God + Goal of the Century'),
      yt('jLDZfbHkHUI', 'Messi - Greatest Solo Goals'),
      yt('wGfguhnvECc', 'Ronaldo - Best Champions League Goals'),
      yt('BDjsEhBa0Dk', 'Zidane - Most Elegant Player Ever'),
    ],
  },

  // === CREATIVE / UNIQUE ===
  {
    title: 'Same Song, 4 Instruments — Bohemian Rhapsody',
    description: 'Piano, guitar, violin, and a capella. Same song, completely different feel.',
    author: 'musicnerd',
    category: 'Music',
    upvotes: 103,
    views: 567,
    videos: [
      yt('fJ9rUzIMcZQ', 'Bohemian Rhapsody - Official Video'),
      yt('1qEbGMwgEXQ', 'Bohemian Rhapsody - Piano Cover'),
      yt('Ko3tbfdWbr0', 'Bohemian Rhapsody - Electric Guitar'),
      yt('Ul6UPqJGSGM', 'Bohemian Rhapsody - Violin Cover'),
    ],
  },
  {
    title: 'Cities at Night — Tokyo / New York / Paris / Dubai',
    description: 'Walking through 4 cities at night. Which vibe do you prefer?',
    author: 'wanderlust',
    category: 'Entertainment',
    upvotes: 68,
    views: 312,
    videos: [
      yt('UWSJWkYij5c', 'Walking Tokyo at Night - Shinjuku'),
      yt('n12I3ydTHKA', 'Walking New York City at Night - Manhattan'),
      yt('cb43SneXbMk', 'Walking Paris at Night - Eiffel Tower'),
      yt('SLaYPmhse30', 'Walking Dubai at Night - Downtown'),
    ],
  },
  {
    title: 'How It\'s Made — Satisfying Factory Grid',
    description: 'Chocolate, glass, pencils, and tires. Pure factory ASMR.',
    author: 'factoryfan',
    category: 'Entertainment',
    upvotes: 45,
    views: 201,
    videos: [
      yt('1XVcFOjPMKE', 'How Chocolate is Made'),
      yt('12OSBJwogFc', 'How Glass Bottles Are Made'),
      yt('OeJwKMTfUPE', 'How Pencils Are Made'),
      yt('_kkJSxDGi9A', 'How Car Tires Are Made'),
    ],
  },
]

async function main() {
  // Clear existing
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
    console.log(`  Created: ${grid.title}`)
  }

  // Add some sample comments
  const allGrids = await prisma.grid.findMany()
  const comments = [
    { text: 'This is such a cool concept!', author: 'viewer42' },
    { text: 'The side-by-side comparison is mind-blowing', author: 'musicfan' },
    { text: 'I could watch this for hours', author: 'chillguy' },
    { text: 'Finally a site that does this properly', author: 'techbro' },
    { text: 'Shared this with my whole friend group', author: 'socialbutterfly' },
  ]

  for (let i = 0; i < allGrids.length && i < comments.length; i++) {
    await prisma.comment.create({
      data: {
        gridId: allGrids[i].id,
        ...comments[i],
      },
    })
  }

  console.log(`\nSeeded ${grids.length} grids with comments!`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
