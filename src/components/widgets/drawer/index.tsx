'use client'

import { Transition } from '@headlessui/react'
import { FC, Fragment, PropsWithChildren } from 'react'

interface Props extends ComponentBaseProps {
  visible: boolean | undefined
  onClose: () => void
}

export const Drawer: FC<PropsWithChildren<Props>> = ({
  onClose,
  visible,
  children,
}) => {
  return (
    <Transition show={visible} as={'div'} className="z-[20]">
      <Transition.Child
        as={'div'}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-50"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          onClick={() => onClose()}
          className="fixed inset-0 bg-black bg-opacity-25"
        />
      </Transition.Child>

      <div className="fixed top-0 left-0 bottom-0 w-[60%] overflow-y-auto bg-white p-4">
        <Transition.Child
          as={'div'}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-50"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {children}
        </Transition.Child>
      </div>
    </Transition>
  )
}
