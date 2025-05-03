'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import Link from 'next/link' // ← これを忘れずに！

type School = {
  id: string
  name: string
  price: string
  freeTrial: boolean
  features: string[]
}

export default function AdminSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])

  const fetchSchools = async () => {
    const snapshot = await getDocs(collection(db, 'schools'))
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<School, 'id'>),
    }))
    setSchools(data)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('このスクールを削除しますか？')) return
    await deleteDoc(doc(db, 'schools', id))
    await fetchSchools()
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">スクール管理</h1>
      <div className="mb-6">
        <Link
          href="/admin/schools/new"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          ＋スクールを新規追加
        </Link>
      </div>
      {schools.map((s) => (
        <div key={s.id} className="border p-4 mb-3 rounded shadow-sm">
          <p className="font-semibold">{s.name}</p>
          <p className="text-sm text-gray-600">💰 {s.price}</p>
          <p className="text-sm text-gray-600">
            🎁 無料体験: {s.freeTrial ? 'あり' : 'なし'}
          </p>

          <div className="flex gap-4 mt-2">
            <Link
              href={`/admin/schools/${s.id}/edit`}
              className="text-blue-500 text-sm hover:underline"
            >
              編集
            </Link>
            <button
              onClick={() => handleDelete(s.id)}
              className="text-sm text-red-500 hover:underline"
            >
              削除
            </button>
          </div>
        </div>
      ))}
    </main>
  )
}
