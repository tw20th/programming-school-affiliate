// lib/hooks/useAllReviews.ts
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, getDocs, collectionGroup } from 'firebase/firestore'

type ReviewWithSchool = {
  id: string
  schoolId: string
  schoolName: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
}

export const useAllReviews = () => {
  const [reviews, setReviews] = useState<ReviewWithSchool[]>([])

  const fetchReviews = async () => {
    const snapshot = await getDocs(collectionGroup(db, 'reviews'))
    const data: ReviewWithSchool[] = []

    for (const docSnap of snapshot.docs) {
      const review = docSnap.data()
      const path = docSnap.ref.path
      const schoolId = path.split('/')[1]

      const schoolRef = doc(db, 'schools', schoolId)
      const schoolSnap = await getDoc(schoolRef)
      const schoolName = schoolSnap.exists() ? schoolSnap.data()?.name : '不明'

      data.push({
        id: docSnap.id,
        schoolId,
        schoolName,
        userName: review.userName,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt?.toDate?.() ?? new Date(),
      })
    }

    setReviews(data)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return { reviews, refetch: fetchReviews }
}
