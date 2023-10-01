'use client'
import { IVoteTargetType } from '@/types/vote'
import Image from 'next/image'

interface Props extends ComponentBaseProps {
  type: IVoteTargetType
  targetId: number
}

export const EditInfoFooter: React.FC<Props> = ({ type, targetId }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mt-6">
      <div className="flex gap-4 text-gray-600 dark:text-gray-100">
        <span className="cursor-pointer">Shard</span>
        <span className="cursor-pointer">Improve</span>
        <span className="cursor-pointer">Follow</span>
      </div>
      <div className="text-blue-800 font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
        edited Sep 10, 2023 at 17:48
      </div>
      <div className="w-60 p-4 rounded-lg bg-blue-50 dark:bg-blue-900">
        <p className="mb-2 text-sm text-gray-600">
          created Apr 20, 2023 at 17:26
        </p>
        <div className="flex gap-x-2 items-center">
          <Image alt="avatar" src="/logo.png" width={32} height={32} />
          <div>
            <a className="text-sm text-blue-800 font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
              UserName
            </a>
            <div className="text-sm">score</div>
          </div>
        </div>
      </div>
    </div>
  )
}
