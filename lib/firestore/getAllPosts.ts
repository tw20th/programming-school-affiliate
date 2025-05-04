import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import type { Post } from '@/lib/hooks/usePosts'

export const getAllPosts = async (): Promise<Pick<Post, 'slug'>[]> => {
  const snapshot = await getDocs(collection(db, 'posts'))
  return snapshot.docs.map((doc) => ({
    slug: doc.data().slug,
  }))
}
