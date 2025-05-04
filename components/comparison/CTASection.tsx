import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="bg-blue-50 p-6 rounded-lg max-w-3xl mx-auto mt-12 text-center">
      <h2 className="text-xl font-semibold mb-3">
        まずは無料体験から始めてみませんか？
      </h2>
      <p className="mb-4">
        どのスクールが合っているか迷っている方も、まずは体験してみることで「ここなら続けられそう」が見えてきます。
      </p>
      <Link
        href="/comparison#trial"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        無料体験できるスクールを探す
      </Link>
    </section>
  )
}
