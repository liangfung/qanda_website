'use client'

import { Vote } from '@/components/widgets/vote'
import { IVotePayload } from '@/components/widgets/vote/type.vote'
import { fetchWrapper } from '@/lib/request'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import dayjs from 'dayjs'
import { QuestionResponse } from '@/app/api/questions/[id]/route'
import { EditInfoFooter } from '../editInfoFooter'
import { MarkDown } from '@/components/widgets/markdown'
import { UpdateVoteRequest } from '@/app/api/vote/route'
import { IVoteTargetType } from '@/types/vote'

interface Props extends ComponentBaseProps {
  data: QuestionResponse
}
export const QuestionDetail: React.FC<Props> = ({ data }) => {
  const [detail, setDetail] = useState(data)

  const onVote = (p: IVotePayload) => {
    setDetail((d) => ({ ...d, ...p.nextVote }))
    const payload: UpdateVoteRequest = {
      targetId: detail.id,
      targetType: IVoteTargetType.question,
      voteType: p.voteType,
    }
    fetchWrapper('/api/vote', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.success) return
      toast.error(res.errorMessage || res.errorCode || 'Something went wrong')
      setDetail((d) => ({
        ...d,
        ...p.prevVote,
      }))
    })
  }

  return (
    <>
      <h2 className="text-2xl mb-4">{detail.title}</h2>
      <div className="lg:flex border-b pb-4 mb-4 sm:flex-col lg:flex-row  gap-2 text-sm">
        <div>Asked {dayjs(detail.createdAt).format('YYYY-MM-DD HH:mm')}</div>
        <div>Modifyed 3 days age</div>
        <div>Viewed 11k items</div>
      </div>
      <div className="flex gap-4 mb-8 border-b pb-4">
        <Vote
          voteCount={detail.voteCount}
          voteType={detail.voteType}
          onVote={onVote}
        />
        <div className="flex-1">
          <MarkDown data={detail.content} />
          <EditInfoFooter
            type={IVoteTargetType.question}
            targetId={detail.id}
          />
        </div>
      </div>
      <Toaster />
    </>
  )
}
