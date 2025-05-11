// lib/firestore/getPostBySlug.ts

import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Post } from '@/types/post'

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const q = query(collection(db, 'posts'), where('slug', '==', slug))
  const snapshot = await getDocs(q)

  if (snapshot.empty) return null

  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...(doc.data() as Omit<Post, 'id'>),
  }
}
