-- Add yeongtong region to blog_images constraint
-- This migration adds 'yeongtong' as a valid region option

-- Drop existing constraint
ALTER TABLE blog_images
DROP CONSTRAINT IF EXISTS blog_images_region_check;

-- Add updated constraint with yeongtong
ALTER TABLE blog_images
ADD CONSTRAINT blog_images_region_check
CHECK (region IN ('bundang', 'suwon', 'dongtan', 'jengja', 'ingedong', 'gwanggyo', 'yeongtong', 'shared'));
