'use client'

import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export type Post = {
  id: string
  title: string
  body: string
  createdAt: { seconds: number }
  category?: string
  tags?: string[]
  thumbnailUrl?: string
}

export function usePostById(id: string) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id)
      const snapshot = await getDoc(docRef)
      if (snapshot.exists()) {
        setPost({ id: snapshot.id, ...(snapshot.data() as Omit<Post, 'id'>) })
      }
      setLoading(false)
    }

    fetchPost()
  }, [id])

  return { post, loading }
}
