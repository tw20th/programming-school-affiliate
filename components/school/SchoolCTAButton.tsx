'use client'

import { incrementSchoolClickCount } from '@/lib/firestore/incrementSchoolClickCount'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

type Props = {
  schoolId: string
  affiliateUrl: string
}

export default function SchoolCTAButton({ schoolId, affiliateUrl }: Props) {
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuthed(!!user)
      console.log('👤 auth 状態:', user)
    })
    return () => unsub()
  }, [])

  const handleClick = async () => {
    if (!isAuthed) {
      alert('管理者ログインが必要です')
      return
    }

    try {
      await incrementSchoolClickCount(schoolId)
      window.open(affiliateUrl, '_blank')
    } catch (error) {
      console.error('クリック数の記録に失敗しました', error)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
    >
      公式サイトを見る
    </button>
  )
}
