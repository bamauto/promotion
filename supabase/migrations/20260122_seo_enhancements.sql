-- SEO 강화를 위한 스키마 업데이트
-- 날짜: 2026-01-22

-- 1. SEO 전용 description 필드 추가 (meta_description과 별개로 관리)
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS seo_description VARCHAR(160);

-- 2. 포커스 키워드 필드 추가
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS focus_keyword VARCHAR(50);

-- 3. 기존 카테고리 일괄 업데이트 (NULL인 경우만)
-- 하이퍼블릭 관련
UPDATE blog_posts SET category = 'hyperpublic'
WHERE (title ILIKE '%하이퍼블릭%' OR content ILIKE '%하이퍼블릭%')
AND category IS NULL;

-- 가라오케/노래방 관련
UPDATE blog_posts SET category = 'karaoke'
WHERE (title ILIKE '%가라오케%' OR title ILIKE '%노래방%')
AND category IS NULL
AND category != 'hyperpublic';

-- 룸살롱 관련
UPDATE blog_posts SET category = 'roomsalon'
WHERE (title ILIKE '%룸살롱%' OR title ILIKE '%룸 술집%')
AND category IS NULL;

-- 셔츠룸 관련
UPDATE blog_posts SET category = 'shirtsroom'
WHERE (title ILIKE '%셔츠룸%')
AND category IS NULL;

-- 기모노룸 관련
UPDATE blog_posts SET category = 'kimonoroom'
WHERE (title ILIKE '%기모노룸%' OR title ILIKE '%기모노%')
AND category IS NULL;

-- 가격/요금 관련
UPDATE blog_posts SET category = 'price'
WHERE (title ILIKE '%가격%' OR title ILIKE '%요금%' OR title ILIKE '%비용%')
AND category IS NULL;

-- 기타 (분류 안 된 것)
UPDATE blog_posts SET category = 'general'
WHERE category IS NULL;

-- 4. 태그 자동 생성 (빈 배열인 경우)
-- VIP 태그
UPDATE blog_posts
SET tags = array_append(COALESCE(tags, '{}'), 'VIP룸')
WHERE title ILIKE '%VIP%'
AND (tags IS NULL OR NOT 'VIP룸' = ANY(tags));

-- 24시간 태그
UPDATE blog_posts
SET tags = array_append(COALESCE(tags, '{}'), '24시간')
WHERE title ILIKE '%24시%'
AND (tags IS NULL OR NOT '24시간' = ANY(tags));

-- 프라이빗 태그
UPDATE blog_posts
SET tags = array_append(COALESCE(tags, '{}'), '프라이빗')
WHERE title ILIKE '%프라이빗%'
AND (tags IS NULL OR NOT '프라이빗' = ANY(tags));

-- 초보자 태그
UPDATE blog_posts
SET tags = array_append(COALESCE(tags, '{}'), '초보자가이드')
WHERE (title ILIKE '%초보%' OR title ILIKE '%처음%' OR title ILIKE '%입문%')
AND (tags IS NULL OR NOT '초보자가이드' = ANY(tags));

-- 예약 태그
UPDATE blog_posts
SET tags = array_append(COALESCE(tags, '{}'), '예약')
WHERE title ILIKE '%예약%'
AND (tags IS NULL OR NOT '예약' = ANY(tags));

-- 5. 이미지 alt 텍스트 최적화
UPDATE blog_images bi
SET alt_text = bp.title || ' - 이미지'
FROM blog_posts bp
WHERE bi.post_id = bp.id
AND (bi.alt_text IS NULL OR bi.alt_text = '');

-- 6. 인덱스 생성 (카테고리 조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_focus_keyword ON blog_posts(focus_keyword);

-- 완료 메시지
DO $$
DECLARE
  cat_count INTEGER;
  tag_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO cat_count FROM blog_posts WHERE category IS NOT NULL;
  SELECT COUNT(*) INTO tag_count FROM blog_posts WHERE array_length(tags, 1) > 0;
  RAISE NOTICE 'SEO Enhancement Migration Complete:';
  RAISE NOTICE '- Posts with category: %', cat_count;
  RAISE NOTICE '- Posts with tags: %', tag_count;
END $$;
