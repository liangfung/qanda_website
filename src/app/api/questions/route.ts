import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const POST = async (request: NextRequest, context: any) => {
  const body = await request.json()

  const skip = Number(body.nextScore) || 0
  const take = Number(body.limit) || 10

  const count = await prisma.question.count()
  let orderBy: Record<string, 'desc' | 'asc'> = { voteCount: 'desc' }
  const answers = await prisma.question.findMany({
    take,
    skip,
    orderBy,
  })

  return NextResponse.json({
    answers,
    pagination: {
      hasMore: count > take + skip,
      nextScore: take + skip,
      total: count,
    },
  })
}
