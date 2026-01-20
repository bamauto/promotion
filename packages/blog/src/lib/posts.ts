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
 */
export async function getPostsForRegion(region: RegionId): Promise<PostListItem[]> {
  const now = new Date().toISOString();
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, category, tags, published_at')
    .contains('regions', [region])
    .eq('status', 'published')
    .lte('published_at', now)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  const typedPosts = (posts || []) as PostListQueryResult[];

  // Fetch featured images for each post
  const postsWithImages: PostListItem[] = await Promise.all(
    typedPosts.map(async (post) => {
      // First get the post ID
      const { data: postData } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', post.slug)
        .single();

      if (!postData) {
        return {
          ...post,
          featuredImage: null,
        };
      }

      const { data: images } = await supabase
        .from('blog_images')
        .select('storage_path, alt_text')
        .eq('region', region)
        .eq('image_type', 'featured')
        .eq('post_id', (postData as { id: string }).id)
        .limit(1);

      const typedImages = (images || []) as ImageQueryResult[];

      const featuredImage = typedImages[0]
        ? {
            url: getStorageUrl(typedImages[0].storage_path),
            alt: typedImages[0].alt_text || post.title,
          }
        : null;

      return {
        ...post,
        featuredImage,
      };
    })
  );

  return postsWithImages;
}

/**
 * Get a single post by slug for a specific region
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

  // Fetch images for this post and region
  const { data: images } = await supabase
    .from('blog_images')
    .select('*')
    .eq('post_id', typedPost.id)
    .eq('region', region)
    .order('display_order', { ascending: true });

  let regionImages = (images || []) as BlogImage[];

  // If no region-specific images, try shared images
  if (regionImages.length === 0) {
    const { data: sharedImages } = await supabase
      .from('blog_images')
      .select('*')
      .eq('post_id', typedPost.id)
      .eq('region', 'shared')
      .order('display_order', { ascending: true });

    regionImages = (sharedImages || []) as BlogImage[];
  }

  const featuredImage = regionImages.find((img) => img.image_type === 'featured');
  const contentImages = regionImages.filter((img) => img.image_type === 'content');

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
