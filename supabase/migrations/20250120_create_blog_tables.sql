-- Blog Posts Table
-- Stores all blog content with multi-region support
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  regions TEXT[] NOT NULL,  -- ['bundang', 'suwon', 'dongtan', 'jengja', 'ingedong']
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  category VARCHAR(50),
  tags TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author VARCHAR(100) DEFAULT 'Admin',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Images Table
-- Stores region-specific images for each post
CREATE TABLE IF NOT EXISTS blog_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  region VARCHAR(20) NOT NULL CHECK (region IN ('bundang', 'suwon', 'dongtan', 'jengja', 'ingedong', 'shared')),
  storage_path VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  image_type VARCHAR(20) DEFAULT 'featured' CHECK (image_type IN ('featured', 'content', 'thumbnail')),
  display_order INTEGER DEFAULT 0,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_regions ON blog_posts USING GIN (regions);
CREATE INDEX IF NOT EXISTS idx_posts_status ON blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON blog_posts (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_images_post_id ON blog_images (post_id);
CREATE INDEX IF NOT EXISTS idx_images_post_region ON blog_images (post_id, region);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_images ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT
  USING (status = 'published');

-- Public read access for images of published posts
CREATE POLICY "Public can read images of published posts" ON blog_images
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_images.post_id
      AND blog_posts.status = 'published'
    )
  );

-- Authenticated users can manage posts (for admin)
CREATE POLICY "Authenticated users can manage posts" ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage images" ON blog_images
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Comments for documentation
COMMENT ON TABLE blog_posts IS 'Blog posts with multi-region support for 5 promotional sites';
COMMENT ON TABLE blog_images IS 'Region-specific images for blog posts';
COMMENT ON COLUMN blog_posts.regions IS 'Array of regions this post appears in: bundang, suwon, dongtan, jengja, ingedong';
COMMENT ON COLUMN blog_images.region IS 'Region this image is for, or shared for common images';
