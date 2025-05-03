// lib/firestore/deleteReview.ts
import { db } from '@/lib/firebase'
import { deleteDoc, doc } from 'firebase/firestore'

export const deleteReview = async (schoolId: string, reviewId: string) => {
  const reviewRef = doc(db, 'schools', schoolId, 'reviews', reviewId)
  await deleteDoc(reviewRef)
}
