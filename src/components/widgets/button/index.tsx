import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface Props
  extends ComponentBaseProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  loading?: boolean
}

export const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  className = '',
  ...rest
}) => {
  // todo muli size, style
  return (
    <button
      type="button"
      className={`py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-red-100 border border-transparent font-semibold text-red-500 hover:text-white hover:bg-red-100 focus:outline-none focus:ring-2 ring-offset-white focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
