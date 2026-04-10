import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { text, author } = await req.json()

  if (!text?.trim()) {
    return NextResponse.json({ error: 'Comment text is required' }, { status: 400 })
  }

  const comment = await prisma.comment.create({
    data: {
      gridId: id,
      text: text.trim(),
      author: author?.trim() || 'Anonymous',
    },
  })

  return NextResponse.json(comment, { status: 201 })
}
