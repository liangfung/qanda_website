import { Header } from '@/components'
import { Footer, Content, Sidebar } from '@/components/common/layout'
import { LeftNavItem } from '@/components/widgets/leftNav/navItem'
import { ILeftNav } from '@/components/widgets/leftNav/type'
import { Suspense } from 'react'

const navs: Array<ILeftNav> = [
  {
    path: '/questions',
    title: 'questions',
    activeRule: '/questions',
  },
  {
    path: '/tags',
    title: 'tags',
    activeRule: '/tags',
  },
]

export default function QuestionsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header navs={navs} />
      <div className="flex-1 flex">
        <Content>
          <Sidebar className="hidden lg:block pr-2">
            {navs.map((nav) => (
              <LeftNavItem nav={nav} key={nav.path} />
            ))}
          </Sidebar>
          <div className="flex-1">
            <Suspense>{children}</Suspense>
          </div>
        </Content>
      </div>
      <Footer />
    </>
  )
}
