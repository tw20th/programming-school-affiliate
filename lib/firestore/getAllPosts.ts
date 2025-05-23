import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { Post } from '@/types/post'

export const getAllPosts = async (): Promise<Post[]> => {
  const q = query(
    collection(db, 'posts'),
    orderBy('publishedAtTimestamp', 'desc') // ← ここを変更
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, 'id'>),
  }))
}
