'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function NewSchoolPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    price: '',
    freeTrial: false,
    features: [''],
    officialUrl: '',
    imageUrl: '',
    recommended: false,
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement
    const { name, value, type, checked } = target
    const newValue = type === 'checkbox' ? checked : value
    setForm((prev) => ({ ...prev, [name]: newValue }))
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
    await addDoc(collection(db, 'schools'), form)
    alert('スクールを追加しました')
    router.push('/admin/schools')
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">スクールの追加</h1>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="スクール名"
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="料金"
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        name="officialUrl"
        value={form.officialUrl}
        onChange={handleChange}
        placeholder="公式URL"
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="画像URL（任意）"
        className="w-full border p-2 mb-3 rounded"
      />

      <label className="block mb-2">
        <input
          type="checkbox"
          name="freeTrial"
          checked={form.freeTrial}
          onChange={handleChange}
          className="mr-2"
        />
        無料体験あり
      </label>

      <label className="block mb-4">
        <input
          type="checkbox"
          name="recommended"
          checked={form.recommended}
          onChange={handleChange}
          className="mr-2"
        />
        おすすめに表示
      </label>

      <div className="mb-4">
        <p className="font-semibold">特徴</p>
        {form.features.map((feature, i) => (
          <div key={i} className="flex gap-2 mt-1">
            <input
              type="text"
              value={feature}
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
        <button
          onClick={addFeature}
          type="button"
          className="mt-2 text-blue-500 text-sm"
        >
          ＋特徴を追加
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        登録する
      </button>
    </main>
  )
}
