import type { APIRoute } from 'astro';
import { getAllSlugsForRegion } from '../../lib/posts';
import { isValidRegion, getRegionDomain } from '../../lib/regions';
import type { RegionId } from '../../lib/regions';

// SSR: Dynamic sitemap generation
export const GET: APIRoute = async ({ params }) => {
  const region = params.region;

  if (!region || !isValidRegion(region)) {
    return new Response('Invalid region', { status: 404 });
  }

  const regionId = region as RegionId;
  const baseUrl = getRegionDomain(regionId);
  const slugs = await getAllSlugsForRegion(regionId);

  const now = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${slugs
    .map(
      (slug) => `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
