// lib/hooks/useReviews.ts
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

export type Review = {
  id: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
}

export const useReviews = (schoolId: string) => {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const q = query(
      collection(db, 'schools', schoolId, 'reviews'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const raw = doc.data()
        return {
          id: doc.id,
          ...(raw as Omit<Review, 'id' | 'createdAt'>),
          createdAt: raw.createdAt ? raw.createdAt.toDate() : new Date(),
        }
      })
      setReviews(data)
    })

    return () => unsubscribe()
  }, [schoolId])

  return { reviews }
}
