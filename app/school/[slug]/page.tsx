// app/school/[slug]/page.tsx

import { getSchools, getSchoolBySlug } from '@/lib/firestore/getSchools'
import { ReviewForm } from '@/components/ReviewForm'
import { ReviewList } from '@/components/ReviewList'
import { getReviewsBySchoolId } from '@/lib/firestore/getReviews'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

// 🔹 静的パス生成（SSG対応）
export async function generateStaticParams() {
  const schools = await getSchools()
  return schools.map((school) => ({ slug: school.slug }))
}

// 🔹 SEO用の動的メタデータ生成
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const school = await getSchoolBySlug(params.slug)
  return {
    title: `${school?.name} | プログラミングスクール比較`,
    description: school?.description ?? 'おすすめスクールの詳細ページです。',
  }
}

export default async function SchoolDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const school = await getSchoolBySlug(params.slug)
  if (!school) return <p className="p-4">スクールが見つかりませんでした。</p>

  const reviews = await getReviewsBySchoolId(school.id)

  return (
    <main className="max-w-3xl mx-auto p-6">
      {school.imageUrl && (
        <Image
          src={school.imageUrl}
          alt={school.name}
          width={300}
          height={80}
          className="mb-4 object-contain"
        />
      )}

      <h1 className="text-2xl font-bold mb-2">{school.name}</h1>

      <ul className="list-disc ml-5 mb-4 text-gray-700">
        {school.features.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>

      <div className="text-gray-800 mb-6">
        <p>💰 料金: {school.price}</p>
        <p>🎁 無料体験: {school.freeTrial ? 'あり' : 'なし'}</p>
      </div>

      <ReviewForm schoolId={school.id} />

      <h2 className="text-xl font-semibold mt-10 mb-4 border-b pb-2">
        ユーザーレビュー
      </h2>
      <ReviewList reviews={reviews} />

      <Link
        href={school.officialUrl}
        target="_blank"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        公式サイトへ
      </Link>
    </main>
  )
}
