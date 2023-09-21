import { IVoteType } from '@/types/vote'

export type IGenerateVotePayloadOptions = {
  preVoteType: IVoteType | undefined
  nextVoteType: IVoteType
}

export type IMutateCountKey = 'increment' | 'decrement'

export const generateVotePayload = (
  option: IGenerateVotePayloadOptions,
): {
  nextVoteType: IVoteType | undefined
  mutationKey: IMutateCountKey
  mutationValue: number
} => {
  let nextVoteType: IVoteType | undefined = option.nextVoteType
  let mutationValue: number = 0
  const isUpvoteAcitve = option.preVoteType === 'up'
  const isDownvoteAcitve = option.preVoteType === 'down'
  if (isUpvoteAcitve) {
    mutationValue =
      nextVoteType === 'up' ? mutationValue - 1 : mutationValue - 2
    nextVoteType = nextVoteType === 'up' ? undefined : nextVoteType
  } else if (isDownvoteAcitve) {
    mutationValue =
      nextVoteType === 'down' ? mutationValue + 1 : mutationValue + 2
    nextVoteType = nextVoteType === 'down' ? undefined : nextVoteType
  } else {
    mutationValue = nextVoteType === 'up' ? 1 : -1
  }

  return {
    nextVoteType,
    mutationKey: mutationValue > 0 ? 'increment' : 'decrement',
    mutationValue: Math.abs(mutationValue),
  }
}
