// app/privacy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">プライバシーポリシー</h1>
      <p className="mb-4 text-gray-700">
        当サイトでは、ユーザーの閲覧情報をもとにサービス改善や広告配信を行うため、Google
        Analytics 等のツールを使用することがあります。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">収集する情報</h2>
      <p className="text-gray-700 mb-4">
        IPアドレス・ブラウザ情報・訪問履歴など。これらの情報は個人を特定するものではありません。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">第三者サービス</h2>
      <p className="text-gray-700">
        アクセス解析：Google Analytics／広告配信：Google AdSense など
      </p>
    </main>
  )
}
