import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import type { Post } from '@/lib/hooks/usePosts'

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const q = query(collection(db, 'posts'), where('slug', '==', slug))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Post
}
