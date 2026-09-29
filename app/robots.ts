import type { MetadataRoute } from 'next';
import { site } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mentions-legales', '/confidentialite', '/cgu'],
    },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
