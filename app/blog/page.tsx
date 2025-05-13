'use client'

import { getAllPosts } from '@/lib/firestore/getAllPosts'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ブログ記事一覧</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <div className="border rounded p-4 hover:bg-gray-100">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500">{post.category}</p>
                <p className="text-xs text-gray-400">
                  投稿日:{' '}
                  {post.createdAt?.seconds
                    ? new Date(
                        post.createdAt.seconds * 1000
                      ).toLocaleDateString('ja-JP')
                    : '日付未定'}
                </p>
                {post.updatedAt?.seconds &&
                  post.updatedAt.seconds !== post.createdAt?.seconds && (
                    <p className="text-xs text-gray-400">
                      最終更新日:{' '}
                      {new Date(
                        post.updatedAt.seconds * 1000
                      ).toLocaleDateString('ja-JP')}
                    </p>
                  )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
