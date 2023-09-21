'use client' // Error components must be Client Components

import { Button } from '@/components/widgets/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex-center h-full text-center">
      <div>
        <h2 className="mb-4">Something went wrong!</h2>
        <Button onClick={() => reset()}>Try agin</Button>
      </div>
    </div>
  )
}
