export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-sm text-gray-500 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} プログラミングスクール比較サイト
        </p>
        <p className="mt-1">本サイトはアフィリエイト広告を含みます。</p>
      </div>
    </footer>
  )
}
