import { db } from '../firebase'
import { doc, increment, updateDoc } from 'firebase/firestore'

export const incrementSchoolReadCount = async (schoolId: string) => {
  const ref = doc(db, 'schools', schoolId)
  await updateDoc(ref, {
    readCount: increment(1),
  })
}
