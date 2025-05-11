import { GeneratedPost } from '@/types/post'
import { parseTags, parseInternalLinks } from '@/lib/utils/parser'

export const parseGeneratedPost = (raw: string): GeneratedPost => {
  const match = raw.match(
    /■ タイトル\s*(.+?)\n+■ カテゴリ\s*(.+?)\n+■ 本文（Markdown）\s*([\s\S]+?)\n+■ サムネ画像キーワード\s*(.+?)\n+■ タグ\s*([\s\S]+?)\n+■ 推奨内部リンク\s*([\s\S]+)$/i
  )

  if (!match) {
    throw new Error('OpenAIの出力形式が期待と異なります。')
  }

  const [, title, category, body, thumbnailKeywords, tagsRaw, linksRaw] = match

  return {
    title: title.trim(),
    body: body.trim(),
    category: category.trim(),
    thumbnailKeywords: thumbnailKeywords.trim(),
    tags: parseTags(tagsRaw),
    internalLinks: parseInternalLinks(linksRaw),
  }
}
