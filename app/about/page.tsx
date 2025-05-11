// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">キャラクター紹介</h1>
      <p className="mb-6 text-gray-700">
        当サイトでは、実在の人物ではなく“モデルケース”として架空のキャラクターを使っています。
        共感しやすくするための工夫であり、読者が自分に近い立場をイメージしやすくなることを目的としています。
      </p>

      <ul className="space-y-4">
        <li className="border p-4 rounded shadow-sm">
          <h2 className="font-semibold">佐藤さん（38歳・営業・2児のパパ）</h2>
          <p className="text-sm text-gray-600">
            家族を支えながら副業を始めたいと考えているキャラクターです。
          </p>
        </li>
        <li className="border p-4 rounded shadow-sm">
          <h2 className="font-semibold">田中さん（41歳・経理・独身）</h2>
          <p className="text-sm text-gray-600">
            将来の転職に向けてスキルアップを目指しています。
          </p>
        </li>
        {/* 必要に応じて他のキャラも追加 */}
      </ul>
    </main>
  )
}
