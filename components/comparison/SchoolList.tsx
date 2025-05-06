import SchoolCard from '@/components/SchoolCard'
import { School } from '@/types/school'

type Props = {
  schools: School[]
}

export default function SchoolList({ schools }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {schools.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          <p className="mb-4">条件に合うスクールが見つかりませんでした。</p>
          <a
            href="/comparison"
            className="inline-block text-blue-600 hover:underline"
          >
            すべてのスクールを見る →
          </a>
        </div>
      )}
    </div>
  )
}
