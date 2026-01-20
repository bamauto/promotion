import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { GeneratorImage } from '../types.js';

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
 * Get a random image with lowest usage count
 */
export async function getRandomImage(): Promise<GeneratorImage | null> {
  const client = getClient();
  
  // Use the RPC function we created in the migration
  const { data, error } = await client.rpc('get_available_image');
  
  if (error) {
    console.warn('Failed to get available image:', error.message);
    return null;
  }
  
  if (!data || data.length === 0) {
    return null;
  }
  
  return data[0] as GeneratorImage;
}

/**
 * Increment image usage count
 */
export async function incrementImageUsage(imageId: string): Promise<void> {
  const client = getClient();
  
  const { error } = await client.rpc('increment_image_usage', {
    p_image_id: imageId,
  });
  
  if (error) {
    console.warn('Failed to increment image usage:', error.message);
  }
}

/**
 * Get image count
 */
export async function getImageCount(): Promise<number> {
  const client = getClient();
  
  const { count, error } = await client
    .from('generator_images')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
  
  if (error) {
    throw new Error(`Failed to get image count: ${error.message}`);
  }
  
  return count || 0;
}

/**
 * Add images to the database
 */
export async function addImages(
  images: Array<{
    url: string;
    alt_text?: string;
    category?: string;
  }>
): Promise<number> {
  const client = getClient();
  
  const { data, error } = await client
    .from('generator_images')
    .insert(
      images.map((img) => ({
        url: img.url,
        alt_text: img.alt_text || null,
        category: img.category || null,
        usage_count: 0,
        is_active: true,
      }))
    )
    .select();
  
  if (error) {
    throw new Error(`Failed to add images: ${error.message}`);
  }
  
  return data?.length || 0;
}

/**
 * Get default placeholder image URL
 */
export function getDefaultImage(): string {
  // Return a placeholder image URL
  return 'https://placehold.co/800x450/333/white?text=Karaoke';
}
