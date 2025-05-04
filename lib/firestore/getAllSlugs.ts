import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export const getAllSlugs = async (): Promise<string[]> => {
  const snapshot = await getDocs(collection(db, 'posts'))
  return snapshot.docs
    .map((doc) => doc.data().slug)
    .filter(
      (slug): slug is string => typeof slug === 'string' && slug.length > 0
    )
}
