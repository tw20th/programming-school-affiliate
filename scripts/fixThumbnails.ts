// scripts/fixThumbnails.ts

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import fetch from 'node-fetch'
import 'dotenv/config'

const base64 = process.env.FIREBASE_ADMIN_KEY_BASE64
if (!base64) throw new Error('FIREBASE_ADMIN_KEY_BASE64 が未定義です')

const serviceAccount = JSON.parse(
  Buffer.from(base64, 'base64').toString('utf-8')
)

initializeApp({ credential: cert(serviceAccount) })
const db = getFirestore()

const accessKey = process.env.UNSPLASH_ACCESS_KEY!
if (!accessKey) throw new Error('NEXT_PUBLIC_UNSPLASH_ACCESS_KEY が未定義です')

async function fetchImage(keyword: string) {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      keyword
    )}&orientation=landscape&client_id=${accessKey}`
  )
  if (!res.ok) return null

  const data = await res.json()
  return {
    url: data.urls.regular,
    photographer: data.user.name,
    photographer_url: `https://unsplash.com/@${data.user.username}`,
  }
}

async function fixThumbnails() {
  const snapshot = await db.collection('posts').get()
  const updates = snapshot.docs.map(async (doc) => {
    const data = doc.data()
    if (data.thumbnailUrl) return // 画像ありならスキップ

    const keyword = data.keyword || data.category || 'プログラミング'
    const image = await fetchImage(keyword)
    if (!image) {
      console.warn(`⚠️ No image for: ${doc.id}`)
      return
    }

    await doc.ref.update({
      thumbnailUrl: image.url,
      thumbnailAttribution: {
        photographer: image.photographer,
        photographer_url: image.photographer_url,
      },
      updatedAt: new Date(),
    })

    console.log(`🖼 画像追加: ${doc.id}`)
  })

  await Promise.all(updates)
  console.log('🎉 サムネ画像補完完了！')
}

fixThumbnails().catch(console.error)
