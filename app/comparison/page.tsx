'use client'

import { useSchools } from '@/lib/hooks/useSchools'
import { useState } from 'react'

import IntroSection from '@/components/comparison/IntroSection'
import GuideLinksSection from '@/components/comparison/GuideLinksSection'
import FAQSection from '@/components/comparison/FAQSection'
import CTASection from '@/components/comparison/CTASection'
import FilterPanel from '@/components/comparison/FilterPanel'
import SchoolList from '@/components/comparison/SchoolList'

export default function ComparisonPage() {
  const { schools, loading } = useSchools()
  const [filterSideJob, setFilterSideJob] = useState(false)
  const [filterCareerChange, setFilterCareerChange] = useState(false)
  const [filterFreeTrial, setFilterFreeTrial] = useState(false)
  const [sortKey, setSortKey] = useState<'price' | 'recommended' | ''>('')

  const filteredSchools = schools.filter((school) => {
    if (filterSideJob && !school.isSideJob) return false
    if (filterCareerChange && !school.isCareerChange) return false
    if (filterFreeTrial && !school.freeTrial) return false
    return true
  })

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
    <main className="px-4 py-6">
      <IntroSection />
      <GuideLinksSection />

      {/* 🎯 フィルターセクションをまとめる */}
      <section className="bg-gray-50 rounded-xl p-6 mb-10 max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">条件で絞り込む</h2>
        <FilterPanel
          filterSideJob={filterSideJob}
          setFilterSideJob={setFilterSideJob}
          filterCareerChange={filterCareerChange}
          setFilterCareerChange={setFilterCareerChange}
          filterFreeTrial={filterFreeTrial}
          setFilterFreeTrial={setFilterFreeTrial}
          sortKey={sortKey}
          setSortKey={setSortKey}
        />
      </section>

      <SchoolList schools={sortedSchools} />

      <FAQSection />
      <CTASection />
    </main>
  )
}
