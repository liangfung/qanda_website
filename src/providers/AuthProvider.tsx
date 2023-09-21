'use client'

import { createContext, useEffect, useMemo, useState } from 'react'
import type { FC, PropsWithChildren } from 'react'

export type IAuth = {
  name?: string
  id?: number
}

interface ChatContextValue {
  auth: IAuth | undefined
  setAuth?: (client: IAuth) => void
}

export const AuthContext = createContext<ChatContextValue>({ auth: undefined })

export const AuthProvider: FC<
  PropsWithChildren<{ initialAuth: IAuth | undefined }>
> = ({ initialAuth, children }) => {
  const [auth, setAuth] = useState<IAuth | undefined>(initialAuth)

  useEffect(() => {
    setAuth(initialAuth)
  }, [initialAuth?.id])

  const value = useMemo(() => {
    return { auth, setAuth }
  }, [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
