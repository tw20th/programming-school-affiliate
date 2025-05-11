// app/faq/page.tsx
export default function FAQPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">よくある質問</h1>

      <div className="space-y-6">
        <div>
          <h2 className="font-semibold">Q. キャラクターは実在しますか？</h2>
          <p className="text-gray-700">
            A. いいえ。読者が自分と重ねやすいように作られた架空の人物です。
          </p>
        </div>
        <div>
          <h2 className="font-semibold">Q. 記事にはPRが含まれていますか？</h2>
          <p className="text-gray-700">
            A.
            一部の記事にはアフィリエイトリンクが含まれており、報酬を得る場合があります。
          </p>
        </div>
        {/* さらに質問を追加可能 */}
      </div>
    </main>
  )
}
