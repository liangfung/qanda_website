import Link from 'next/link'

export default async function QuestionList() {
  return (
    <div className="p-4">
      <Link className="underline text-blue-500" href="/questions/1">
        /questions/1
      </Link>
    </div>
  )
}
