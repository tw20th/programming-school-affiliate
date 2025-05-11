import { db } from '@/lib/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { Post } from '@/types/post'

export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  const q = query(
    collection(db, 'posts'),
    where('category', '==', category),
    orderBy('publishedAt', 'desc')
  )
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, 'id'>),
  }))
}
