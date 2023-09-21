'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { ILeftNav } from './type'

interface Props extends ComponentBaseProps {
  nav: ILeftNav
}

export const LeftNavItem: React.FC<Props> = ({ nav, className }) => {
  const pathname = usePathname()
  const isActive = useMemo(() => {
    return new RegExp(nav.activeRule).test(pathname)
  }, [pathname, nav.activeRule])

  return (
    <div className={`text-left ${className || ''}`}>
      <Link href={nav.path}>
        <div
          className={`px-4 py-4 rounded ${
            isActive ? 'font-bold bg-theme' : 'hover:text-opacity-70'
          }`}
        >
          {nav.title}
        </div>
      </Link>
    </div>
  )
}
