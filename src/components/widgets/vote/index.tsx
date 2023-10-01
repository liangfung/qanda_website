'use client'

import { formatNumberUnit } from '@/utils'
import { VoteButton } from './voteButton'
import { IVotePayload } from './type.vote'
import { IVoteType } from '@/types/vote'
import { IMutateCountKey, generateVotePayload } from '@/utils/vote'
interface Props extends ComponentBaseProps {
  voteCount: number
  onVote: (p: IVotePayload) => void
  voteType?: IVoteType
  disabled?: boolean
}

export const Vote: React.FC<Props> = ({
  voteCount,
  disabled,
  voteType,
  onVote,
}) => {
  const isUpVoteActive = voteType === IVoteType.up
  const isDownVoteActive = voteType === IVoteType.down

  const handleClickButton = (nextVoteType: IVoteType) => {
    let payload = generateVotePayload({
      preVoteType: voteType,
      nextVoteType,
    })
    onVote?.({
      voteType: nextVoteType,
      prevVote: {
        voteType: voteType,
        voteCount: voteCount,
      },
      nextVote: {
        voteType: payload.nextVoteType,
        voteCount:
          payload.mutationKey === IMutateCountKey.increment
            ? voteCount + payload.mutationValue
            : voteCount - payload.mutationValue,
      },
    })
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <VoteButton
        voteType={IVoteType.up}
        isActive={isUpVoteActive}
        onChange={() => handleClickButton(IVoteType.up)}
      />
      {formatNumberUnit(voteCount)}
      <VoteButton
        voteType={IVoteType.down}
        isActive={isDownVoteActive}
        onChange={() => handleClickButton(IVoteType.down)}
      />
    </div>
  )
}
