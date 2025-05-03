'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export type School = {
  id: string
  name: string
  features: string[]
  price: string
  freeTrial: boolean
  officialUrl: string
  imageUrl?: string
  featured?: boolean
  recommended?: boolean // ← これを追加
  isSideJob?: boolean
  isCareerChange?: boolean
  description?: string
}

export const useSchools = () => {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSchools = async () => {
      const snapshot = await getDocs(collection(db, 'schools'))
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<School, 'id'>),
      }))
      setSchools(docs)
      setLoading(false)
    }

    fetchSchools()
  }, [])

  return { schools, loading }
}
