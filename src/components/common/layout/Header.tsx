'use client'

import { CollapseIcon } from '@/components/icons/Collapse'
import { Drawer } from '@/components/widgets/drawer'
import { Input } from '@/components/widgets/input'
import { LeftNavItem } from '@/components/widgets/leftNav/navItem'
import { ILeftNav } from '@/components/widgets/leftNav/type'
import { AuthContext } from '@/providers/AuthProvider'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/20/solid'

interface Props extends ComponentBaseProps {
  navs?: Array<ILeftNav>
}

export const Header: React.FC<Props> = ({ navs }) => {
  const [mobileNavVisible, setMobileNavVisible] = useState(false)
  const { auth } = useContext(AuthContext)

  return (
    <>
      <header className="z-[9] overflow-hidden transition-shadow duration-200 sticky top-0 border-b border-divider bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex h-[4rem] items-center lg:gap-16 gap-4 p-2 justify-between md:justify-normal">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileNavVisible(true)}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <CollapseIcon className="w-6 h-6" />
              </button>
              <Image
                width={32}
                height={32}
                alt="TabbyML logo"
                src={'/logo.png'}
              />
              <span className="font-bold">Tabby</span>
            </div>
            <div className="flex-1 hidden md:block">
              <div className="flex gap-2 items-center">
                <span className="hidden lg:block">Questions</span>
                <Input />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <UserCircleIcon height={32} width={32} />
              {auth?.name ?? ''}
            </div>
          </div>
        </div>
      </header>
      <Drawer
        visible={mobileNavVisible}
        onClose={() => setMobileNavVisible(false)}
      >
        <>
          {navs?.map((nav) => (
            <div key={nav.path} onClick={() => setMobileNavVisible(false)}>
              <LeftNavItem nav={nav} />
            </div>
          ))}
        </>
      </Drawer>
    </>
  )
}
