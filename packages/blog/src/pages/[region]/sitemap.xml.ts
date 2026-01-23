import type { APIRoute } from 'astro';
import { getPostsWithImagesForSitemap } from '../../lib/posts';
import { isValidRegion, getRegionDomain } from '../../lib/regions';
import type { RegionId } from '../../lib/regions';

// SSR: Dynamic sitemap generation with images for Google Image indexing
export const GET: APIRoute = async ({ params }) => {
  const region = params.region;

  if (!region || !isValidRegion(region)) {
    return new Response('Invalid region', { status: 404 });
  }

  const regionId = region as RegionId;
  const baseUrl = getRegionDomain(regionId);
  const posts = await getPostsWithImagesForSitemap(regionId);

  const now = new Date().toISOString();

  // Escape XML special characters
  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.published_at || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${
      post.featuredImage
        ? `
    <image:image>
      <image:loc>${escapeXml(post.featuredImage.url)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.featuredImage.alt)}</image:caption>
    </image:image>`
        : ''
    }
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
