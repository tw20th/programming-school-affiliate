'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

type School = {
  name: string
  price: string
  freeTrial: boolean
  features: string[]
  description?: string
  isSideJob?: boolean
  isCareerChange?: boolean
}

export default function EditSchoolPage() {
  const { id } = useParams()

  const router = useRouter()

  const [form, setForm] = useState<School>({
    name: '',
    price: '',
    freeTrial: false,
    features: [],
    description: '',
    isSideJob: false,
    isCareerChange: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'schools', id as string)
      const snap = await getDoc(docRef)
      if (snap.exists()) {
        const data = snap.data() as School
        setForm(data)
      }
    }
    fetchData()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...form.features]
    updated[index] = value
    setForm((prev) => ({ ...prev, features: updated }))
  }

  const addFeature = () =>
    setForm((prev) => ({ ...prev, features: [...prev.features, ''] }))
  const removeFeature = (index: number) =>
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))

  const handleSubmit = async () => {
    const docRef = doc(db, 'schools', id as string)
    await updateDoc(docRef, form)
    alert('更新しました！')
    router.push('/admin/schools')
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">スクール情報の編集</h1>

      <label className="block mb-2">
        スクール名
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 mt-1 rounded"
        />
      </label>

      <label className="block mb-2">
        料金
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 mt-1 rounded"
        />
      </label>

      <label className="block mb-2">
        無料体験
        <input
          type="checkbox"
          name="freeTrial"
          checked={form.freeTrial}
          onChange={handleChange}
          className="ml-2"
        />
      </label>

      <div className="mb-4">
        <p className="font-semibold">特徴</p>
        {form.features.map((f, i) => (
          <div key={i} className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={f}
              onChange={(e) => handleFeatureChange(i, e.target.value)}
              className="border p-1 flex-1 rounded"
            />
            <button
              type="button"
              onClick={() => removeFeature(i)}
              className="text-red-500 text-sm"
            >
              削除
            </button>
          </div>
        ))}
        <label className="block mb-2">
          説明文
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 mt-1 rounded"
            rows={3}
          />
        </label>

        <label className="block mb-2">
          <input
            type="checkbox"
            name="isSideJob"
            checked={form.isSideJob}
            onChange={handleChange}
            className="mr-2"
          />
          副業向け
        </label>

        <label className="block mb-4">
          <input
            type="checkbox"
            name="isCareerChange"
            checked={form.isCareerChange}
            onChange={handleChange}
            className="mr-2"
          />
          転職向け
        </label>
        <button
          type="button"
          onClick={addFeature}
          className="mt-2 text-blue-500 text-sm"
        >
          ＋特徴を追加
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        更新する
      </button>
    </main>
  )
}
