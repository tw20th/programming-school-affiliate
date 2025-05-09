import { getPostBySlug } from '@/lib/firestore/getPostBySlug'
import { getAllSlugs } from '@/lib/firestore/getAllSlugs'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

// ✅ SSG対象のパスを定義
export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ✅ SEOメタ情報（OGP対応付き）
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return { title: '記事が見つかりません' }
  }

  const siteUrl = 'https://yourdomain.com' // ← あなたのドメインに変更！

  return {
    title: `${post.title} | プログラミングスクール比較ブログ`,
    description: post.body?.slice(0, 80) ?? '',
    openGraph: {
      title: post.title,
      description: post.body?.slice(0, 80),
      url: `${siteUrl}/blog/${params.slug}`,
      type: 'article',
      images: post.thumbnailUrl
        ? [
            {
              url: post.thumbnailUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.body?.slice(0, 80),
      images: post.thumbnailUrl ? [post.thumbnailUrl] : [],
    },
  }
}

// ✅ ページ本体
export default async function BlogBySlugPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()

  // 🔽 ここが追加部分：未来の投稿は非表示に
  if (
    post.publishedAt?.seconds &&
    post.publishedAt.seconds * 1000 > Date.now()
  ) {
    return (
      <p className="text-center text-gray-500 mt-10">
        この記事はまだ公開されていません。
      </p>
    )
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      {/* 以下はそのままでOK */}
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

      {post.thumbnailUrl && (
        <>
          <Image
            src={
              post.thumbnailUrl?.includes('source.unsplash.com')
                ? '/no-image.png'
                : post.thumbnailUrl
            }
            alt="thumbnail"
            width={800}
            height={450}
            className="rounded mb-2"
          />
          {post.thumbnailAttribution && (
            <p className="text-sm text-gray-500 mb-4">
              Photo by{' '}
              <a
                href={post.thumbnailAttribution.photographer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {post.thumbnailAttribution.photographer}
              </a>{' '}
              on{' '}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Unsplash
              </a>
            </p>
          )}
        </>
      )}

      <p className="text-sm text-gray-500 mb-1">カテゴリ: {post.category}</p>
      <p className="text-sm text-gray-500 mb-4">
        タグ: {post.tags?.join(', ')}
      </p>
      <div className="text-sm text-gray-400 mb-6">
        投稿日: {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
      </div>

      <div className="prose max-w-none prose-blue">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.body?.slice(0, 80) ?? '',
            image: post.thumbnailUrl ? [post.thumbnailUrl] : [],
            author: {
              '@type': 'Person',
              name: '管理人',
            },
            datePublished: new Date(
              post.createdAt.seconds * 1000
            ).toISOString(),
            publisher: {
              '@type': 'Organization',
              name: 'プログラミングスクール比較ブログ',
              logo: {
                '@type': 'ImageObject',
                url: 'https://yourdomain.com/logo.png', // あれば
              },
            },
          }),
        }}
      />
    </main>
  )
}
