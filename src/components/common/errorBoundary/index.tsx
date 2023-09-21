'use client'

import {
  ErrorBoundary as ErrorBoundaryLib,
  ErrorBoundaryProps,
  FallbackProps,
} from 'react-error-boundary'
import type { FC, PropsWithChildren } from 'react'
import { DangerAlert } from '@/components/widgets/alert'

export const DefaultErrorFallback: FC<FallbackProps> = ({
  resetErrorBoundary,
  error,
}) => {
  // todo handle error condition
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <DangerAlert className="w-full" />
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export const ErrorBoundary: FC<PropsWithChildren<ErrorBoundaryProps>> = ({
  children,
  onError,
  ...rest
}) => {
  return (
    <ErrorBoundaryLib
      {...rest}
      onError={(e) => {
        // captureException(e)
      }}
    >
      {children}
    </ErrorBoundaryLib>
  )
}
