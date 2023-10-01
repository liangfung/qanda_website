import { IVoteType } from '@/types/vote'

export type IGenerateVotePayloadOptions = {
  preVoteType: IVoteType | undefined
  nextVoteType: IVoteType
}

export enum IMutateCountKey {
  'increment' = 'increment',
  'decrement' = 'decrement',
}

export type IGenerateVotePayload = ReturnType<typeof generateVotePayload>

export const generateVotePayload = (
  option: IGenerateVotePayloadOptions,
): {
  nextVoteType: IVoteType | undefined
  mutationKey: IMutateCountKey
  mutationValue: number
} => {
  let nextVoteType: IVoteType | undefined = option.nextVoteType
  let mutationValue: number = 0
  const isUpvoteAcitve = option.preVoteType === IVoteType.up
  const isDownvoteAcitve = option.preVoteType === IVoteType.down
  if (isUpvoteAcitve) {
    mutationValue =
      nextVoteType === IVoteType.up ? mutationValue - 1 : mutationValue - 2
    nextVoteType = nextVoteType === IVoteType.up ? undefined : nextVoteType
  } else if (isDownvoteAcitve) {
    mutationValue =
      nextVoteType === IVoteType.down ? mutationValue + 1 : mutationValue + 2
    nextVoteType = nextVoteType === IVoteType.down ? undefined : nextVoteType
  } else {
    mutationValue = nextVoteType === IVoteType.up ? 1 : -1
  }

  return {
    nextVoteType,
    mutationKey:
      mutationValue > 0 ? IMutateCountKey.increment : IMutateCountKey.decrement,
    mutationValue: Math.abs(mutationValue),
  }
}
