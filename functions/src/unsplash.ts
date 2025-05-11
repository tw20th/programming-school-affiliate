// functions/src/unsplash.ts
import fetch from "node-fetch";
import {defineSecret} from "firebase-functions/params";

// Firebase Secret からキーを安全に取得
export const UNSPLASH_ACCESS_KEY = defineSecret("UNSPLASH_ACCESS_KEY");

export type UnsplashImage = {
  url: string
  photographer: string
  photographer_url: string
}
/**
 * Unsplash APIからランダムな画像を取得して返す
 * @param {string} keyword 検索用キーワード
 * @return {Promise<UnsplashImage | null>} 取得した画像情報 or null
 */
export async function fetchImageByKeyword(
  keyword: string
): Promise<UnsplashImage | null> {
  const accessKey = UNSPLASH_ACCESS_KEY.value();

  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      keyword
    )}&orientation=landscape&client_id=${accessKey}`
  );

  if (!res.ok) {
    console.error("❌ Unsplash API Error:", res.status, res.statusText);
    return null;
  }

  const data = await res.json();

  if (!data?.urls?.regular) {
    console.warn("⚠️ Unsplash画像が見つかりません");
    return null;
  }

  return {
    url: data.urls.regular,
    photographer: data.user.name,
    photographer_url: `https://unsplash.com/@${data.user.username}`,
  };
}
