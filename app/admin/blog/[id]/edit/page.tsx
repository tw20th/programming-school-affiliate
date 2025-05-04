'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

type Post = {
  title: string
  slug: string
  body: string
  category: string
  tags: string[]
  thumbnailUrl?: string
}

// slugify関数：日本語→URL用のスラッグに変換
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState<Post>({
    title: '',
    slug: '',
    body: '',
    category: '',
    tags: [],
    thumbnailUrl: '',
  })

  // Firestoreから記事を取得し、slug補正
  useEffect(() => {
    if (!id) return
    const fetch = async () => {
      const ref = doc(db, 'posts', id as string)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data() as Post
        const validSlug =
          !data.slug || data.slug === '5' || data.slug.length < 3
        const generatedSlug = slugify(data.title)
        setForm({
          ...data,
          slug: validSlug ? generatedSlug : data.slug,
        })
      }
    }
    fetch()
  }, [id])

  // slugが空なら自動補完（依存に form.slug を追加して ESLint対応）
  useEffect(() => {
    if (form.title && form.slug.trim() === '') {
      setForm((prev) => ({
        ...prev,
        slug: slugify(prev.title),
      }))
    }
  }, [form.title, form.slug])

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
    const ref = doc(db, 'posts', id as string)
    await updateDoc(ref, form)
    alert('記事を更新しました')
    router.push('/admin/blog')
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">記事の編集</h1>

      <label className="block mb-2">
        タイトル
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        スラッグ（URL）※自動候補が入力されますが、自由に編集できます
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        カテゴリ
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        本文（Markdown）
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          className="w-full border p-2 h-40 rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        サムネ画像URL（任意）
        <input
          name="thumbnailUrl"
          value={form.thumbnailUrl || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <div className="mb-4">
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        更新する
      </button>
    </main>
  )
}
