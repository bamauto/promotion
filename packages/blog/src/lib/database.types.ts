export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          regions: string[];
          meta_title: string | null;
          meta_description: string | null;
          category: string | null;
          tags: string[];
          status: 'draft' | 'published' | 'archived';
          author: string;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          regions: string[];
          meta_title?: string | null;
          meta_description?: string | null;
          category?: string | null;
          tags?: string[];
          status?: 'draft' | 'published' | 'archived';
          author?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          regions?: string[];
          meta_title?: string | null;
          meta_description?: string | null;
          category?: string | null;
          tags?: string[];
          status?: 'draft' | 'published' | 'archived';
          author?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_images: {
        Row: {
          id: string;
          post_id: string;
          region: string;
          storage_path: string;
          alt_text: string | null;
          image_type: 'featured' | 'content' | 'thumbnail';
          display_order: number;
          width: number | null;
          height: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          region: string;
          storage_path: string;
          alt_text?: string | null;
          image_type?: 'featured' | 'content' | 'thumbnail';
          display_order?: number;
          width?: number | null;
          height?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          region?: string;
          storage_path?: string;
          alt_text?: string | null;
          image_type?: 'featured' | 'content' | 'thumbnail';
          display_order?: number;
          width?: number | null;
          height?: number | null;
          created_at?: string;
        };
      };
    };
  };
}

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type BlogImage = Database['public']['Tables']['blog_images']['Row'];

export interface BlogPostWithImages extends BlogPost {
  images: BlogImage[];
}
