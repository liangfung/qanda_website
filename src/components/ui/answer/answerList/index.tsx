'use client'

import { useDebounce, useRequest, useUpdateEffect } from 'ahooks'
import { AnswerContentCard } from '../answerContentCard'
import { useState } from 'react'
import { fetchWrapper } from '@/lib/request'
import { ORDER_TYPE, OrderSelect } from '../../orderSelect'
import { DefaultErrorFallback } from '@/components/common/errorBoundary'
import {
  CardSkeleton,
  CardsSkeleton,
} from '@/components/widgets/skeleton/CardSkeleton'
import { ErrorBoundary } from 'react-error-boundary'
import { useThrowError } from '@/hooks/useThrowError'
import { LoadMoreIndicatorRender } from '@/components/common/loadMoreIndicator'
import { DEFAULT_PAGE_SIZE } from '@/constant'
import { useSearchParams } from 'next/navigation'
import { Vote } from '@/components/widgets/vote'
import { AnswersListResponse } from '@/app/api/answers/route'
import { IResponse } from '@/types/response'
import { IVotePayload } from '@/components/widgets/vote/type.vote'
import { UpdateVoteRequest } from '@/app/api/vote/route'
import toast, { Toaster } from 'react-hot-toast'

interface Props extends ComponentBaseProps {
  question_id: number
  total: number | undefined
}

export const AnswerList: React.FC<Props> = ({
  className,
  total = 0,
  question_id,
}) => {
  const searchParams = useSearchParams()
  const orderInSearchParams = searchParams.get('order')?.toString()
  const [answers, setAnwers] = useState<AnswersListResponse['answers']>([])
  const [nextScore, setNextScore] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [order, setOrder] = useState<ORDER_TYPE>(
    (orderInSearchParams || ORDER_TYPE.SCORE_DESC) as ORDER_TYPE,
  )
  const [loadMoreError, setLoadMoreError] = useState<string | undefined>(
    undefined,
  )

  const { throwError } = useThrowError()

  const { loading, data, run } = useRequest(
    () =>
      fetchWrapper<AnswersListResponse>('/api/answers', {
        method: 'post',
        next: { revalidate: 0 },
        body: JSON.stringify({
          nextScore,
          limit: DEFAULT_PAGE_SIZE,
          order,
          questionId: question_id,
        }),
      }),
    {
      onBefore: () => {
        if (loadMoreError) {
          setLoadMoreError(undefined)
        }
      },
      onSuccess: (res: IResponse<AnswersListResponse>) => {
        // fetch failed
        if (!res.success) {
          if (nextScore === 0) {
            throwError(res?.errorMessage ?? 'Something went wrong')
          } else {
            setLoadMoreError(res?.errorMessage ?? 'Something went wrong')
          }
          return
        }

        const { pagination, answers } = res?.data || {}
        setAnwers((prev = []) => [
          ...prev.slice(0, nextScore),
          ...(answers || []),
        ])
        setHasMore(pagination?.hasMore ?? false)
        setNextScore(pagination?.nextScore ?? 0)
      },
    },
  )

  const showLoading = useDebounce(nextScore === 0 && loading, { wait: 200 })

  const loadMore = () => {
    run()
  }

  const onChangeOrder = (v: ORDER_TYPE) => {
    // router.replace(`${pathname}?order=${v}`, { scroll: false })
    setNextScore(0)
    setOrder(v)
  }

  const handleVote = (
    e: IVotePayload,
    answerId: number,
    voteId: number | undefined,
  ) => {
    setAnwers((prev) => {
      if (!prev) return prev
      const index = prev.findIndex((item) => item.id === answerId)
      if (index === -1) return prev
      const next = [...prev]
      next[index] = {
        ...next[index],
        ...e.nextVote,
      }
      return next
    })
    const payload: UpdateVoteRequest = {
      targetId: answerId,
      targetType: 'answer',
      voteType: e.voteType,
      voteId,
    }
    fetchWrapper('/api/vote', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.success) return
      toast.error(res.errorMessage || res.errorCode || 'Something went wrong')
      setAnwers((cur) => {
        if (!cur) return cur
        const index = cur.findIndex((item) => item.id === answerId)
        if (index === -1) return cur
        const next = [...cur]
        next[index] = {
          ...next[index],
          ...e.prevVote,
        }
        return next
      })
    })
  }

  useUpdateEffect(() => {
    run()
  }, [order])

  return (
    <>
      <div className={`${className ?? ''} flex flex-col gap-8`}>
        <div className="flex justify-between items-center mb-4">
          <div className="font-blod text-2xl">{total} Answers</div>
          <div className="flex items-start gap-1 flex-col md:flex-row md:items-center md:gap-2">
            <span className="text-xs">Sorted by:</span>
            <OrderSelect onChange={onChangeOrder} value={order} />
          </div>
        </div>
        {showLoading ? (
          <CardsSkeleton />
        ) : (
          <>
            {answers?.map((answer) => {
              return (
                <div key={answer.id} className="flex gap-4 border-b pb-4">
                  <Vote
                    voteCount={answer.voteCount ?? 0}
                    onVote={(e) => handleVote(e, answer.id, answer.voteId)}
                    voteType={answer?.voteType}
                  />
                  <div className="flex-1 flex-col">
                    <AnswerContentCard data={answer} />
                  </div>
                </div>
              )
            })}
            {hasMore && (
              <ErrorBoundary
                onReset={() => setLoadMoreError(undefined)}
                FallbackComponent={DefaultErrorFallback}
              >
                <LoadMoreIndicatorRender
                  errorMessage={loadMoreError}
                  onLoading={loadMore}
                >
                  <CardSkeleton />
                </LoadMoreIndicatorRender>
              </ErrorBoundary>
            )}
          </>
        )}
      </div>
      <Toaster />
    </>
  )
}
