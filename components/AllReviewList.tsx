'use client'

import { useAllReviews } from '@/lib/hooks/useAllReviews'
import { deleteReview } from '@/lib/firestore/deleteReview'
import { format } from 'date-fns'

export const AllReviewList = () => {
  const { reviews, refetch } = useAllReviews()

  const handleDelete = async (schoolId: string, reviewId: string) => {
    const confirmDelete = confirm('このレビューを削除しますか？')
    if (!confirmDelete) return

    try {
      await deleteReview(schoolId, reviewId)
      await refetch() // 再取得して更新！
    } catch (error) {
      alert('削除に失敗しました')
      console.error(error)
    }
  }

  if (reviews.length === 0) {
    return <p className="text-gray-500">レビューがまだありません。</p>
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="border p-4 rounded shadow-sm relative">
          <p className="text-sm text-gray-500">スクール: {r.schoolName}</p>
          <p className="font-semibold">{r.userName}</p>
          <p className="text-yellow-500">評価: {'★'.repeat(r.rating)}</p>
          <p>{r.comment}</p>
          <p className="text-sm text-gray-400">
            {format(r.createdAt, 'yyyy/MM/dd HH:mm')}
          </p>
          <button
            onClick={() => handleDelete(r.schoolId, r.id)}
            className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
          >
            削除
          </button>
        </div>
      ))}
    </div>
  )
}
