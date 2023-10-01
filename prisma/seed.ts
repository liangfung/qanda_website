import { IVoteTargetType, IVoteType } from '@/types/vote'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  console.log(`Start seeding ...`)
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@gmail.com',
    },
  })

  // generate 1 question
  // const randomVotes = Math.floor(Math.random() * 100)
  const question = await prisma.question.create({
    data: {
      title: 'Sample question?',
      content: `This is a sample question for testing. This is a sample question for testing.This is a sample question for testing.This is a sample question for testing.This is a sample question for testing.This is a sample question for testing.This is a sample question for testing.
        This is a sample question for testing.
        This is a sample question for testing.This is a sample question for testing.This is a sample question for testing.This is a sample question for testing.This is a sample question for testing.This is a sample question for testing.This is a sample question for testing.This is a sample question for testing.This is a sample question for testing`,
      authorId: 1,
      voteCount: 1000,
    },
  })

  // generate 12 answers
  const answers = await Promise.all(
    Array.from({ length: 12 }, async () => {
      const randomNum = Math.floor(Math.random() * 1000) - 100
      return prisma.answer.create({
        data: {
          content: `Sample answer ${randomNum} This is a sample answer for testing.This is a sample answer for testing.
          This is a sample answer for testing.This is a sample answer for testing.This is a sample answer for testing.This is a sample answer for testing.This is a sample answer for testing.This is a sample answer for testing.`,
          questionId: question.id,
          authorId: 1,
          voteCount: randomNum,
        },
      })
    }),
  )

  // vote record
  const vote1 = await prisma.vote.create({
    data: {
      type: IVoteType.up,
      targetId: question.id,
      targetType: IVoteTargetType.question,
      authorId: 1,
    },
  })

  const vote2 = await prisma.vote.create({
    data: {
      type: IVoteType.down,
      targetId: 2,
      targetType: IVoteTargetType.answer,
      authorId: 1,
    },
  })

  // QuestionVote record
  await prisma.questionVote.create({
    data: {
      questionId: question.id,
      voteId: vote1.id,
      authorId: 1,
    },
  })
  await prisma.answerVote.create({
    data: {
      answerId: 2,
      voteId: vote2.id,
      authorId: 1,
    },
  })

  console.log(`Seeding finished.`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
