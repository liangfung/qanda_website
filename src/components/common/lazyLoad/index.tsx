'use client'

import React, { useEffect, useRef } from 'react'
import { useInViewport } from 'ahooks'
import type { FC, PropsWithChildren } from 'react'
import type { Options } from 'ahooks/lib/useInViewport/index'

export type LazyLoadProps = {
  offset?: number
  placeholder?: React.ReactNode
  onLoad?: () => void
} & Options
export const LazyLoad: FC<PropsWithChildren & LazyLoadProps> = (props) => {
  const { placeholder = null, offset = 0, onLoad, ...rest } = props
  const ref = useRef(null)
  const [isInViewPort] = useInViewport(ref, {
    ...rest,
  })
  const [isLoaded, setIsLoaded] = React.useState(false)
  useEffect(() => {
    if (isInViewPort && !isLoaded) {
      setIsLoaded(true)
      onLoad?.()
    }
  }, [isInViewPort])

  return (
    <>
      {!isLoaded && <span ref={ref} />}
      {isLoaded ? props.children : placeholder}
    </>
  )
}
