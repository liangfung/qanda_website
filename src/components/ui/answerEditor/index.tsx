'use client'

interface Props extends ComponentBaseProps {}

export const AnswerEditor: React.FC<Props> = ({ className }) => {
  return <div className={`text-2xl ${className ?? ''}`}>Your answer</div>
}
