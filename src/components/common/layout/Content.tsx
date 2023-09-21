import { FC, PropsWithChildren } from 'react'
import { Sidebar } from '.'

interface Props extends ComponentBaseProps {}

export const Content: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="w-full mx-auto max-w-7xl">
      <main className="flex w-full min-w-0 lg:static lg:min-h-full lg:overflow-visible">
        {children}
      </main>
    </div>
  )
}
