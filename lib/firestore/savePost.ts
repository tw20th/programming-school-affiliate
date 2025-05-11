// lib/firestore/savePost.ts
import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { Post } from '@/types/post'

export const savePost = async (post: Post) => {
  const id = new Date().toISOString() // または slug を生成してもOK
  await setDoc(doc(db, 'posts', id), post)
}
