import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Region domains mapping
const REGION_DOMAINS = {
  bundang: 'https://bundanghipublic.com',
  suwon: 'https://suwon.vip',
  dongtan: 'https://dongtankaraoke.net',
  jengja: 'https://jengjakaraoke.com',
  ingedong: 'https://ingedongkaraoke.com',
};

export default defineConfig({
  output: 'server',  // SSR for date-based content filtering
  trailingSlash: 'ignore',  // Handle both /slug and /slug/
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
    isr: {
      expiration: 3600,  // Revalidate every hour
    },
  }),
  site: 'https://promotion-blog.vercel.app',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/'),
      customPages: Object.entries(REGION_DOMAINS).flatMap(([_region, domain]) => [
        `${domain}/blog`,
      ]),
    }),
  ],
  build: {
    format: 'directory',
  },
  vite: {
    define: {
      'import.meta.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
      'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY),
    },
  },
});
