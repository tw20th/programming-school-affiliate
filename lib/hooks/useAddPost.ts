'use client'

import { db } from '@/lib/firebase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { fetchImageByKeyword } from '@/lib/unsplash/fetchImageByKeyword'

export function useAddPost() {
  const addPost = async ({
    title,
    body,
    category,
    tags,
    thumbnailUrl,
  }: {
    title: string
    body: string
    category: string
    tags: string[]
    thumbnailUrl?: string
  }) => {
    const useAutoFetch = !thumbnailUrl?.trim()

    const image = useAutoFetch
      ? await fetchImageByKeyword(`${title} ${category} ${tags.join(' ')}`)
      : null

    console.log('🔍 自動取得実行:', useAutoFetch)
    console.log('🟢 取得した画像:', image)

    if (useAutoFetch) {
      if (image?.url) {
        console.log('✅ 画像自動取得成功:', image.url)
      } else {
        console.warn('⚠️ 画像が見つかりませんでした')
      }
    }

    const postsRef = collection(db, 'posts')
    await addDoc(postsRef, {
      title,
      body,
      category,
      tags,
      thumbnailUrl: useAutoFetch ? image?.url || '' : thumbnailUrl,
      thumbnailAttribution:
        useAutoFetch && image
          ? {
              photographer: image.photographer,
              photographer_url: image.photographer_url,
            }
          : null,
      createdAt: Timestamp.now(),
    })
  }

  return { addPost }
}
