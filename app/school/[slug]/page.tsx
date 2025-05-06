import { getSchools, getSchoolBySlug } from '@/lib/firestore/getSchools'
import { ReviewForm } from '@/components/ReviewForm'
import { ReviewList } from '@/components/ReviewList'
import { getReviewsBySchoolId } from '@/lib/firestore/getReviews'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

// 🔹 静的パス生成（SSG対応）
export async function generateStaticParams() {
  const schools = await getSchools()
  return schools.map((school) => ({ slug: school.slug }))
}

// 🔹 SEO用の動的メタデータ生成（OGP付き）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const school = await getSchoolBySlug(params.slug)

  if (!school) {
    return { title: 'スクールが見つかりません' }
  }

  const siteUrl = 'https://yourdomain.com' // ← あなたのドメインに変更！

  return {
    title: `${school.name} | プログラミングスクール比較`,
    description: school.description ?? 'おすすめスクールの詳細ページです。',
    openGraph: {
      title: school.name,
      description: school.description ?? '',
      url: `${siteUrl}/school/${params.slug}`,
      type: 'article',
      images: school.imageUrl
        ? [
            {
              url: school.imageUrl,
              width: 800,
              height: 420,
              alt: school.name,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: school.name,
      description: school.description ?? '',
      images: school.imageUrl ? [school.imageUrl] : [],
    },
  }
}

// 🔹 ページ本体
export default async function SchoolDetailPage({ params }: Props) {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: school.name,
            description: school.description,
            image: school.imageUrl,
            offers: {
              '@type': 'Offer',
              price: school.price?.replace(/[^\d]/g, '') || '0',
              priceCurrency: 'JPY',
              url: `https://yourdomain.com/school/${params.slug}`,
            },
            review: reviews.map((review) => ({
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: review.rating,
                bestRating: '5',
              },
              author: {
                '@type': 'Person',
                name: review.author ?? '匿名',
              },
            })),
          }),
        }}
      />
    </main>
  )
}
