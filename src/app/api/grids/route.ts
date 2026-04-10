import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/grids — list grids
export async function GET(req: NextRequest) {
  const sort = req.nextUrl.searchParams.get('sort') || 'hot'
  const category = req.nextUrl.searchParams.get('category')

  const where = category ? { category } : {}

  let orderBy: Record<string, string>
  switch (sort) {
    case 'new':
      orderBy = { createdAt: 'desc' }
      break
    case 'top':
      orderBy = { upvotes: 'desc' }
      break
    default: // hot = recent + upvotes
      orderBy = { createdAt: 'desc' }
  }

  const grids = await prisma.grid.findMany({
    where,
    include: { videos: { orderBy: { position: 'asc' } }, _count: { select: { comments: true } } },
    orderBy,
    take: 50,
  })

  return NextResponse.json(grids)
}

// POST /api/grids — create a grid
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, description, author, category, videos } = body

  if (!title || !videos?.length) {
    return NextResponse.json({ error: 'Title and at least one video required' }, { status: 400 })
  }

  const grid = await prisma.grid.create({
    data: {
      title,
      description: description || '',
      author: author || 'Anonymous',
      category: category || 'General',
      videos: {
        create: videos.map((v: { url: string; embedUrl: string; title: string; thumbnail: string; site: string }, i: number) => ({
          url: v.url,
          embedUrl: v.embedUrl,
          title: v.title,
          thumbnail: v.thumbnail || '',
          site: v.site || 'generic',
          position: i,
        })),
      },
    },
    include: { videos: true },
  })

  return NextResponse.json(grid, { status: 201 })
}
