'use client'

import { useParams } from 'next/navigation'
import { usePostById } from '@/lib/hooks/usePostById'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

export default function BlogDetailPage() {
  const { id } = useParams()
  const { post, loading } = usePostById(id as string)

  if (loading) return <p className="p-4">読み込み中...</p>
  if (!post) return <p className="p-4">記事が見つかりませんでした。</p>

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

      {post.thumbnailUrl && (
        <Image
          src={post.thumbnailUrl}
          alt="thumbnail"
          width={800}
          height={450}
          className="rounded mb-4"
        />
      )}

      <p className="text-sm text-gray-500 mb-1">カテゴリ: {post.category}</p>
      <p className="text-sm text-gray-500 mb-4">
        タグ: {post.tags?.join(', ')}
      </p>

      <div className="text-sm text-gray-400 mb-6">
        投稿日: {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
      </div>

      <div className="prose max-w-none prose-blue">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </main>
  )
}
