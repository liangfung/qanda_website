import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/global.css'
import ReduxProvider from '@/store/ReduxProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { fetchWrapper } from '@/lib/request'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Qanda',
  description: 'Qanda',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authRes = await fetchWrapper('http://localhost:3000/api/auth/userInfo')
  const initialAuth = authRes?.success ? authRes.data : undefined

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-slate-900`}>
        <ReduxProvider>
          <AuthProvider initialAuth={initialAuth}>
            <div className="min-h-screen flex flex-col">{children}</div>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
