'use client'

import { DownArrowIcon, UpArrowIcon } from '@/components/icons'
import { useState, useEffect } from 'react'
import './vote.css'
import { IVoteType } from '@/types/vote'

interface Props extends ComponentBaseProps {
  voteType: IVoteType
  disabled?: boolean
  isActive?: boolean
  onChange?: (voteType: IVoteType) => void
}

export const VoteButton: React.FC<Props> = ({
  voteType,
  disabled,
  isActive,
  onChange,
}) => {
  const [trigger, setTrigger] = useState(false)
  const handleClickButton = () => {
    onChange?.(voteType)
    setTrigger(true)
  }

  useEffect(() => {
    if (trigger) {
      setTimeout(() => {
        setTrigger(false)
      }, 200)
    }
  }, [trigger])

  return (
    <div
      onClick={() => handleClickButton()}
      className={`border rounded-full w-[40px] h-[40px] flex-center hover:bg-[#f8b886] cursor-pointer vote-button ${
        isActive ? 'vote-button-active' : ''
      }`}
    >
      {voteType === IVoteType.up ? (
        <UpArrowIcon
          className={`vote-button-icon ${
            isActive ? 'vote-button-icon-active' : ''
          }`}
        />
      ) : (
        <DownArrowIcon
          className={`vote-button-icon ${
            isActive ? 'vote-button-icon-active' : ''
          }`}
        />
      )}
    </div>
  )
}
