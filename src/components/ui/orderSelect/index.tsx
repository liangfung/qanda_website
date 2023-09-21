'use client'

import { Select } from '@/components/widgets/select'
import { Listbox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'

export enum ORDER_TYPE {
  SCORE_DESC = 'SCORE_DESC',
  CREATE_TIME_DESC = 'CREATE_TIME_DESC',
}

const SORT_OPTIONS = [
  { value: ORDER_TYPE.SCORE_DESC, label: 'Highest score', unavailable: false },
  {
    value: ORDER_TYPE.CREATE_TIME_DESC,
    label: 'Updated time',
    unvailable: false,
  },
]

interface Props extends ComponentBaseProps, FormComponentBaseProps {
  value: ORDER_TYPE
  onChange: (val: ORDER_TYPE) => void
}

export const OrderSelect: React.FC<Props> = ({
  value,
  onChange,
  className,
}) => {
  const handleChange = (v: ORDER_TYPE) => {
    onChange?.(v)
  }

  return (
    <Select
      className={className ?? ''}
      options={SORT_OPTIONS}
      value={value}
      onChange={handleChange}
    />
  )
}
