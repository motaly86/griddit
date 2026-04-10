import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const grid = await prisma.grid.update({
    where: { id },
    data: { views: { increment: 1 } },
    include: {
      videos: { orderBy: { position: 'asc' } },
      comments: { orderBy: { createdAt: 'desc' } },
      _count: { select: { comments: true } },
    },
  })

  if (!grid) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(grid)
}
