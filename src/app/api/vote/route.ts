import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { IVoteType, IVoteTargetType } from '@/types/vote'
import {
  IGenerateVotePayload,
  IMutateCountKey,
  generateVotePayload,
} from '@/utils/vote'

export type ITransactionContext = Omit<
  typeof prisma,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>

export interface UpdateVoteResponse {}

export interface UpdateVoteRequest {
  targetId: number
  targetType: string
  voteType: IVoteType
}

export const POST = async (request: NextRequest) => {
  const body: UpdateVoteRequest = await request.json()
  if (!body) return NextResponse.json({}, { status: 400 })

  // mock
  const authorId = 1
  const { targetType, targetId, voteType } = body

  const transaction = await prisma.$transaction(async (tx) => {
    try {
      // 1. delete vote relation record
      const voteRelationRecord = await deleteVoteRelationByType(
        { ...body, authorId },
        tx,
      )

      const prevVote = voteRelationRecord
        ? await findVoteRecord(tx, voteRelationRecord.voteId)
        : undefined

      const preVoteType = prevVote?.type

      // if (prevVote?.id) {
      //   await tx.vote.delete({
      //     where: { id: prevVote.id },
      //   });
      // }

      const payload = generateVotePayload({
        preVoteType: preVoteType as IVoteType | undefined,
        nextVoteType: voteType,
      })

      // 2. create new vote record
      let newVoteId: number | undefined = undefined
      if (payload.nextVoteType) {
        const newVoteRecord = await createVoteRecord(tx, {
          targetType,
          targetId,
          authorId,
          type: payload.nextVoteType,
        })
        newVoteId = newVoteRecord.id
      }

      // 3. create question vote or answer vote record
      await createVoteRecordByType({ ...body, authorId }, newVoteId, tx)

      // 4. update vote cout
      await updateVoteCountByType({ ...body, authorId }, payload, tx)

      return true
    } catch (error) {
      console.error('Transaction failed:', error)
      throw error
    }
  })

  if (!transaction) return NextResponse.json({}, { status: 500 })

  return NextResponse.json(null, { status: 200 })
}

async function createVoteRecord(
  tx: ITransactionContext,
  data: {
    targetType: string
    targetId: number
    authorId: number
    type: IVoteType
  },
) {
  return tx.vote.create({
    data,
  })
}

async function deleteVoteRelationByType(
  { targetType, targetId, authorId }: UpdateVoteRequest & { authorId: number },
  tx: ITransactionContext,
) {
  try {
    let voteRecord = null
    if (targetType === IVoteTargetType.question) {
      voteRecord = await findQuestionVoteRecord(tx, {
        questionId: targetId,
        authorId,
      })
      if (voteRecord) await deleteQuestionVoteRecord(tx, voteRecord.id)
    } else {
      voteRecord = await findAnswerVoteRecord(tx, {
        answerId: targetId,
        authorId,
      })
      if (voteRecord) deleteAnswerVoteRecord(tx, voteRecord.id)
    }
    return voteRecord
  } catch (error) {
    throw new Error(String(error))
  }
}

async function createVoteRecordByType(
  { targetType, targetId, authorId }: UpdateVoteRequest & { authorId: number },
  newVoteId: number | undefined,
  tx: ITransactionContext,
) {
  try {
    if (targetType === IVoteTargetType.question) {
      if (newVoteId) {
        await createQuestionVoteRecord(tx, {
          voteId: newVoteId,
          questionId: targetId,
          authorId,
        })
      }
    } else {
      if (newVoteId) {
        await createAnswerVoteRecord(tx, {
          voteId: newVoteId,
          answerId: targetId,
          authorId,
        })
      }
    }
  } catch (e) {
    throw new Error(String(e))
  }
}

async function updateVoteCountByType(
  { targetType, targetId }: UpdateVoteRequest & { authorId: number },
  payload: IGenerateVotePayload,
  tx: ITransactionContext,
) {
  try {
    if (targetType === IVoteTargetType.question) {
      await updateVoteCountOfQuestion(tx, {
        id: targetId,
        opKey: payload.mutationKey,
        count: payload.mutationValue,
      })
    } else {
      await updateVoteCountOfAnswer(tx, {
        id: targetId,
        opKey: payload.mutationKey,
        count: payload.mutationValue,
      })
    }
  } catch (e) {
    throw new Error(String(e))
  }
}

async function createQuestionVoteRecord(
  tx: ITransactionContext,
  data: {
    voteId: number
    questionId: number
    authorId: number
  },
) {
  return tx.questionVote.create({
    data,
  })
}

async function createAnswerVoteRecord(
  tx: ITransactionContext,
  data: {
    voteId: number
    answerId: number
    authorId: number
  },
) {
  return tx.answerVote.create({
    data,
  })
}

async function deleteQuestionVoteRecord(tx: ITransactionContext, id: number) {
  if (!id) return
  return tx.questionVote.delete({
    where: {
      id,
    },
  })
}

async function deleteAnswerVoteRecord(tx: ITransactionContext, id: number) {
  if (!id) return
  return tx.answerVote.delete({
    where: {
      id,
    },
  })
}

async function findQuestionVoteRecord(
  tx: ITransactionContext,
  data: {
    questionId: number
    authorId: number
  },
) {
  return tx.questionVote.findFirst({
    where: data,
  })
}

async function findAnswerVoteRecord(
  tx: ITransactionContext,
  data: {
    answerId: number
    authorId: number
  },
) {
  return tx.answerVote.findFirst({
    where: data,
  })
}

async function findVoteRecord(tx: ITransactionContext, voteId: number) {
  return tx.vote.findFirst({
    where: { id: voteId },
  })
}

async function updateVoteCountOfAnswer(
  tx: ITransactionContext,
  data: {
    id: number
    opKey: IMutateCountKey
    count: number
  },
) {
  const { id, opKey, count } = data
  return tx.answer.update({
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

async function updateVoteCountOfQuestion(
  tx: ITransactionContext,
  data: {
    id: number
    opKey: IMutateCountKey
    count: number
  },
) {
  const { id, opKey, count } = data
  return tx.question.update({
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
