'use client'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  filterSideJob: boolean
  setFilterSideJob: Dispatch<SetStateAction<boolean>>
  filterCareerChange: boolean
  setFilterCareerChange: Dispatch<SetStateAction<boolean>>
  filterFreeTrial: boolean
  setFilterFreeTrial: Dispatch<SetStateAction<boolean>>
  sortKey: 'price' | 'recommended' | ''
  setSortKey: Dispatch<SetStateAction<'price' | 'recommended' | ''>>
}

export default function FilterPanel({
  filterSideJob,
  setFilterSideJob,
  filterCareerChange,
  setFilterCareerChange,
  filterFreeTrial,
  setFilterFreeTrial,
  sortKey,
  setSortKey,
}: Props) {
  return (
    <div className="w-full flex flex-wrap gap-4 items-center justify-center md:justify-start">
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
  )
}
