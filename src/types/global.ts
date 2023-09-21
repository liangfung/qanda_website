import { CSSProperties } from 'react'

declare global {
  interface Window {
    ENV: Record<string, any>
  }

  interface ComponentBaseProps {
    className?: string
    style?: CSSProperties
    // errorBoundary?: PropsFromErrorBoundary
  }

  interface FormComponentBaseProps<T = any> {
    onChange?: (value: T) => void
    value?: T
  }
}
