import { supabase, getStorageUrl } from './supabase';
import type { BlogPost, BlogImage } from './database.types';
import type { RegionId } from './regions';

export interface PostListItem {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  tags: string[];
  published_at: string | null;
  featuredImage: {
    url: string;
    alt: string;
  } | null;
}

export interface PostDetail extends BlogPost {
  featuredImage: {
    url: string;
    alt: string;
    width: number | null;
    height: number | null;
  } | null;
  contentImages: Array<{
    url: string;
    alt: string;
    width: number | null;
    height: number | null;
  }>;
}

type PostListQueryResult = {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  tags: string[];
  published_at: string | null;
};

type ImageQueryResult = {
  storage_path: string;
  alt_text: string | null;
};

/**
 * Get all published posts for a specific region
 * Optimized: Single query with ID, then batch image fetch
 */
export async function getPostsForRegion(region: RegionId): Promise<PostListItem[]> {
  const now = new Date().toISOString();

  // Get posts with ID in single query
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, category, tags, published_at')
    .contains('regions', [region])
    .eq('status', 'published')
    .lte('published_at', now)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  const typedPosts = (posts || []) as (PostListQueryResult & { id: string })[];

  if (typedPosts.length === 0) {
    return [];
  }

  // Batch fetch all featured images in ONE query
  const postIds = typedPosts.map(p => p.id);
  const { data: allImages } = await supabase
    .from('blog_images')
    .select('post_id, storage_path, alt_text, region')
    .in('post_id', postIds)
    .eq('image_type', 'featured')
    .in('region', [region, 'shared']);

  // Create image lookup map (prefer region-specific over shared)
  const imageMap = new Map<string, ImageQueryResult>();
  for (const img of (allImages || []) as (ImageQueryResult & { post_id: string; region: string })[]) {
    const existing = imageMap.get(img.post_id);
    // Prefer region-specific image over shared
    if (!existing || img.region === region) {
      imageMap.set(img.post_id, img);
    }
  }

  // Map posts with images from memory (no additional queries)
  return typedPosts.map((post) => {
    const image = imageMap.get(post.id);
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags,
      published_at: post.published_at,
      featuredImage: image
        ? {
            url: getStorageUrl(image.storage_path),
            alt: image.alt_text || post.title,
          }
        : null,
    };
  });
}

/**
 * Get a single post by slug for a specific region
 * Optimized: Fetch images in single query with both region and shared
 */
export async function getPostBySlug(region: RegionId, slug: string): Promise<PostDetail | null> {
  const now = new Date().toISOString();
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .contains('regions', [region])
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', now)
    .single();

  if (error || !post) {
    console.error('Error fetching post:', error);
    return null;
  }

  const typedPost = post as BlogPost;

  // Fetch both region-specific and shared images in ONE query
  const { data: allImages } = await supabase
    .from('blog_images')
    .select('*')
    .eq('post_id', typedPost.id)
    .in('region', [region, 'shared'])
    .order('display_order', { ascending: true });

  const typedImages = (allImages || []) as BlogImage[];

  // Prefer region-specific images, fallback to shared
  const regionImages = typedImages.filter(img => img.region === region);
  const sharedImages = typedImages.filter(img => img.region === 'shared');
  const imagesToUse = regionImages.length > 0 ? regionImages : sharedImages;

  const featuredImage = imagesToUse.find((img) => img.image_type === 'featured');
  const contentImages = imagesToUse.filter((img) => img.image_type === 'content');

  return {
    ...typedPost,
    featuredImage: featuredImage
      ? {
          url: getStorageUrl(featuredImage.storage_path),
          alt: featuredImage.alt_text || typedPost.title,
          width: featuredImage.width,
          height: featuredImage.height,
        }
      : null,
    contentImages: contentImages.map((img) => ({
      url: getStorageUrl(img.storage_path),
      alt: img.alt_text || '',
      width: img.width,
      height: img.height,
    })),
  };
}

/**
 * Get all slugs for a region (for static path generation)
 */
export async function getAllSlugsForRegion(region: RegionId): Promise<string[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .contains('regions', [region])
    .eq('status', 'published')
    .lte('published_at', now);

  if (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }

  const typedData = (data || []) as Array<{ slug: string }>;
  return typedData.map((post) => post.slug);
}

/**
 * Get all posts with images for sitemap (for Google Image indexing)
 */
export interface SitemapPost {
  slug: string;
  title: string;
  published_at: string | null;
  featuredImage: {
    url: string;
    alt: string;
  } | null;
}

export async function getPostsWithImagesForSitemap(region: RegionId): Promise<SitemapPost[]> {
  const now = new Date().toISOString();

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, published_at')
    .contains('regions', [region])
    .eq('status', 'published')
    .lte('published_at', now)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts for sitemap:', error);
    return [];
  }

  const typedPosts = (posts || []) as Array<{ id: string; slug: string; title: string; published_at: string | null }>;

  if (typedPosts.length === 0) {
    return [];
  }

  // Batch fetch all featured images
  const postIds = typedPosts.map(p => p.id);
  const { data: allImages } = await supabase
    .from('blog_images')
    .select('post_id, storage_path, alt_text, region')
    .in('post_id', postIds)
    .eq('image_type', 'featured')
    .in('region', [region, 'shared']);

  // Create image lookup map
  const imageMap = new Map<string, { storage_path: string; alt_text: string | null }>();
  for (const img of (allImages || []) as Array<{ post_id: string; storage_path: string; alt_text: string | null; region: string }>) {
    const existing = imageMap.get(img.post_id);
    if (!existing || img.region === region) {
      imageMap.set(img.post_id, img);
    }
  }

  return typedPosts.map((post) => {
    const image = imageMap.get(post.id);
    return {
      slug: post.slug,
      title: post.title,
      published_at: post.published_at,
      featuredImage: image
        ? {
            url: getStorageUrl(image.storage_path),
            alt: image.alt_text || post.title,
          }
        : null,
    };
  });
}

/**
 * Get all published posts with their regions (for sitemap generation)
 */
export async function getAllPublishedPosts(): Promise<Array<{ slug: string; regions: string[]; published_at: string | null }>> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, regions, published_at')
    .eq('status', 'published')
    .lte('published_at', now)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }

  return (data || []) as Array<{ slug: string; regions: string[]; published_at: string | null }>;
}

/**
 * Get posts by category for a region
 */
export async function getPostsByCategory(region: RegionId, category: string): Promise<PostListItem[]> {
  const now = new Date().toISOString();
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, category, tags, published_at')
    .contains('regions', [region])
    .eq('status', 'published')
    .eq('category', category)
    .lte('published_at', now)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }

  const typedPosts = (posts || []) as PostListQueryResult[];

  return typedPosts.map((post) => ({
    ...post,
    featuredImage: null, // Simplified for category listing
  }));
}

/**
 * Get related posts for a post
 */
export async function getRelatedPosts(
  region: RegionId,
  currentSlug: string,
  category: string | null,
  limit: number = 3
): Promise<PostListItem[]> {
  const now = new Date().toISOString();
  let query = supabase
    .from('blog_posts')
    .select('slug, title, excerpt, category, tags, published_at')
    .contains('regions', [region])
    .eq('status', 'published')
    .lte('published_at', now)
    .neq('slug', currentSlug)
    .limit(limit);

  if (category) {
    query = query.eq('category', category);
  }

  const { data: posts, error } = await query.order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  const typedPosts = (posts || []) as PostListQueryResult[];

  return typedPosts.map((post) => ({
    ...post,
    featuredImage: null,
  }));
}
