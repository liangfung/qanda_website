import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Question } from '@prisma/client'
import { IVoteType } from '@/types/vote'

export interface QuestionResponse extends Question {
  voteType?: IVoteType
  voteId?: number
  answerCount?: number
}

export const GET = async (req: NextRequest, context: any) => {
  const id = context.params.id
  const questionId = Number(id)
  const question = await prisma.question.findUnique({
    where: { id: Number(id) },
  })
  if (!question) return NextResponse.json({}, { status: 404 })

  const [answerCount, questionVote] = await Promise.all([
    prisma.answer.count({
      where: { questionId },
    }),
    prisma.questionVote.findFirst({
      where: {
        questionId,
        authorId: 1,
      },
      include: {
        vote: {
          select: {
            id: true,
            targetId: true,
            targetType: true,
          },
        },
      },
    }),
  ])

  if (!questionVote)
    return NextResponse.json<QuestionResponse>({
      ...question,
      voteType: undefined,
      voteId: undefined,
      answerCount,
    })

  const vote = await prisma.vote.findUnique({
    where: { id: questionVote?.vote?.id },
    select: {
      id: true,
      type: true,
    },
  })

  return NextResponse.json<QuestionResponse>({
    ...question,
    voteType: vote?.type as IVoteType | undefined,
    voteId: vote?.id,
    answerCount,
  })
}
