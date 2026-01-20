-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage policies for blog-images bucket
-- Public read access
CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'blog-images');

-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images'
    AND auth.role() = 'authenticated'
  );

-- Authenticated users can update their uploads
CREATE POLICY "Authenticated users can update blog images" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'blog-images'
    AND auth.role() = 'authenticated'
  );

-- Authenticated users can delete
CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'blog-images'
    AND auth.role() = 'authenticated'
  );

-- Note: Storage structure should follow:
-- blog-images/
-- ├── bundang/
-- ├── suwon/
-- ├── dongtan/
-- ├── jengja/
-- ├── ingedong/
-- └── shared/
