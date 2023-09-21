'use client'

import { PropsWithChildren } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props extends ComponentBaseProps {
  data: string
}

export const MarkDown: React.FC<PropsWithChildren<Props>> = ({ data = '' }) => {
  return <div className="whitespace-pre-line">{data}</div>
  // return <ReactMarkdown>{data}</ReactMarkdown>
}
