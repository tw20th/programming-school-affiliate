import { getSchools } from '@/lib/firestore/getSchools'
import SchoolCard from '@/components/SchoolCard'

export const revalidate = 60 // ← ISR対応：60秒ごとに再生成

export default async function HomePage() {
  const schools = await getSchools()
  const featured = schools.filter((school) => school.featured)

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="bg-blue-50 text-center py-16 px-4 rounded-xl mb-10 shadow-inner">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          人生を変えるスクール選び、はじめよう。
        </h1>
        <p className="text-gray-600 text-lg">
          未経験からでも副業・転職にチャレンジできるスクールを厳選紹介
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="/comparison"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          他のスクールも比較する →
        </a>
      </div>
    </main>
  )
}
