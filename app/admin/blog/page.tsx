'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import Link from 'next/link' // ✅ 追加！

type Post = {
  id: string
  title: string
  createdAt: Date | null
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, 'posts'))
    const data = snapshot.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        title: d.title,
        createdAt: d.createdAt?.toDate?.() ?? null,
      }
    })
    setPosts(data)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('この記事を削除しますか？')) return
    await deleteDoc(doc(db, 'posts', id))
    await fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">記事管理</h1>
      <div className="mb-6">
        <Link
          href="/admin/blog/new"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ＋新規記事を追加
        </Link>
      </div>
      {posts.map((p) => (
        <div key={p.id} className="border p-4 mb-3 rounded shadow-sm">
          <p className="font-semibold">{p.title}</p>
          <p className="text-sm text-gray-500">
            {p.createdAt?.toLocaleString() ?? '日時不明'}
          </p>

          <div className="flex gap-4 mt-2">
            <Link
              href={`/admin/blog/${p.id}/edit`}
              className="text-sm text-blue-500 hover:underline"
            >
              編集
            </Link>

            <button
              onClick={() => handleDelete(p.id)}
              className="text-sm text-red-500 hover:underline"
            >
              削除
            </button>
          </div>
        </div>
      ))}
    </main>
  )
}
