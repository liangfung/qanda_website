import { DefaultErrorFallback } from '@/components/common/errorBoundary'
import { AnswerList } from '@/components/ui/answer/answerList'
import { QuestionDetail } from '@/components/ui/questionDetail'
import { fetchWrapper } from '@/lib/request'
import { ErrorBoundary } from 'react-error-boundary'
import type { Metadata, ResolvingMetadata } from 'next'
import { IResponse } from '@/types/response'
import { QuestionResponse } from '@/app/api/questions/[id]/route'
import { AnswerEditor } from '@/components/ui/answerEditor'

type Props = {
  params: { question_id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getQuestionDetail(id: string | undefined) {
  return fetchWrapper(`http://localhost:3000/api/questions/${id}`)
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.question_id
  // fetch data
  const res = await getQuestionDetail(id)
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: `Qanda_${res?.data?.title ?? ''}`,
  }
}

export const revalidate = 0

export default async function Page({ params }: Props) {
  const id = params?.question_id
  const data: IResponse<QuestionResponse> = await getQuestionDetail(id)
  if (!data?.data?.id) {
    throw new Error(data.errorMessage)
  }

  return (
    <div className="pl-4 py-4 pr-4 xl:pr-0">
      <QuestionDetail data={data.data} />
      <ErrorBoundary FallbackComponent={DefaultErrorFallback}>
        <AnswerList
          total={data?.data?.answerCount}
          question_id={data?.data?.id}
        />
      </ErrorBoundary>
      <AnswerEditor className="my-6" />
    </div>
  )
}
