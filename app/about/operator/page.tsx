// app/about/operator/page.tsx
export default function OperatorPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">運営者情報</h1>
      <p className="mb-4 text-gray-700">
        当サイト「プログラミングスクール比較ブログ」は、副業や転職に挑戦したい方の支援を目的とした個人運営のメディアです。
      </p>

      <ul className="text-gray-700 space-y-2">
        <li>運営者：渡辺 友樹（個人）</li>
        <li>連絡先：example@example.com</li>
        <li>所在地：東京都内（詳細は開示していません）</li>
        <li>目的：信頼性のある情報提供と比較検討の支援</li>
      </ul>
    </main>
  )
}
