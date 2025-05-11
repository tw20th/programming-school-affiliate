// components/blog/AuthorCard.tsx
export const AuthorCard = () => {
  return (
    <div className="mt-10 p-4 border border-gray-200 rounded-md bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-2 text-blue-600">
        この記事のモデル
      </h2>
      <p className="text-sm text-gray-700 mb-1">
        本記事は「佐藤さん（38歳・営業・2児のパパ）」というモデルケースに基づいて構成されています。
      </p>
      <p className="text-sm text-gray-600">
        実在の人物ではありませんが、同じような悩みを持つ方の参考になるよう設計されています。
      </p>
    </div>
  )
}
