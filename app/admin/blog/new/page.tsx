'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    body: '',
    category: '',
    tags: [''],
    thumbnailUrl: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagChange = (index: number, value: string) => {
    const updated = [...form.tags]
    updated[index] = value
    setForm((prev) => ({ ...prev, tags: updated }))
  }

  const addTag = () =>
    setForm((prev) => ({ ...prev, tags: [...prev.tags, ''] }))
  const removeTag = (index: number) =>
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }))

  const handleSubmit = async () => {
    await addDoc(collection(db, 'posts'), {
      ...form,
      createdAt: Timestamp.now(),
    })
    alert('記事を追加しました')
    router.push('/admin/blog')
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">記事の追加</h1>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="タイトル"
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="カテゴリ"
        className="w-full border p-2 mb-3 rounded"
      />

      <textarea
        name="body"
        value={form.body}
        onChange={handleChange}
        placeholder="本文（Markdown）"
        className="w-full border p-2 mb-3 rounded h-40"
      />

      <input
        name="thumbnailUrl"
        value={form.thumbnailUrl}
        onChange={handleChange}
        placeholder="サムネ画像URL（任意）"
        className="w-full border p-2 mb-3 rounded"
      />

      <div className="mb-3">
        <p className="font-semibold">タグ</p>
        {form.tags.map((tag, i) => (
          <div key={i} className="flex gap-2 mt-1">
            <input
              type="text"
              value={tag}
              onChange={(e) => handleTagChange(i, e.target.value)}
              className="border p-1 flex-1 rounded"
            />
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-red-500 text-sm"
            >
              削除
            </button>
          </div>
        ))}
        <button
          onClick={addTag}
          type="button"
          className="mt-2 text-blue-500 text-sm"
        >
          ＋タグを追加
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        投稿する
      </button>
    </main>
  )
}
