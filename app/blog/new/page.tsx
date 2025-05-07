'use client'

import { useState } from 'react'
import { useAddPost } from '@/lib/hooks/useAddPost'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')

  const { addPost } = useAddPost()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !body) return

    await addPost({
      title,
      body,
      category,
      tags: tags.split(',').map((tag) => tag.trim()),
    })

    router.push('/blog')
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">新規記事の投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="タイトル" value={title} setValue={setTitle} />
        <Textarea
          label="本文（Markdown対応）"
          value={body}
          setValue={setBody}
        />
        <Input label="カテゴリ" value={category} setValue={setCategory} />
        <Input label="タグ（カンマ区切り）" value={tags} setValue={setTags} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          投稿する
        </button>
      </form>
    </main>
  )
}

function Input({
  label,
  value,
  setValue,
}: {
  label: string
  value: string
  setValue: (v: string) => void
}) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  )
}

function Textarea({
  label,
  value,
  setValue,
}: {
  label: string
  value: string
  setValue: (v: string) => void
}) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={6}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  )
}
