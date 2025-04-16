/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://pianolang.com', 
    generateRobotsTxt: true,           
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/admin', '/secret-page', '/manage'], // Optional
  };