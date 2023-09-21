import { SVGProps } from 'react'

export const UpArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <path fill="currentColor" d="M1 12h16L9 4l-8 8Z"></path>
    </svg>
  )
}
export const DownArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <path fill="currentColor" d="M1 6h16l-8 8-8-8Z"></path>
    </svg>
  )
}
