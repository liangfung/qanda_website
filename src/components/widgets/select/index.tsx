'use client'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { FC, Fragment, useMemo } from 'react'

interface Props<T = any> extends ComponentBaseProps, FormComponentBaseProps {
  value: T
  onChange: (val: T) => void
  options: Array<{ value: T; label: string; unavailable?: boolean }>
}

export function Select<T>({ value, onChange, className, options }: Props<T>) {
  const selectedItem = useMemo(
    () =>
      options.find((item) => item.value === value) ?? {
        value,
        label: String(value),
      },
    [value, options],
  )

  const handleChange = (v: T) => {
    onChange?.(v)
  }

  return (
    <div className={`w-48 md:w-72 ${className ?? ''}`}>
      <Listbox value={value} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="border relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedItem?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options?.map((option) => (
                <Listbox.Option
                  key={String(option.value)}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={option.value}
                  disabled={option.unavailable}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
