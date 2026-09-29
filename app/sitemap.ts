import type { MetadataRoute } from 'next';
import { site } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/en-ligne', '/community', '/box'].map((path) => ({
    url: `${site.domain}${path}`,
  }));
}
