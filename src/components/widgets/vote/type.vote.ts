import { OP } from '@/constant/enum'
import { IVoteType } from '@/types/vote'

export interface IVotePayload {
  voteType: IVoteType
  prevVote: {
    voteCount: number
    voteType: IVoteType | undefined
  }
  nextVote: {
    voteCount: number
    voteType: IVoteType | undefined
  }
}
