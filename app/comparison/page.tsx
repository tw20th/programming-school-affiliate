'use client'

import { useSchools } from '@/lib/hooks/useSchools'
import { useState } from 'react'
import SchoolCard from '@/components/SchoolCard'

export default function ComparisonPage() {
  const { schools, loading } = useSchools()
  const [filterSideJob, setFilterSideJob] = useState(false)
  const [filterCareerChange, setFilterCareerChange] = useState(false)
  const [filterFreeTrial, setFilterFreeTrial] = useState(false)
  const [sortKey, setSortKey] = useState<'price' | 'recommended' | ''>('')

  // 🔍 条件でフィルター
  const filteredSchools = schools.filter((school) => {
    if (filterSideJob && !school.isSideJob) return false
    if (filterCareerChange && !school.isCareerChange) return false
    if (filterFreeTrial && !school.freeTrial) return false
    return true
  })

  // 📊 並び替え
  const sortedSchools = [...filteredSchools].sort((a, b) => {
    if (sortKey === 'price') {
      return (
        parseInt(a.price.replace(/[^0-9]/g, '')) -
        parseInt(b.price.replace(/[^0-9]/g, ''))
      )
    }
    if (sortKey === 'recommended') {
      return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0)
    }
    return 0
  })

  if (loading) return <p className="p-4">読み込み中...</p>

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">プログラミングスクール比較</h1>

      {/* 🔍 フィルター */}
      <div className="mb-6 flex flex-wrap gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filterSideJob}
            onChange={() => setFilterSideJob(!filterSideJob)}
          />
          副業向け
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filterCareerChange}
            onChange={() => setFilterCareerChange(!filterCareerChange)}
          />
          転職向け
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filterFreeTrial}
            onChange={() => setFilterFreeTrial(!filterFreeTrial)}
          />
          無料体験あり
        </label>

        <select
          value={sortKey}
          onChange={(e) =>
            setSortKey(e.target.value as 'price' | 'recommended' | '')
          }
          className="border rounded p-1 text-sm"
        >
          <option value="">並び替え</option>
          <option value="price">料金が安い順</option>
          <option value="recommended">おすすめ順</option>
        </select>
      </div>

      {/* 📦 カードレイアウト */}
      <div className="grid gap-6 md:grid-cols-2">
        {sortedSchools.length > 0 ? (
          sortedSchools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))
        ) : (
          <p className="text-gray-500">
            条件に合うスクールが見つかりませんでした。
          </p>
        )}
      </div>
    </main>
  )
}
