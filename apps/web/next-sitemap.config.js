/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://benaribi.ma',
  generateRobotsTxt: true,
  outDir: './out',
  // Disable automatic page detection — we define all 24 entries manually
  exclude: ['/*'],
  additionalPaths: async () => {
    const locales = ['en', 'fr', 'es'];
    const routes = [
      { path: '',                          priority: 1.0 },
      { path: '/services/residential',     priority: 0.8 },
      { path: '/services/industrial',      priority: 0.8 },
      { path: '/services/company-setup',   priority: 0.8 },
      { path: '/investment',               priority: 0.9 },
      { path: '/about',                    priority: 0.7 },
      { path: '/resources',                priority: 0.8 },
      { path: '/contact',                  priority: 0.7 },
    ];

    return locales.flatMap((locale) =>
      routes.map(({ path, priority }) => ({
        loc: `/${locale}${path}`,
        changefreq: 'weekly',
        priority,
        lastmod: new Date().toISOString(),
        alternateRefs: locales.map((l) => ({
          href: `https://benaribi.ma/${l}${path}`,
          hreflang: l,
        })),
      }))
    );
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
};
