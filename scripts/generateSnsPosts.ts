// scripts/generateSnsPosts.ts

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

// 🔐 Firebase 認証（base64から復元）
const base64 = process.env.FIREBASE_ADMIN_KEY_BASE64
if (!base64) throw new Error('FIREBASE_ADMIN_KEY_BASE64 が設定されていません')

const serviceAccount = JSON.parse(
  Buffer.from(base64, 'base64').toString('utf8')
)

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

function extractTags(text: string): string[] {
  return (text.match(/#[\p{L}0-9_]+/gu) || []).map((tag) => tag.trim())
}

async function generateSnsPosts() {
  const snapshot = await db
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(10)
    .get()

  const posts = snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      keyword: data.keyword,
      variantId: data.variantId || 'A',
    }
  })

  for (const post of posts) {
    const prompt = `
あなたは38歳の共働きパパです。Twitter向けに、以下の記事を紹介する投稿文を140文字以内で考えてください。

【条件】
- 導入文で共感や気づきを一言で伝える
- 「記事はこちら」などの自然な誘導
- 適切なハッシュタグを2〜3個（#プログラミング #副業 など）
- URLを文末に含める

【記事タイトル】
${post.title}

【記事リンク】
https://your-site.com/blog/${post.slug}
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content:
            'あなたはTwitter用の日本語SNSコピーライターです。140文字以内で共感と行動を促す投稿文を作成してください。',
        },
        { role: 'user', content: prompt },
      ],
    })

    const snsText = response.choices[0]?.message.content?.trim() || '(出力なし)'
    const tags = extractTags(snsText)

    const now = new Date()
    const scheduled = new Date(now.getTime() + 60 * 60 * 1000) // 仮に1時間後

    // ✅ Firestore に保存
    await db.collection('snsPosts').add({
      postId: post.id,
      slug: post.slug,
      variantId: post.variantId,
      text: snsText,
      tags,
      createdAt: Timestamp.fromDate(now),
      scheduledAt: Timestamp.fromDate(scheduled),
      platform: 'x',
      shortUrl: `https://your-site.com/blog/${post.slug}`,
      imageUrl: '', // 必要ならサムネイルURLを追加
      generatedBy: 'default-v1',
    })

    console.log(`✅ 保存済み: ${post.title}`)
    console.log(snsText)
    console.log('---')
  }
}

generateSnsPosts()
