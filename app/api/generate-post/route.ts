import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'

export async function POST(req: Request) {
  const { keyword } = await req.json()

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  })

  const prompt = `
【キャラクター設定】
あなたは38歳の営業職、共働きで子どもが2人いるという設定の「共感キャラクター」です。
読者と同じ目線・等身大の語り口で、自分の体験を語りながら文章を綴ってください。

【ブログ記事の出力構造】
以下の形式で出力してください（順番厳守・ラベル厳守）：

■ タイトル  
読者の心に引っかかる自然なタイトルをつけてください

■ カテゴリ  
副業／プログラミング学習／体験談／スクール選び など適切なカテゴリを1つ

■ 本文（Markdown）  
見出し（##）、リスト、改行を使って読みやすく書いてください。  
導入は感情・共感から入り、不安や悩み → 試行錯誤 → 気づき → 軽いリンク誘導 の流れで構成してください。

■ サムネ画像キーワード  
英単語3つをカンマ区切りで。記事の雰囲気・感情を反映（例: night, home, quiet）

■ タグ  
副業, プログラミング, 子育て, 体験談, 未経験 など3〜5個（カンマ区切り）

■ 推奨内部リンク  
下記から最大3つ選び、スラッグ形式で出力してください：
/comparison  
/blog/choose-programming-school-5-tips  
/blog/sidejob-success-programming-school  
/blog/check-before-apply-programming-school  
/blog/school-failures-and-how-to-avoid  
/blog/programming-beginner-complete-guide

【キーワード】
${keyword}

この形式に**必ず**従ってください。
`

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.7,
    messages: [
      {
        role: 'system',
        content:
          'あなたは共感を大切にする日本語のブログライターです。SEOにも強く、Markdown形式で記事を書きます。',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const raw = response.choices[0]?.message.content ?? ''
  console.log('🧾 OpenAI生成結果:', raw)

  const match = raw.match(
    /■ タイトル\s*(.+?)\n+■ カテゴリ\s*(.+?)\n+■ 本文（Markdown）\s*([\s\S]+?)\n+■ サムネ画像キーワード\s*(.+?)\n+■ タグ\s*([\s\S]+?)\n+■ 推奨内部リンク\s*([\s\S]+)$/i
  )

  if (!match) {
    return NextResponse.json(
      { error: '構造が不正です。OpenAI出力形式に問題があります。' },
      { status: 400 }
    )
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

  return NextResponse.json({
    title: title.trim(),
    body: body.trim(),
    category: category.trim(),
    thumbnailKeywords: thumbnailKeywords.trim(),
    tags,
    internalLinks,
  })
}
