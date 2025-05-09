import { db } from '@/lib/firebase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import type { FullPostType } from '@/types/post'

export function useAddPost() {
  const addAutoPost = async (fullPost: FullPostType) => {
    const now = new Date()
    const scheduled = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24時間後
    const publishedAt = Timestamp.fromDate(scheduled)
    const createdAt = Timestamp.fromDate(now)

    await addDoc(collection(db, 'posts'), {
      ...fullPost,
      createdAt,
      publishedAt,
    })
  }

  const addManualPost = async ({
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
    thumbnailUrl?: string
  }) => {
    const now = new Date()
    await addDoc(collection(db, 'posts'), {
      title,
      body,
      category,
      tags,
      thumbnailUrl: thumbnailUrl ?? '',
      createdAt: Timestamp.fromDate(now),
      publishedAt: Timestamp.fromDate(now),
    })
  }

  return { addAutoPost, addManualPost }
}
