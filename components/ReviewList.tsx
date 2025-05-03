// components/ReviewList.tsx
'use client'

import { Review } from '@/lib/hooks/useReviews'
import { format } from 'date-fns'
import { deleteReview } from '@/lib/firestore/deleteReview'
import { useParams } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'

type Props = {
  reviews: Review[]
}

export const ReviewList = ({ reviews }: Props) => {
  const { id } = useParams()
  const { user } = useAuth()

  const isAdmin = user?.email === 'admin@example.com' // ← 管理者判定

  const handleDelete = async (reviewId: string) => {
    const confirmDelete = confirm('このレビューを削除しますか？')
    if (!confirmDelete) return

    try {
      await deleteReview(id as string, reviewId)
    } catch (err) {
      alert('削除に失敗しました')
      console.error(err)
    }
  }

  if (reviews.length === 0) {
    return <p className="text-gray-500">まだレビューはありません。</p>
  }

  return (
    <ul className="space-y-4">
      {reviews.map((r) => (
        <li key={r.id} className="border p-4 rounded shadow-sm relative">
          <p className="font-semibold">{r.userName}</p>
          <p className="text-yellow-500">評価: {'★'.repeat(r.rating)}</p>
          <p className="mt-1">{r.comment}</p>
          <p className="text-sm text-gray-400 mt-2">
            {format(r.createdAt, 'yyyy/MM/dd HH:mm')}
          </p>
          {isAdmin && (
            <button
              onClick={() => handleDelete(r.id)}
              className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
            >
              削除
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
