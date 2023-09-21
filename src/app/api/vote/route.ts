import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { IVoteType } from '@/types/vote'
import { IMutateCountKey, generateVotePayload } from '@/utils/vote'

export interface UpdateVoteResponse {}

export interface UpdateVoteRequest {
  targetId: number
  voteId?: number
  voteType?: IVoteType
  targetType: string
}

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  if (!body) return NextResponse.json({}, { status: 400 })

  const { targetType, targetId, voteType, voteId } = body
  const authorId = 1

  const transaction = await prisma.$transaction(async (prisma) => {
    try {
      // 1. find vote record
      if (voteId) {
        let voteRecord = null
        if (targetType === 'question') {
          voteRecord = await findQuestionVoteRecord({
            voteId,
            questionId: targetId,
            authorId: 1,
          })
          if (voteRecord) await deleteQuestionVoteRecord(voteRecord.id)
        } else {
          voteRecord = await findAnswerVoteRecord({
            voteId,
            answerId: targetId,
            authorId: 1,
          })
          // 2. if vote record exists, update vote record
          if (voteRecord) deleteAnswerVoteRecord(voteRecord.id)
        }
      }

      const prevVote = voteId ? await findVoteRecord(voteId) : undefined

      const preVoteType = prevVote?.type

      const payload = generateVotePayload({
        preVoteType: preVoteType as IVoteType | undefined,
        nextVoteType: voteType,
      })

      // create new vote record
      let newVoteId: number | undefined = undefined
      if (payload.nextVoteType) {
        const newVoteRecord = await createVoteRecord({
          targetType,
          targetId,
          authorId,
          type: payload.nextVoteType,
        })
        newVoteId = newVoteRecord.id
      }

      // create question vote or answer vote record
      if (targetType === 'question') {
        if (newVoteId) {
          await createQuestionVoteRecord({
            voteId: newVoteId,
            questionId: targetId,
            authorId,
          })
        }
        await updateQuestionVoteCount(
          targetId,
          payload.mutationKey,
          payload.mutationValue,
        )
      } else {
        if (newVoteId) {
          await createAnswerVoteRecord({
            voteId: newVoteId,
            answerId: targetId,
            authorId,
          })
        }
        await updateAnswerVoteCount(
          targetId,
          payload.mutationKey,
          payload.mutationValue,
        )
      }

      return true
    } catch (error) {
      console.error('Transaction failed:', error)
      throw error
    }
  })

  if (!transaction) return NextResponse.json({}, { status: 500 })

  return NextResponse.json(null, { status: 200 })
}

async function createVoteRecord(data: {
  targetType: string
  targetId: number
  authorId: number
  type: IVoteType
}) {
  return prisma.vote.create({
    data,
  })
}

async function createQuestionVoteRecord(data: {
  voteId: number
  questionId: number
  authorId: number
}) {
  return prisma.questionVote.create({
    data,
  })
}

async function createAnswerVoteRecord(data: {
  voteId: number
  answerId: number
  authorId: number
}) {
  return prisma.answerVote.create({
    data,
  })
}

// 是否需要手动删除？
async function deleteQuestionVoteRecord(id: number) {
  if (!id) return
  return prisma.questionVote.delete({
    where: {
      id,
    },
  })
}

// 是否需要手动删除？
async function deleteAnswerVoteRecord(id: number) {
  if (!id) return
  return prisma.questionVote.delete({
    where: {
      id,
    },
  })
}

async function findQuestionVoteRecord(data: {
  voteId: number
  questionId: number
  authorId: number
}) {
  return prisma.questionVote.findFirst({
    where: data,
  })
}

async function findAnswerVoteRecord(data: {
  voteId: number
  answerId: number
  authorId: number
}) {
  return prisma.answerVote.findFirst({
    where: data,
  })
}

async function findVoteRecord(voteId: number) {
  return prisma.vote.findFirst({
    where: { id: voteId },
  })
}

async function updateAnswerVoteCount(
  id: number,
  opKey: IMutateCountKey,
  count: number,
) {
  return prisma.answer.update({
    where: {
      id,
    },
    data: {
      voteCount: {
        [opKey]: count,
      },
    },
  })
}

async function updateQuestionVoteCount(
  id: number,
  opKey: IMutateCountKey,
  count: number,
) {
  return prisma.question.update({
    where: {
      id,
    },
    data: {
      voteCount: {
        [opKey]: count,
      },
    },
  })
}
