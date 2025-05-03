'use client'

import PostList from '@/components/PostList'
import { usePosts } from '@/lib/hooks/usePosts'

export default function BlogPage() {
  const { posts, loading } = usePosts()

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ブログ記事一覧</h1>
      {loading ? <p>読み込み中...</p> : <PostList posts={posts} />}
    </main>
  )
}
