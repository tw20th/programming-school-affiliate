import { Post } from '@/lib/hooks/usePosts'
import Link from 'next/link'

type Props = {
  posts: Post[]
}

export default function PostList({ posts }: Props) {
  if (posts.length === 0) return <p>記事がまだありません。</p>

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="border p-4 rounded shadow">
          <Link href={`/blog/${post.id}`}>
            <h2 className="text-xl font-semibold hover:underline">
              {post.title}
            </h2>
          </Link>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
          </p>
          <p className="mt-2 text-gray-700">{post.body}</p>
        </li>
      ))}
    </ul>
  )
}
