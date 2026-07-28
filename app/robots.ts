import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://universal-autonomous-coding-system-dlma2kyqn.vercel.app/sitemap.xml',
  }
}
