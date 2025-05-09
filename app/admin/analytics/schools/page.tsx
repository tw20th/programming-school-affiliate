import { db } from '@/lib/firebase'
import { getDocs, collection } from 'firebase/firestore'

type School = {
  id: string
  name: string
  clickCount?: number
  readCount?: number // ← 追加！
}

const getSchools = async (): Promise<School[]> => {
  const snapshot = await getDocs(collection(db, 'schools'))
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<School, 'id'>),
  }))
}

export default async function SchoolAnalyticsPage() {
  const schools = await getSchools()

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">スクールの効果分析</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">スクール名</th>
              <th className="border p-2">閲覧数</th>
              <th className="border p-2">クリック数</th>
              <th className="border p-2">CTR（%）</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => {
              const read = school.readCount ?? 0
              const click = school.clickCount ?? 0
              const ctr = read > 0 ? ((click / read) * 100).toFixed(1) : '0.0'

              return (
                <tr key={school.id}>
                  <td className="border p-2">{school.name}</td>
                  <td className="border p-2 text-center">{read}</td>
                  <td className="border p-2 text-center">{click}</td>
                  <td className="border p-2 text-center">{ctr}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
