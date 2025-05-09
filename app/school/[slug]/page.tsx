import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ClientIncrementReadCount from '@/components/school/ClientIncrementReadCount'

// 🔽 client component for click count
import ClientSchoolCTAWrapper from '@/components/school/ClientSchoolCTAWrapper'

type School = {
  id: string
  name: string
  slug: string
  description: string
  imageUrl?: string
  affiliateUrl: string
  features: string[]
  price: string
  freeTrial: boolean
}

type Props = {
  params: { slug: string }
}

async function getSchoolBySlug(slug: string): Promise<School | null> {
  const q = query(collection(db, 'schools'), where('slug', '==', slug))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null

  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...(doc.data() as Omit<School, 'id'>),
  }
}

export default async function SchoolDetailPage({ params }: Props) {
  const school = await getSchoolBySlug(params.slug)
  if (!school) return notFound()

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <div className="mb-6">
        {school.imageUrl && (
          <Image
            src={school.imageUrl}
            alt={school.name}
            width={160}
            height={40}
            className="object-contain h-10 mb-4"
          />
        )}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{school.name}</h1>
        <p className="text-gray-700">{school.description}</p>
      </div>

      <div className="mb-6">
        <ul className="list-disc list-inside text-gray-600 mb-4">
          {school.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <p className="text-sm text-gray-600">💰 料金: {school.price}</p>
        <p className="text-sm text-gray-600">
          🎁 無料体験: {school.freeTrial ? 'あり' : 'なし'}
        </p>
      </div>

      {/* ✅ クリック数を記録して公式サイトへ */}
      <ClientSchoolCTAWrapper
        schoolId={school.id}
        affiliateUrl={school.affiliateUrl}
      />

      <ClientIncrementReadCount schoolId={school.id} />
    </main>
  )
}
