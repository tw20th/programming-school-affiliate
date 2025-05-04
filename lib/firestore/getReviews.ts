// lib/firestore/getReviews.ts

import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import type { Review } from '@/types/review'

export async function getReviewsBySchoolId(
  schoolId: string
): Promise<Review[]> {
  const q = query(collection(db, 'reviews'), where('schoolId', '==', schoolId))
  const snap = await getDocs(q)

  return snap.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      userName: data.userName ?? '名無しユーザー',
      author: data.author ?? '',
      rating: data.rating ?? 0,
      comment: data.comment ?? '',
      createdAt: data.createdAt?.toDate?.() ?? new Date(), // ← ここで Date に変換
    }
  }) as Review[]
}
