-- Migration: Redistribute published_at dates for SEO optimization
-- Purpose: Spread 179 posts over 90 days to avoid Google spam detection
-- Result: Posts appear at 12-hour intervals, oldest first

-- Update all published posts with distributed dates
-- Posts are numbered by created_at order and spaced 12 hours apart
WITH numbered AS (
  SELECT
    id,
    ROW_NUMBER() OVER (ORDER BY created_at ASC) as rn
  FROM blog_posts
  WHERE status = 'published'
)
UPDATE blog_posts p
SET published_at = NOW() - (INTERVAL '12 hours' * n.rn)
FROM numbered n
WHERE p.id = n.id;

-- Verify the distribution
-- SELECT
--   MIN(published_at) as oldest,
--   MAX(published_at) as newest,
--   COUNT(*) as total,
--   (MAX(published_at) - MIN(published_at)) as date_range
-- FROM blog_posts
-- WHERE status = 'published';
