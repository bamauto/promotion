#!/usr/bin/env node

// Ping Google with updated sitemaps for all regions
const regions = [
  { id: 'bundang', domain: 'bundanghipublic.com' },
  { id: 'dongtan', domain: 'dongtankaraoke.net' },
  { id: 'ingedong', domain: 'ingedongkaraoke.com' },
  { id: 'jengja', domain: 'jengjakaraoke.com' },
  { id: 'gwanggyo', domain: 'gwanggyokaraoke.com' },
  { id: 'yeongtong', domain: 'yeongtongkaraoke.com' },
  { id: 'suwon', domain: 'suwon.vip' },
  { id: 'anyang', domain: 'anyangkaraoke.com' },
  { id: 'suji', domain: 'sujikaraoke.com' },
  { id: 'pyeongchon', domain: 'pc-karaoke.com' },
  { id: 'giheung', domain: 'giheungkaraoke.com' },
  { id: 'osan', domain: 'osankaraoke.com' },
  { id: 'suwon_shirt', domain: 'suwonshirt.com' },
];

async function pingSitemap(domain, sitemapPath) {
  const sitemapUrl = `https://${domain}${sitemapPath}`;
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  try {
    const response = await fetch(pingUrl);
    if (response.ok) {
      console.log(`✓ Pinged: ${sitemapUrl}`);
    } else {
      console.log(`✗ Failed: ${sitemapUrl} (${response.status})`);
    }
  } catch (error) {
    console.log(`✗ Error: ${sitemapUrl} - ${error.message}`);
  }
}

async function main() {
  console.log('Pinging Google with updated sitemaps...\n');

  for (const region of regions) {
    await pingSitemap(region.domain, '/sitemap.xml');
    await pingSitemap(region.domain, '/sitemap-blog.xml');
  }

  console.log('\nDone!');
}

main();
