/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'programming-school-affiliate.vercel.app', // ← 本番URLに変更すること！
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/login'],
}
