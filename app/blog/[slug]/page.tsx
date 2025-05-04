// app/blog/[slug]/page.tsx

import { getPostBySlug } from '@/lib/firestore/getPostBySlug'
import { getAllSlugs } from '@/lib/firestore/getAllSlugs' // ★追加
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

// ✅ SSG対象のパスを定義
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ✅ SEOメタ情報
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return { title: '記事が見つかりません' }
  }

  return {
    title: `${post.title} | プログラミングスクール比較ブログ`,
    description: post.body?.slice(0, 80) ?? '',
    openGraph: {
      title: post.title,
      description: post.body?.slice(0, 80),
      images: post.thumbnailUrl ? [{ url: post.thumbnailUrl }] : [],
    },
  }
}

// ✅ ページ本体
export default async function BlogBySlugPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

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
