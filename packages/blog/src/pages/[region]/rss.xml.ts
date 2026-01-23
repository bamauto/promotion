import type { APIRoute } from 'astro';
import { getPostsWithImagesForSitemap } from '../../lib/posts';
import { REGIONS, isValidRegion, getRegionDomain } from '../../lib/regions';
import type { RegionId } from '../../lib/regions';

// RSS feed for Google Discover and feed readers
export const GET: APIRoute = async ({ params }) => {
  const region = params.region;

  if (!region || !isValidRegion(region)) {
    return new Response('Invalid region', { status: 404 });
  }

  const regionId = region as RegionId;
  const regionData = REGIONS[regionId];
  const baseUrl = getRegionDomain(regionId);
  const posts = await getPostsWithImagesForSitemap(regionId);

  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const now = new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(regionData.name)} ${escapeXml(regionData.keyword)} 블로그</title>
    <description>${escapeXml(regionData.description)}</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <language>ko-KR</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>Astro</generator>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published_at || Date.now()).toUTCString()}</pubDate>
      <description>${escapeXml(post.title)} - ${escapeXml(regionData.name)} ${escapeXml(regionData.keyword)} 정보</description>${
          post.featuredImage
            ? `
      <media:content url="${escapeXml(post.featuredImage.url)}" medium="image">
        <media:title>${escapeXml(post.featuredImage.alt)}</media:title>
      </media:content>`
            : ''
        }
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
