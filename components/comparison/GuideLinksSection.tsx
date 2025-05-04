import Link from 'next/link'

export default function GuideLinksSection() {
  const guides = [
    {
      title: 'プログラミングって実際どうなの？',
      href: '/blog/programming-beginner-complete-guide',
    },
    {
      title: 'スクールの選び方5つのポイント',
      href: '/blog/choose-programming-school-5-tips',
    },
    {
      title: '未経験から副業に成功した体験談',
      href: '/blog/sidejob-success-programming-school',
    },
    {
      title: 'スクール選びで後悔しないために',
      href: '/blog/school-failures-and-how-to-avoid',
    },
    {
      title: '受講前チェックリスト',
      href: '/blog/check-before-apply-programming-school',
    },
  ]

  return (
    <section className="bg-gray-50 p-6 rounded-lg mb-10 max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">
        迷っている方はまずこちらの記事から
      </h2>
      <ul className="space-y-2 list-disc list-inside">
        {guides.map((guide) => (
          <li key={guide.href}>
            <Link href={guide.href} className="text-blue-600 hover:underline">
              {guide.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
