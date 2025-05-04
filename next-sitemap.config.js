/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://your-site-url.com', // ← 本番URLに変更すること！
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/login'],
}
