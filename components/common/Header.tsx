'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/hooks/useAuth'

export const Header = () => {
  const { user } = useAuth()
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="ロゴ"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-lg font-bold text-blue-600 whitespace-nowrap">
            スクール比較
          </span>
        </Link>

        {/* PC用ナビ */}
        <nav className="hidden md:flex space-x-4 text-sm items-center">
          <Link href="/comparison" className="hover:underline">
            スクール比較
          </Link>
          <Link href="/blog" className="hover:underline">
            ブログ
          </Link>
          <Link href="/about" className="hover:underline">
            キャラ紹介
          </Link>
          <Link href="/policy" className="hover:underline">
            サイトポリシー
          </Link>
          <Link href="/faq" className="hover:underline">
            よくある質問
          </Link>
          {isAdmin ? (
            <Link
              href="/admin"
              className="text-red-600 font-semibold hover:underline"
            >
              管理者
            </Link>
          ) : (
            <Link href="/login" className="hover:underline">
              ログイン
            </Link>
          )}
        </nav>

        {/* ハンバーガーアイコン */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="メニューを開く"
        >
          ☰
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 text-sm bg-white border-t">
          <Link
            href="/comparison"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            スクール比較
          </Link>
          <Link
            href="/blog"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            ブログ
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            キャラ紹介
          </Link>
          <Link
            href="/policy"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            サイトポリシー
          </Link>
          <Link
            href="/faq"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            よくある質問
          </Link>
          {isAdmin ? (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="block text-red-600"
            >
              管理者
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block"
            >
              ログイン
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
