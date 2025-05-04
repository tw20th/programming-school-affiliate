// lib/firestore/getSchools.ts

import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import type { School } from '@/types/school'

// 🔹 全スクール取得（SSG用）
export async function getSchools(): Promise<School[]> {
  const snap = await getDocs(collection(db, 'schools'))
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as School))
}

// 🔹 slugからスクール1件取得
export async function getSchoolBySlug(slug: string): Promise<School | null> {
  const q = query(collection(db, 'schools'), where('slug', '==', slug))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as School
}
