'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuth } from '@/lib/hooks/useAuth'

export default function LoginPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // すでにログイン済みならリダイレクト
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push('/') // ログイン成功後リダイレクト
    } catch (error) {
      alert('ログインに失敗しました')
      console.error(error)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">管理者ログイン</h1>
      <button
        onClick={handleLogin}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Googleでログイン
      </button>
    </main>
  )
}
