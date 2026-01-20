import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { BlogPost, GeneratorRun } from '../types.js';

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
 * Publish a blog post to the database
 */
export async function publishPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  const client = getClient();

  // Insert blog post (regions is array, no featured_image column)
  const { data, error } = await client
    .from('blog_posts')
    .insert({
      regions: [post.region],  // Convert single region to array
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      author: post.author,
      status: post.status,
      published_at: post.published_at,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(`Failed to publish post: ${error.message}`);
  }

  // Insert featured image to blog_images table
  if (post.featured_image) {
    const { error: imgError } = await client
      .from('blog_images')
      .insert({
        post_id: data.id,
        region: post.region,
        storage_path: post.featured_image,
        alt_text: post.title,
        image_type: 'featured',
        display_order: 0,
      });

    if (imgError) {
      console.warn(`Failed to add featured image: ${imgError.message}`);
    }
  }

  return data.id;
}

/**
 * Start a generation run
 */
export async function startRun(region: string): Promise<string> {
  const client = getClient();
  
  const { data, error } = await client
    .from('generator_runs')
    .insert({
      run_date: new Date().toISOString().split('T')[0],
      region,
      total_generated: 0,
      total_failed: 0,
      error_messages: [],
      started_at: new Date().toISOString(),
      status: 'running',
    })
    .select('id')
    .single();
  
  if (error) {
    throw new Error(`Failed to start run: ${error.message}`);
  }
  
  return data.id;
}

/**
 * Update a generation run
 */
export async function updateRun(
  runId: string,
  update: Partial<Pick<GeneratorRun, 'total_generated' | 'total_failed' | 'error_messages' | 'status' | 'completed_at'>>
): Promise<void> {
  const client = getClient();
  
  const { error } = await client
    .from('generator_runs')
    .update(update)
    .eq('id', runId);
  
  if (error) {
    throw new Error(`Failed to update run: ${error.message}`);
  }
}

/**
 * Complete a generation run
 */
export async function completeRun(
  runId: string,
  totalGenerated: number,
  totalFailed: number,
  errors: string[]
): Promise<void> {
  await updateRun(runId, {
    total_generated: totalGenerated,
    total_failed: totalFailed,
    error_messages: errors,
    status: totalFailed > totalGenerated ? 'failed' : 'completed',
    completed_at: new Date().toISOString(),
  });
}

/**
 * Trigger Vercel deploy hook to rebuild the blog
 */
export async function triggerDeploy(): Promise<boolean> {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  
  if (!hookUrl) {
    console.warn('VERCEL_DEPLOY_HOOK_URL not set, skipping deploy trigger');
    return false;
  }
  
  try {
    const response = await fetch(hookUrl, { method: 'POST' });
    
    if (!response.ok) {
      console.error(`Deploy hook failed: ${response.status} ${response.statusText}`);
      return false;
    }
    
    console.log('Deploy hook triggered successfully');
    return true;
  } catch (e) {
    console.error('Failed to trigger deploy hook:', e);
    return false;
  }
}

/**
 * Get recent runs
 */
export async function getRecentRuns(limit = 10): Promise<GeneratorRun[]> {
  const client = getClient();
  
  const { data, error } = await client
    .from('generator_runs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    throw new Error(`Failed to get recent runs: ${error.message}`);
  }
  
  return data as GeneratorRun[];
}
