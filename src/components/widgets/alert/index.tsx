import { FC, PropsWithChildren } from 'react'

export const DangerAlert: FC<PropsWithChildren<ComponentBaseProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`bg-red-500 text-sm text-white rounded-md p-4 ${className}`}
      role="alert"
    >
      {children ?? 'Something went wrong'}
    </div>
  )
}
