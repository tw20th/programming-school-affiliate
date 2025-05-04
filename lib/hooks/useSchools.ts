'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import type { School } from '@/types/school'

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
