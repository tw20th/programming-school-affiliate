// lib/firestore/incrementClickCount.ts

import { db } from '../firebase'
import { doc, increment, updateDoc } from 'firebase/firestore'

export const incrementSchoolClickCount = async (schoolId: string) => {
  const schoolRef = doc(db, 'schools', schoolId)
  await updateDoc(schoolRef, {
    clickCount: increment(1),
  })
}
