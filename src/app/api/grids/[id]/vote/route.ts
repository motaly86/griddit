import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { value } = await req.json()
  const sessionId = req.cookies.get('griddit_session')?.value || req.headers.get('x-forwarded-for') || 'anon'

  if (value !== 1 && value !== -1) {
    return NextResponse.json({ error: 'Value must be 1 or -1' }, { status: 400 })
  }

  // Upsert vote
  const existing = await prisma.vote.findUnique({
    where: { gridId_sessionId: { gridId: id, sessionId } },
  })

  if (existing) {
    if (existing.value === value) {
      // Undo vote
      await prisma.vote.delete({ where: { id: existing.id } })
      await prisma.grid.update({
        where: { id },
        data: value === 1 ? { upvotes: { decrement: 1 } } : { downvotes: { decrement: 1 } },
      })
      return NextResponse.json({ voted: null })
    } else {
      // Switch vote
      await prisma.vote.update({ where: { id: existing.id }, data: { value } })
      await prisma.grid.update({
        where: { id },
        data:
          value === 1
            ? { upvotes: { increment: 1 }, downvotes: { decrement: 1 } }
            : { upvotes: { decrement: 1 }, downvotes: { increment: 1 } },
      })
      return NextResponse.json({ voted: value })
    }
  }

  // New vote
  await prisma.vote.create({ data: { gridId: id, sessionId, value } })
  await prisma.grid.update({
    where: { id },
    data: value === 1 ? { upvotes: { increment: 1 } } : { downvotes: { increment: 1 } },
  })

  return NextResponse.json({ voted: value })
}
