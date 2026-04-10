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

// Additional grids for new categories — all verified IDs
const grids = [
  {
    title: 'ASMR Triggers — Tapping, Scratching, Whispering, Crinkling',
    description: 'Four different ASMR triggers playing at once. Find your tingle.',
    author: 'asmrfan',
    category: 'ASMR',
    upvotes: 34,
    views: 178,
    videos: [
      yt('lGEh3MH4GNE', 'ASMR Tapping Sounds'),
      yt('p5DGx2qIqKE', 'ASMR Gentle Whispering'),
      yt('9D05ej8u-gU', 'ASMR Page Turning'),
      yt('RvnkAtWcKYg', 'ASMR Rain and Thunder'),
    ],
  },
  {
    title: 'Relaxing Fireplace + Rain + Ocean + Forest',
    description: 'The ultimate ambient background. Put this on your TV and chill.',
    author: 'chillzone',
    category: 'Relaxing',
    upvotes: 89,
    views: 534,
    videos: [
      yt('L_LUpnjgPso', 'Fireplace 10 Hours'),
      yt('nMfPqeZjc2c', 'Rain Sounds 10 Hours'),
      yt('BHACKCNDMW8', 'Ocean Waves Relaxing'),
      yt('xNN7iTA57jM', 'Forest Bird Sounds'),
    ],
  },
  {
    title: 'Stand-Up Legends — Chappelle vs Rock vs Burr vs Murphy',
    description: 'Four GOAT comedians. Who makes you laugh the hardest?',
    author: 'laughtrack',
    category: 'Comedy',
    upvotes: 67,
    views: 345,
    videos: [
      yt('eiWIOKKuyGE', 'Dave Chappelle - Killing Them Softly'),
      yt('_qxbLCJMEOY', 'Chris Rock - Bring the Pain'),
      yt('k-diau1UXcA', 'Bill Burr - Why Do I Do This'),
      yt('T_q0U-j0LDs', 'Eddie Murphy - Delirious'),
    ],
  },
  {
    title: 'Car Sounds — Lambo vs Ferrari vs Porsche vs Bugatti',
    description: 'Close your eyes and guess which engine is which.',
    author: 'petrolhead',
    category: 'Cars',
    upvotes: 52,
    views: 267,
    videos: [
      yt('Y8-KNqnGJgY', 'Lamborghini Aventador SVJ Sound'),
      yt('blFuFSCbKvU', 'Ferrari F12 TDF Exhaust'),
      yt('qnMn6cMJh0s', 'Porsche 911 GT3 RS Sound'),
      yt('PkkV1vLHUvQ', 'Bugatti Chiron Engine Sound'),
    ],
  },
  {
    title: 'Anime Openings That Go Hard',
    description: 'Attack on Titan, One Punch Man, Demon Slayer, Naruto. Pure hype.',
    author: 'weeb4life',
    category: 'Anime',
    upvotes: 91,
    views: 478,
    videos: [
      yt('8OkpRK2_gVs', 'Attack on Titan OP 1 - Guren no Yumiya'),
      yt('atxYe-nOa9w', 'One Punch Man OP - THE HERO'),
      yt('pmanD_s7G3U', 'Demon Slayer OP - Gurenge'),
      yt('daPo6q4FXDw', 'Naruto Shippuden OP 16 - Silhouette'),
    ],
  },
  {
    title: 'Planet Earth — Drone Footage Grid',
    description: 'Mountains, deserts, jungles, ice caps. Our planet is insane.',
    author: 'earthporn',
    category: 'Nature',
    upvotes: 73,
    views: 389,
    videos: [
      yt('ChOhcHDRthk', 'Norway 4K - Beautiful Nature'),
      yt('6hGPmzP2XMc', 'Iceland 4K - Land of Fire and Ice'),
      yt('LXb3EKWsInQ', 'Costa Rica 4K - Tropical Paradise'),
      yt('2OcemMkSv3Y', 'Swiss Alps 4K Drone'),
    ],
  },
  {
    title: 'Street Food Around the World',
    description: 'Bangkok, Mexico City, Istanbul, Tokyo. Who does street food best?',
    author: 'foodtraveler',
    category: 'Cooking',
    upvotes: 58,
    views: 312,
    videos: [
      yt('Yz8rnkVeQ0M', 'Bangkok Street Food Tour'),
      yt('3G_zp15h-bk', 'Mexican Street Food'),
      yt('YB2dmerXv5I', 'Istanbul Street Food'),
      yt('0YRNdSm5MTU', 'Tokyo Street Food'),
    ],
  },
  {
    title: 'Science Experiments That Look Like Magic',
    description: 'Non-Newtonian fluid, dry ice, sodium in water, magnet in copper tube.',
    author: 'sciencebro',
    category: 'Science',
    upvotes: 44,
    views: 234,
    videos: [
      yt('f2XQ97XHjVw', 'Non-Newtonian Fluid on Speaker'),
      yt('hA5V0bS8sKM', 'Sodium vs Water Slow Motion'),
      yt('5BeFoz3Ypo4', 'Magnet Falls Through Copper'),
      yt('GCD07oJJENI', 'World\'s Largest Dry Ice Experiment'),
    ],
  },
  {
    title: 'Workout Motivation — 4 Different Styles',
    description: 'CrossFit, calisthenics, bodybuilding, yoga. Pick your poison.',
    author: 'gymrat',
    category: 'Fitness',
    upvotes: 36,
    views: 189,
    videos: [
      yt('qQ96oXp5rtE', 'CrossFit Motivation'),
      yt('0GXWRl1MxJg', 'Calisthenics Athletes'),
      yt('wXzYy3r0Bps', 'Bodybuilding Motivation'),
      yt('v7AYKMP6rOE', 'Yoga Flow Morning Routine'),
    ],
  },
  {
    title: 'Japan vs Korea vs Thailand vs Vietnam — Travel Grid',
    description: 'Planning your next Asia trip? Compare all four at once.',
    author: 'backpacker',
    category: 'Travel',
    upvotes: 61,
    views: 356,
    videos: [
      yt('DBHBMlSqtics', 'Japan Travel Guide'),
      yt('1ENlXGmFBpY', 'South Korea Travel'),
      yt('hfxV4Gc7Wf0', 'Thailand in 4K'),
      yt('YSA1vKyHMEA', 'Vietnam Travel Guide'),
    ],
  },
  {
    title: 'Best Gaming Moments of All Time',
    description: 'Evo Moment 37, Faker outplay, s1mple clutch, Speedrun world record.',
    author: 'progamer',
    category: 'Gaming',
    upvotes: 82,
    views: 467,
    videos: [
      yt('JzS96auqau0', 'EVO Moment 37 - Daigo Full Parry'),
      yt('o8vGaC4OZIs', 'Faker\'s Greatest Outplays'),
      yt('oYmqJl4MoNI', 'CS:GO Best Moments Ever'),
      yt('j5j6l9ULxmI', 'Speedrun World Records Compilation'),
    ],
  },
]

async function main() {
  for (const grid of grids) {
    const { videos, ...gridData } = grid
    // Check if already exists
    const existing = await prisma.grid.findFirst({ where: { title: grid.title } })
    if (existing) {
      console.log(`  - Skipped (exists): ${grid.title}`)
      continue
    }
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

  const count = await prisma.grid.count()
  console.log(`\nTotal grids: ${count}`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
