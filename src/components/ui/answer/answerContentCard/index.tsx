'use client'

import { Answer } from '@prisma/client'
import { EditInfoFooter } from '../../editInfoFooter'
import { MarkDown } from '@/components/widgets/markdown'

interface Props extends ComponentBaseProps {
  data: Answer | undefined
}

export const AnswerContentCard: React.FC<Props> = ({ data }) => {
  if (!data) return null
  return (
    <>
      <MarkDown data={data.content} />
      <EditInfoFooter type="answer" targetId={data.id} />
    </>
  )
}
