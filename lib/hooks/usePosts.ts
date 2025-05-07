'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export type Post = {
  id: string
  title: string
  body: string
  slug: string
  category?: string
  tags?: string[]
  thumbnailUrl?: string
  createdAt: { seconds: number } // Firestore Timestamp型
}

// 👇 usePosts を明示的に export
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'posts'))
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Post, 'id'>),
      }))
      setPosts(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  return { posts, loading }
}
