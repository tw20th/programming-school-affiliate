'use client'

import { db } from '@/lib/firebase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

export function useAddPost() {
  const addPost = async ({
    title,
    body,
    category,
    tags,
    thumbnailUrl,
  }: {
    title: string
    body: string
    category: string
    tags: string[]
    thumbnailUrl: string
  }) => {
    const postsRef = collection(db, 'posts')
    await addDoc(postsRef, {
      title,
      body,
      category,
      tags,
      thumbnailUrl,
      createdAt: Timestamp.now(),
    })
  }

  return { addPost }
}
