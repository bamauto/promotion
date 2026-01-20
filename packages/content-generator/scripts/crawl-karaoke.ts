#!/usr/bin/env tsx
/**
 * Crawl content from karaokesuwon.com/column
 * Remove 아우라 business references and save to database
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config();

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Terms to remove/replace
const REMOVE_PATTERNS = [
  /아우라/g,
  /AURA/gi,
  /수원아우라/g,
  /인계동아우라/g,
  /아우라 가라오케/g,
  /아우라 하이퍼블릭/g,
  /시우 실장/g,
  /010-2408-1253/g,
  /010-8129-7594/g,
  /karaokesuwon\.com/g,
  /https:\/\/karaokesuwon\.com\/?/g,
];

// Sections to remove entirely (contact info, etc.)
const REMOVE_SECTIONS = [
  /이용 문의 및 안내[\s\S]*?자세한 정보 보기[\s\S]*?karaokesuwon\.com\/?/g,
  /시우 실장[\s\S]*?010-\d{4}-\d{4}/g,
];

interface Article {
  url: string;
  title: string;
  content: string;
  images: string[];
}

/**
 * Fetch HTML content from URL
 */
async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
  });
  return response.text();
}

/**
 * Extract article URLs from listing page
 */
function extractArticleUrls(html: string): string[] {
  const urls: string[] = [];
  const regex = /\/column\/\?q=[^"&]+&bmode=view&idx=\d+&t=board/g;
  const matches = html.match(regex);
  
  if (matches) {
    for (const match of matches) {
      const fullUrl = `https://karaokesuwon.com${match}`;
      if (!urls.includes(fullUrl)) {
        urls.push(fullUrl);
      }
    }
  }
  
  return urls;
}

/**
 * Extract article content from detail page
 */
function extractArticleContent(html: string): { title: string; content: string; images: string[] } {
  // Extract title
  const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  // Extract main content area
  const contentMatch = html.match(/<div[^>]*class="[^"]*se-viewer[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<button/);
  let content = '';
  
  if (contentMatch) {
    content = contentMatch[1];
  } else {
    // Fallback: extract paragraphs
    const paragraphs: string[] = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
    let match;
    while ((match = pRegex.exec(html)) !== null) {
      const text = match[1]
        .replace(/<[^>]+>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
      if (text.length > 20) {
        paragraphs.push(text);
      }
    }
    content = paragraphs.join('\n\n');
  }
  
  // Clean HTML tags from content
  content = content
    .replace(/<img[^>]*>/g, '') // Remove images
    .replace(/<[^>]+>/g, '') // Remove other HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Extract images
  const images: string[] = [];
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    if (!imgMatch[1].includes('logo') && !imgMatch[1].includes('icon')) {
      images.push(imgMatch[1]);
    }
  }
  
  return { title, content, images };
}

/**
 * Clean content by removing 아우라 references
 */
function cleanContent(text: string): string {
  let cleaned = text;
  
  // Remove entire sections (contact info, etc.)
  for (const pattern of REMOVE_SECTIONS) {
    cleaned = cleaned.replace(pattern, '');
  }
  
  // Remove specific terms
  for (const pattern of REMOVE_PATTERNS) {
    cleaned = cleaned.replace(pattern, '');
  }
  
  // Clean up extra whitespace
  cleaned = cleaned
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
  
  return cleaned;
}

/**
 * Generate slug from title
 */
function generateSlug(title: string): string {
  const timestamp = Date.now().toString(36);
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  return `${slug}-${timestamp}`;
}

/**
 * Determine region from content
 */
function detectRegion(title: string, content: string): string {
  const text = (title + ' ' + content).toLowerCase();
  
  if (text.includes('동탄')) return 'dongtan';
  if (text.includes('분당') || text.includes('판교') || text.includes('정자')) return 'bundang';
  if (text.includes('용인')) return 'suwon'; // 용인은 수원 근처
  if (text.includes('인계동')) return 'ingedong';
  
  return 'suwon'; // Default
}

/**
 * Save article to database
 */
async function saveArticle(article: Article, region: string): Promise<string | null> {
  const cleanedTitle = cleanContent(article.title);
  const cleanedContent = cleanContent(article.content);
  
  // Skip if content is too short after cleaning
  if (cleanedContent.length < 200) {
    console.log(`  ⚠️ Skipping (too short after cleaning): ${cleanedTitle.substring(0, 50)}...`);
    return null;
  }
  
  const slug = generateSlug(cleanedTitle);
  const excerpt = cleanedContent.substring(0, 150) + '...';
  
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      regions: [region],
      title: cleanedTitle,
      slug,
      content: cleanedContent,
      excerpt,
      meta_title: cleanedTitle.substring(0, 60),
      meta_description: excerpt.substring(0, 155),
      author: '관리자',
      status: 'published',
      published_at: new Date().toISOString(),
    })
    .select('id')
    .single();
  
  if (error) {
    console.error(`  ❌ Failed to save: ${error.message}`);
    return null;
  }
  
  return data.id;
}

/**
 * Main crawl function
 */
async function crawl() {
  console.log('🕷️ Starting crawl of karaokesuwon.com/column\n');
  
  const allArticleUrls: string[] = [];
  
  // Crawl listing pages (1-15 to be safe)
  console.log('📋 Collecting article URLs...');
  for (let page = 1; page <= 15; page++) {
    const listUrl = `https://karaokesuwon.com/column/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&page=${page}`;
    
    try {
      const html = await fetchPage(listUrl);
      const urls = extractArticleUrls(html);
      
      if (urls.length === 0) {
        console.log(`  Page ${page}: No more articles found`);
        break;
      }
      
      allArticleUrls.push(...urls);
      console.log(`  Page ${page}: Found ${urls.length} articles`);
      
      // Small delay to be polite
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.log(`  Page ${page}: Error - ${e}`);
      break;
    }
  }
  
  // Remove duplicates
  const uniqueUrls = [...new Set(allArticleUrls)];
  console.log(`\n📊 Total unique articles: ${uniqueUrls.length}\n`);
  
  // Crawl each article
  let successCount = 0;
  let skipCount = 0;
  
  for (let i = 0; i < uniqueUrls.length; i++) {
    const url = uniqueUrls[i];
    console.log(`[${i + 1}/${uniqueUrls.length}] Crawling: ${url.substring(0, 80)}...`);
    
    try {
      const html = await fetchPage(url);
      const { title, content, images } = extractArticleContent(html);
      
      if (!title || !content) {
        console.log('  ⚠️ Skipping (no content)');
        skipCount++;
        continue;
      }
      
      const region = detectRegion(title, content);
      const postId = await saveArticle({ url, title, content, images }, region);
      
      if (postId) {
        console.log(`  ✅ Saved: ${title.substring(0, 50)}... (${region})`);
        successCount++;
      } else {
        skipCount++;
      }
      
      // Delay between requests
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (e) {
      console.log(`  ❌ Error: ${e}`);
      skipCount++;
    }
  }
  
  console.log(`\n✅ Crawl complete!`);
  console.log(`   Saved: ${successCount}`);
  console.log(`   Skipped: ${skipCount}`);
}

// Run
crawl().catch(console.error);
