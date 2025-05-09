// lib/openai/generatePostByKeyword.ts

'use server'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export type GeneratedPost = {
  title: string
  body: string
  category: string
  tags: string[]
  thumbnailKeywords: string
  internalLinks: string[]
}

export async function generatePostByKeyword(
  keyword: string
): Promise<GeneratedPost> {
  const prompt = `
【キャラクター設定】
あなたは38歳の営業職、共働きで子どもが2人いるという設定の「共感キャラクター」です。
読者と同じ目線・等身大の語り口で、自分の体験を語りながら文章を綴ってください。

【キーワード】
${keyword}

【ブログ記事の出力構造】
以下の形式で出力してください（順番厳守）：

■ タイトル  
（読者の心に引っかかる自然なタイトル）

■ カテゴリ  
（例: 副業, プログラミング学習, 体験談 など）

■ 本文（Markdown）  
導入 → 悩み → 試行錯誤 → 気づき → リンク誘導  
※ 改行や見出し（##）を活用し、共感・感情重視で書くこと

■ サムネ画像キーワード（英単語3つ／カンマ区切り）

■ タグ（3〜5個）  
カンマ区切り、またはリスト形式でもOK（日本語・英語どちらでも可）

■ 推奨内部リンク（最大3つ）  
以下の中から関連性の高いものを選び、スラッグ形式で出力してください：

/comparison  
/blog/choose-programming-school-5-tips  
/blog/sidejob-success-programming-school  
/blog/check-before-apply-programming-school  
/blog/school-failures-and-how-to-avoid  
/blog/programming-beginner-complete-guide

【キーワード】
${keyword}

この形式に絶対に従ってください。
Markdown記法の本文と、キーワードを反映した共感的なストーリーをお願いします。
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'あなたはSEOにも強い日本語の共感型ブログライターです。',
      },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
  })

  const raw = response.choices[0]?.message.content ?? ''

  // 🔍 正規表現で各項目を抽出
  const match = raw.match(
    /■ タイトル\s*(.+?)\n+■ カテゴリ\s*(.+?)\n+■ 本文（Markdown）\s*([\s\S]+?)\n+■ サムネ画像キーワード\s*(.+?)\n+■ タグ\s*([\s\S]+?)\n+■ 推奨内部リンク\s*([\s\S]+)$/i
  )

  if (!match) {
    throw new Error('OpenAIの出力形式が期待と異なります。')
  }

  const [, title, category, body, thumbnailKeywords, tagsRaw, linksRaw] = match

  const tags = tagsRaw
    .split(/,|\n|・|・/)
    .map((t) => t.trim())
    .filter((t) => t)

  const internalLinks = linksRaw
    .split(/\s|\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith('/'))

  return {
    title: title.trim(),
    body: body.trim(),
    category: category.trim(),
    thumbnailKeywords: thumbnailKeywords.trim(),
    tags,
    internalLinks,
  }
}
