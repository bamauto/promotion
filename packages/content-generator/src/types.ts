// Types for content generator

export interface Region {
  id: string;
  name: string;
  domain: string;
}

export interface Keyword {
  id: string;
  keyword: string;
  category: string | null;
  priority: number;
}

export interface GeneratorImage {
  id: string;
  url: string;
  alt_text: string | null;
  category: string | null;
}

export interface GeneratedContent {
  title: string;
  content: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
}

export interface BlogPost {
  id?: string;
  region: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
  author: string;
  status: 'draft' | 'published';
  published_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface GeneratorHistory {
  id?: string;
  keyword_id: string;
  region: string;
  keyword: string;
  blog_post_id: string | null;
  content_hash: string;
  generation_date: string;
}

export interface GeneratorRun {
  id?: string;
  run_date: string;
  region: string;
  total_generated: number;
  total_failed: number;
  error_messages: string[];
  started_at: string;
  completed_at: string | null;
  status: 'running' | 'completed' | 'failed';
}

export interface GenerateOptions {
  region: string;
  count: number;
  dryRun?: boolean;
}

export interface GenerateResult {
  success: boolean;
  region: string;
  keyword: string;
  postId?: string;
  error?: string;
}
