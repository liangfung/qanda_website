export interface PropsFromErrorBoundary {
  error?: Error
  errorInfo?: string
  clearError?: () => void
}
