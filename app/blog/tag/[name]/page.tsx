// app/blog/tag/[name]/page.tsx
import { getPostsByTag } from '@/lib/firestore/getPostsByTag'
import Link from 'next/link'

type Props = { params: { name: string } }

export default async function TagPage({ params }: Props) {
  const posts = await getPostsByTag(params.name)

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        タグ: {decodeURIComponent(params.name)}
      </h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <div className="border rounded p-4 hover:bg-gray-100">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500">{post.category}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
