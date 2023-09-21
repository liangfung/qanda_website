import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { ORDER_TYPE } from '@/components/ui/orderSelect'
import { IVoteType } from '@/types/vote'
import { Answer } from '@prisma/client'
import { IPagination } from '@/types/response'

export interface AnswersListResponse {
  answers?: Array<
    Answer & { voteType: IVoteType | undefined; voteId: number | undefined }
  >
  pagination?: IPagination
}

export const POST = async (request: NextRequest, context: any) => {
  const body = await request.json()

  const order = body?.order || ORDER_TYPE.SCORE_DESC
  const questionId = Number(body.questionId)
  const skip = Number(body.nextScore) || 0
  const take = Number(body.limit) || 10

  const count = await prisma.answer.count({
    where: { questionId },
  })
  let orderBy: Record<string, 'desc' | 'asc'> = { voteCount: 'desc' }
  if (order === 'CREATE_TIME_DESC') {
    orderBy = { createdAt: 'desc' }
  }
  const answers = await prisma.answer.findMany({
    where: { questionId },
    take,
    skip,
    orderBy,
  })
  const enrichedAnswers = await Promise.all(
    answers.map(async (answer) => {
      let voteType: IVoteType | undefined = undefined
      let voteId: number | undefined = undefined
      const authorVote = await prisma.answerVote.findFirst({
        where: {
          answerId: answer.id,
          authorId: 1,
        },
      })

      if (authorVote) {
        const vote = await prisma.vote.findFirst({
          where: {
            id: authorVote.voteId,
          },
          select: {
            type: true,
            id: true,
          },
        })
        voteType = vote?.type as IVoteType | undefined
        voteId = vote?.id
      }

      return {
        ...answer,
        voteType,
        voteId,
      }
    }),
  )

  return NextResponse.json<AnswersListResponse>({
    answers: enrichedAnswers ?? [],
    pagination: {
      hasMore: count > take + skip,
      nextScore: take + skip,
      total: count,
    },
  })
}
