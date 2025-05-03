// app/school/[id]/page.tsx

'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useReviews } from '@/lib/hooks/useReviews'
import { ReviewList } from '@/components/ReviewList'
import { ReviewForm } from '@/components/ReviewForm'

type School = {
  id: string
  name: string
  features: string[]
  price: string
  freeTrial: boolean
  officialUrl: string
  imageUrl?: string
}

export default function SchoolDetailPage() {
  const { id } = useParams()
  const schoolId = id as string

  const { reviews } = useReviews(schoolId) // ← JSXの前に呼び出す

  const [school, setSchool] = useState<School | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSchool = async () => {
      const docRef = doc(db, 'schools', schoolId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setSchool({ id: docSnap.id, ...(docSnap.data() as Omit<School, 'id'>) })
      }
      setLoading(false)
    }
    fetchSchool()
  }, [schoolId])

  if (loading) return <p className="p-4">読み込み中...</p>
  if (!school) return <p className="p-4">スクールが見つかりませんでした。</p>

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

      <ReviewForm schoolId={schoolId} />

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
