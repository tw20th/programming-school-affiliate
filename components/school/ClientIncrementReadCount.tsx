'use client'

import { useEffect } from 'react'
import { incrementSchoolReadCount } from '@/lib/firestore/incrementSchoolReadCount'

export default function ClientIncrementReadCount({
  schoolId,
}: {
  schoolId: string
}) {
  useEffect(() => {
    incrementSchoolReadCount(schoolId)
  }, [schoolId])

  return null
}
