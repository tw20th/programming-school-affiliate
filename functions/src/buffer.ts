import * as logger from 'firebase-functions/logger'
import { getFirestore } from 'firebase-admin/firestore'
import fetch from 'node-fetch'

const db = getFirestore()

const BUFFER_ACCESS_TOKEN = process.env.BUFFER_ACCESS_TOKEN!
const BUFFER_PROFILE_ID = process.env.BUFFER_PROFILE_ID!

/**
 * Firestoreから最新の投稿を取得し、Buffer API経由でXへ投稿する
 */
export async function postLatestToBuffer() {
  const snap = await db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()

  if (snap.empty) {
    logger.warn('⚠️ Firestoreに投稿が見つかりませんでした')
    return
  }

  const post = snap.docs[0].data()

  const tweetText = `${post.title}｜${post.category}\n\n${post.body
    .slice(0, 70)
    .trim()}...\n\n続きを読む👇\nhttps://yoursite.com/blog/${post.slug}`

  try {
    const response = await fetch(
      'https://api.bufferapp.com/1/updates/create.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: BUFFER_ACCESS_TOKEN,
          profile_ids: [BUFFER_PROFILE_ID],
          text: tweetText,
        }),
      }
    )

    const result = await response.json()

    if (response.ok) {
      logger.info('✅ Bufferへの投稿に成功しました', result)
    } else {
      logger.error('❌ Bufferへの投稿に失敗しました', result)
    }
  } catch (error) {
    logger.error('❌ Buffer API通信エラー', error)
  }
}
