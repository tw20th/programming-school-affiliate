// components/review/SchoolCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { School } from '@/types/school'

type Props = {
  school: School
}

export default function SchoolCard({ school }: Props) {
  return (
    <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between h-full">
      {/* ロゴ＋バッジ */}
      <div className="flex items-center justify-between mb-4">
        {school.imageUrl && (
          <Image
            src={school.imageUrl}
            alt={school.name}
            width={120}
            height={40}
            className="object-contain h-10"
          />
        )}
        {school.featured && (
          <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">
            おすすめ
          </span>
        )}
      </div>

      {/* タイトル */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {school.name}
      </h2>

      {/* 特徴 */}
      <ul className="text-sm text-gray-700 space-y-1 mb-4 list-disc list-inside">
        {school.features.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>

      {/* 詳細情報 */}
      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p>💰 料金: {school.price}</p>
        <p>🎁 無料体験: {school.freeTrial ? 'あり' : 'なし'}</p>
      </div>

      {/* CTA */}
      <Link
        href={`/school/${school.slug}`}
        className="mt-auto text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition font-medium"
      >
        詳しく見る
      </Link>
    </div>
  )
}
