import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CONTENT_CONFIG } from '../config.js';
import type { Keyword } from '../types.js';

let supabase: SupabaseClient | null = null;

/**
 * Get or create Supabase client
 */
function getClient(): SupabaseClient {
  if (!supabase) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!url || !key) {
      throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
    }
    
    supabase = createClient(url, key);
  }
  
  return supabase;
}

/**
 * Get available keywords for a region (not used in last 30 days)
 */
export async function getAvailableKeywords(
  region: string,
  limit: number = CONTENT_CONFIG.defaultPostsPerRegion
): Promise<Keyword[]> {
  const client = getClient();
  
  // Use the RPC function we created in the migration
  const { data, error } = await client.rpc('get_available_keywords', {
    p_region: region,
    p_limit: limit,
  });
  
  if (error) {
    throw new Error(`Failed to get available keywords: ${error.message}`);
  }
  
  return data as Keyword[];
}

/**
 * Mark keyword as used (record in history)
 */
export async function markKeywordUsed(
  keywordId: string,
  region: string,
  keyword: string,
  blogPostId: string | null,
  contentHash: string
): Promise<void> {
  const client = getClient();
  
  const { error } = await client
    .from('generator_history')
    .insert({
      keyword_id: keywordId,
      region,
      keyword,
      blog_post_id: blogPostId,
      content_hash: contentHash,
      generation_date: new Date().toISOString().split('T')[0],
    });
  
  if (error) {
    throw new Error(`Failed to mark keyword as used: ${error.message}`);
  }
}

/**
 * Check if content hash already exists (duplicate prevention)
 */
export async function isContentDuplicate(contentHash: string): Promise<boolean> {
  const client = getClient();
  
  const { data, error } = await client
    .from('generator_history')
    .select('id')
    .eq('content_hash', contentHash)
    .limit(1);
  
  if (error) {
    console.warn('Failed to check content duplicate:', error.message);
    return false;
  }
  
  return data.length > 0;
}

/**
 * Get keyword count for a region
 */
export async function getKeywordCount(region: string): Promise<number> {
  const client = getClient();
  
  const { count, error } = await client
    .from('generator_keywords')
    .select('*', { count: 'exact', head: true })
    .eq('region', region)
    .eq('is_active', true);
  
  if (error) {
    throw new Error(`Failed to get keyword count: ${error.message}`);
  }
  
  return count || 0;
}

/**
 * Add new keywords to the database
 */
export async function addKeywords(
  keywords: Array<{
    region: string;
    keyword: string;
    category?: string;
    priority?: number;
  }>
): Promise<number> {
  const client = getClient();
  
  const { data, error } = await client
    .from('generator_keywords')
    .upsert(
      keywords.map((k) => ({
        region: k.region,
        keyword: k.keyword,
        category: k.category || null,
        priority: k.priority || 0,
        is_active: true,
      })),
      { onConflict: 'region,keyword' }
    )
    .select();
  
  if (error) {
    throw new Error(`Failed to add keywords: ${error.message}`);
  }
  
  return data?.length || 0;
}
