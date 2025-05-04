import SchoolCard from '@/components/SchoolCard'
import { School } from '@/types/school'

type Props = {
  schools: School[]
}

export default function SchoolList({ schools }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 px-4 max-w-6xl mx-auto">
      {schools.length > 0 ? (
        schools.map((school) => <SchoolCard key={school.id} school={school} />)
      ) : (
        <p className="text-gray-500">
          条件に合うスクールが見つかりませんでした。
        </p>
      )}
    </div>
  )
}
