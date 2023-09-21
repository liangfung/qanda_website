'use client'

import { InputHTMLAttributes } from 'react'
import { Combobox, Transition } from '@headlessui/react'

interface Props
  extends ComponentBaseProps,
    InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<Props> = ({ onChange, value }) => {
  return (
    <input
      type="text"
      className="py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
    />
  )
}
