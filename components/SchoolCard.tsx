import type { School } from '@/types/school'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  school: School
}

export default function SchoolCard({ school }: Props) {
  const imageUrl = school.imageUrl || '/no-image.png' // ✅ 空ならダミー画像に差し替え

  return (
    <div className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-white flex flex-col">
      <Image
        src={imageUrl}
        alt={school.name}
        width={200}
        height={60}
        className="mb-4 object-contain"
      />

      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        {school.name}
        {school.featured && (
          <span className="text-xs bg-yellow-400 text-white px-2 py-0.5 rounded">
            おすすめ
          </span>
        )}
      </h2>

      <ul className="list-disc ml-5 text-sm text-gray-700 mb-2">
        {school.features.length > 0 ? (
          school.features.map((f: string, idx: number) => (
            <li key={idx}>{f}</li>
          ))
        ) : (
          <li className="text-gray-400 italic">特徴情報は準備中です</li>
        )}
      </ul>

      <div className="text-sm text-gray-600 mt-auto">
        <p className="mb-1">💰 料金: {school.price}</p>
        <p>🎁 無料体験: {school.freeTrial ? 'あり' : 'なし'}</p>
      </div>

      <Link
        href={`/school/${school.slug}`}
        className="mt-4 inline-block text-center border border-blue-500 text-blue-600 px-4 py-1 rounded hover:bg-blue-50 transition"
      >
        詳しく見る
      </Link>
    </div>
  )
}
