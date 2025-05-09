import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Post } from '@/lib/hooks/usePosts'

const getPosts = async (): Promise<Post[]> => {
  const snapshot = await getDocs(collection(db, 'posts'))
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, 'id'>),
  }))
}

export default async function AnalyticsPage() {
  const posts = await getPosts()

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">投稿の効果分析</h1>
        <a
          href="/admin/analytics/schools"
          className="text-sm text-blue-600 hover:underline"
        >
          スクール分析へ →
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">タイトル</th>
              <th className="border p-2">閲覧数</th>
              <th className="border p-2">クリック数</th>
              <th className="border p-2">CTR（%）</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const read = post.readCount ?? 0
              const click = post.clickCount ?? 0
              const ctr = read > 0 ? ((click / read) * 100).toFixed(1) : '0.0'

              return (
                <tr key={post.id}>
                  <td className="border p-2">{post.title}</td>
                  <td className="border p-2 text-center">{read}</td>
                  <td className="border p-2 text-center">{click}</td>
                  <td className="border p-2 text-center">{ctr}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
