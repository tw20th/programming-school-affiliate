// components/ReviewForm.tsx
'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

type Props = {
  schoolId: string
}

export const ReviewForm = ({ schoolId }: Props) => {
  const [userName, setUserName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName || !comment) return

    setLoading(true)

    await addDoc(collection(db, 'schools', schoolId, 'reviews'), {
      userName,
      comment,
      rating,
      createdAt: serverTimestamp(),
    })

    setUserName('')
    setComment('')
    setRating(5)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-6">
      <div>
        <label className="block text-sm">名前</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm">コメント</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm">評価（1〜5）</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? '投稿中...' : 'レビューを投稿'}
      </button>
    </form>
  )
}
