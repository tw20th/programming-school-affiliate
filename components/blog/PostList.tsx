import { Post } from '@/lib/hooks/usePosts'
import Link from 'next/link'

type Props = {
  posts: Post[]
}

// 本文の先頭100文字を抜粋表示するユーティリティ
const getExcerpt = (markdown: string, maxLength = 100): string => {
  const plainText = markdown.replace(/[#>*_`~\-!\[\]\(\)]+/g, '') // Markdown記法をざっくり除去
  return plainText.length > maxLength
    ? plainText.slice(0, maxLength) + '...'
    : plainText
}

export default function PostList({ posts }: Props) {
  if (posts.length === 0) return <p>記事がまだありません。</p>

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="border p-4 rounded shadow">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold hover:underline">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
          </p>
          <p className="mt-2 text-gray-700">{getExcerpt(post.body)}</p>
        </li>
      ))}
    </ul>
  )
}
