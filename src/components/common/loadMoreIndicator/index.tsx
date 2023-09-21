'use client'

import React, { useEffect, useRef } from 'react'
import { useInViewport } from 'ahooks'
import type { FC, PropsWithChildren } from 'react'
import { useThrowError } from '@/hooks/useThrowError'
import { DefaultErrorFallback, ErrorBoundary } from '../errorBoundary'

interface Props extends ComponentBaseProps {
  onLoading: () => void
  errorMessage?: string
}
export const LoadMoreIndicatorRender: FC<PropsWithChildren<Props>> = ({
  onLoading,
  children,
  className,
  errorMessage,
}) => {
  const ref = useRef(null)
  const [isInViewPort] = useInViewport(ref)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const { throwError } = useThrowError()
  useEffect(() => {
    if (isInViewPort && !isLoaded) {
      setIsLoaded(true)
      onLoading?.()
    }
  }, [isInViewPort])

  useEffect(() => {
    if (errorMessage) {
      throwError(errorMessage)
    }
  }, [errorMessage])

  return (
    <div className={className} ref={ref}>
      {children ?? <div>loading...</div>}
    </div>
  )
}

export const LoadMoreIndicator: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <ErrorBoundary FallbackComponent={DefaultErrorFallback}>
      <LoadMoreIndicatorRender {...props} />
    </ErrorBoundary>
  )
}
