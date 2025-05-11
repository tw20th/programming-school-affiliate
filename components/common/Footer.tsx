export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-sm text-gray-500 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
        <p>
          &copy; {new Date().getFullYear()} プログラミングスクール比較サイト
        </p>
        <p>本サイトはアフィリエイト広告を含みます。</p>
        <div className="space-x-4 mt-2">
          <a href="/privacy" className="hover:underline">
            プライバシーポリシー
          </a>
          <a href="/about/operator" className="hover:underline">
            運営者情報
          </a>
        </div>
      </div>
    </footer>
  )
}
