import { useState } from 'react'

export const useThrowError = () => {
  const [_, setState] = useState()
  const throwError = (e?: any) => {
    setState(() => {
      throw new Error(e ?? 'Something went wrong')
    })
  }

  return { throwError }
}
