import { FC, PropsWithChildren } from 'react'

interface Props extends ComponentBaseProps {}

export const Sidebar: FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <aside
      className={`relative z-8 w-60 lg:border-r border-divider xl:pl-0 pl-2 ${
        className ?? ''
      }`}
    >
      <div className="pt-4 sticky top-[4rem]">{children}</div>
    </aside>
  )
}
