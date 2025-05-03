'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import Link from 'next/link'

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL

  useEffect(() => {
    if (!user) return
    if (!isAdmin) {
      alert('アクセス権限がありません')
      router.push('/')
    }
  }, [user, isAdmin, router])

  if (!user || !isAdmin) {
    return <p className="p-4">認証中...</p>
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">管理者メニュー</h1>

      <ul className="space-y-4">
        <li>
          <Link
            href="/admin/schools"
            className="block bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700 transition"
          >
            スクール管理
          </Link>
        </li>
        <li>
          <Link
            href="/admin/blog"
            className="block bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700 transition"
          >
            ブログ管理
          </Link>
        </li>
      </ul>
    </main>
  )
}
