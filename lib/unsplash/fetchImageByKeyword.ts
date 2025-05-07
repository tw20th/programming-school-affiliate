const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!

export type UnsplashImage = {
  url: string
  photographer: string
  photographer_url: string
}

export async function fetchImageByKeyword(
  keyword: string
): Promise<UnsplashImage | null> {
  console.log('🟡 キーワード:', keyword)

  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      keyword
    )}&orientation=landscape&client_id=${accessKey}`
  )

  if (!res.ok) {
    console.error('❌ APIエラー:', res.status, res.statusText)
    return null
  }

  const data = await res.json()
  console.log('✅ APIレスポンス:', JSON.stringify(data, null, 2))

  if (!data?.urls?.regular) {
    console.warn('⚠️ 画像URLが見つかりません')
    return null
  }

  return {
    url: data.urls.regular,
    photographer: data.user.name,
    photographer_url: `https://unsplash.com/@${data.user.username}`,
  }
}
