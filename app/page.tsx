import { getSchools } from '@/lib/firestore/getSchools'
import SchoolCard from '@/components/SchoolCard'

export const revalidate = 60

export default async function HomePage() {
  const schools = await getSchools()
  const featured = schools.filter((school) => school.featured)

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* 🔹 ヒーローセクション */}
      <section className="bg-blue-50 text-center py-16 px-6 rounded-3xl shadow-md mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          <span className="text-blue-600">人生を変える</span>スクール選び、
          <br className="hidden md:block" />
          はじめよう。
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
          未経験からでも<span className="font-medium">副業・転職</span>に
          チャレンジできるスクールを厳選紹介しています。
        </p>
      </section>

      {/* 🔹 スクールカード */}
      <section className="grid gap-8 md:grid-cols-2">
        {featured.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </section>

      {/* 🔹 CTAボタン */}
      <div className="mt-12 text-center">
        <a
          href="/comparison"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:bg-blue-700 hover:scale-105 transition-all"
        >
          他のスクールも比較する →
        </a>
      </div>
    </main>
  )
}
