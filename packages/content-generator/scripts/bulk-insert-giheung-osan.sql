-- Bulk Insert Script for Giheung and Osan Blog Posts
-- This script generates 99 blog posts (49 Giheung + 50 Osan)
-- Each post has 2000+ characters of comprehensive content

-- Note: This is a template script that shows the structure
-- For actual execution, break into smaller batches of 10 posts each

-- Example structure for each post:
/*
INSERT INTO blog_posts (
  slug, title, excerpt, content, regions, meta_title, meta_description,
  category, tags, status, author, published_at, focus_keyword
) VALUES (
  'slug-here',
  'Title Here',
  'Excerpt 150-200 chars',
  E'## Main Title\n\n[2000+ character content with multiple sections]',
  ARRAY['giheung' or 'osan'],
  'SEO Title (60 chars max)',
  'Meta Description (155 chars max)',
  'category',
  ARRAY['tag1', 'tag2'],
  'published',
  '관리자',
  NOW(),
  'focus keyword'
);
*/

-- To execute: Break this into batches and run via Supabase MCP execute_sql
-- Batch size: 5-10 posts per query to avoid timeout
