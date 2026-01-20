-- Content Generator Tables Migration
-- Creates tables for automated blog content generation

-- ========================================
-- 1. generator_keywords: 지역별 키워드 풀
-- ========================================
CREATE TABLE IF NOT EXISTS generator_keywords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region TEXT NOT NULL,  -- bundang, dongtan, ingedong, jengja, suwon
    keyword TEXT NOT NULL,
    category TEXT,  -- 카테고리 (선택사항)
    priority INTEGER DEFAULT 0,  -- 높을수록 우선 선택
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(region, keyword)
);

-- 인덱스
CREATE INDEX idx_generator_keywords_region ON generator_keywords(region);
CREATE INDEX idx_generator_keywords_active ON generator_keywords(is_active) WHERE is_active = true;
CREATE INDEX idx_generator_keywords_priority ON generator_keywords(priority DESC);

-- ========================================
-- 2. generator_images: 이미지 저장소
-- ========================================
CREATE TABLE IF NOT EXISTS generator_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL,  -- 이미지 URL (Storage 또는 외부)
    alt_text TEXT,  -- 대체 텍스트
    category TEXT,  -- 이미지 카테고리
    usage_count INTEGER DEFAULT 0,  -- 사용 횟수 (적은 것 우선)
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_generator_images_active ON generator_images(is_active) WHERE is_active = true;
CREATE INDEX idx_generator_images_usage ON generator_images(usage_count ASC);

-- ========================================
-- 3. generator_history: 생성 이력 (중복 방지)
-- ========================================
CREATE TABLE IF NOT EXISTS generator_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword_id UUID NOT NULL REFERENCES generator_keywords(id) ON DELETE CASCADE,
    region TEXT NOT NULL,
    keyword TEXT NOT NULL,  -- 조회 편의를 위해 중복 저장
    blog_post_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,
    content_hash TEXT,  -- 콘텐츠 해시 (완전 중복 방지)
    generation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- 같은 키워드는 30일 내 재사용 방지
    UNIQUE(keyword_id, generation_date)
);

-- 인덱스
CREATE INDEX idx_generator_history_keyword ON generator_history(keyword_id);
CREATE INDEX idx_generator_history_region ON generator_history(region);
CREATE INDEX idx_generator_history_date ON generator_history(generation_date DESC);
CREATE INDEX idx_generator_history_hash ON generator_history(content_hash);

-- ========================================
-- 4. generator_runs: 일별 실행 로그
-- ========================================
CREATE TABLE IF NOT EXISTS generator_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_date DATE NOT NULL DEFAULT CURRENT_DATE,
    region TEXT NOT NULL,
    total_generated INTEGER DEFAULT 0,
    total_failed INTEGER DEFAULT 0,
    error_messages JSONB DEFAULT '[]'::jsonb,
    started_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    status TEXT DEFAULT 'running',  -- running, completed, failed
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_generator_runs_date ON generator_runs(run_date DESC);
CREATE INDEX idx_generator_runs_region ON generator_runs(region);
CREATE INDEX idx_generator_runs_status ON generator_runs(status);

-- ========================================
-- 유틸리티 함수
-- ========================================

-- 사용 가능한 키워드 조회 (30일 내 미사용)
CREATE OR REPLACE FUNCTION get_available_keywords(
    p_region TEXT,
    p_limit INTEGER DEFAULT 25
)
RETURNS TABLE (
    id UUID,
    keyword TEXT,
    category TEXT,
    priority INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        k.id,
        k.keyword,
        k.category,
        k.priority
    FROM generator_keywords k
    WHERE k.region = p_region 
      AND k.is_active = true
      AND NOT EXISTS (
          SELECT 1 FROM generator_history h
          WHERE h.keyword_id = k.id
            AND h.generation_date > CURRENT_DATE - INTERVAL '30 days'
      )
    ORDER BY k.priority DESC, RANDOM()
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- 사용량이 적은 이미지 조회
CREATE OR REPLACE FUNCTION get_available_image()
RETURNS TABLE (
    id UUID,
    url TEXT,
    alt_text TEXT,
    category TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.id,
        i.url,
        i.alt_text,
        i.category
    FROM generator_images i
    WHERE i.is_active = true
    ORDER BY i.usage_count ASC, RANDOM()
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- 이미지 사용 횟수 증가
CREATE OR REPLACE FUNCTION increment_image_usage(p_image_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE generator_images
    SET usage_count = usage_count + 1,
        updated_at = NOW()
    WHERE id = p_image_id;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- RLS 정책
-- ========================================

-- generator_keywords
ALTER TABLE generator_keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for generator_keywords"
    ON generator_keywords FOR SELECT
    USING (true);

CREATE POLICY "Service role full access for generator_keywords"
    ON generator_keywords FOR ALL
    USING (auth.role() = 'service_role');

-- generator_images
ALTER TABLE generator_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for generator_images"
    ON generator_images FOR SELECT
    USING (true);

CREATE POLICY "Service role full access for generator_images"
    ON generator_images FOR ALL
    USING (auth.role() = 'service_role');

-- generator_history
ALTER TABLE generator_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for generator_history"
    ON generator_history FOR SELECT
    USING (true);

CREATE POLICY "Service role full access for generator_history"
    ON generator_history FOR ALL
    USING (auth.role() = 'service_role');

-- generator_runs
ALTER TABLE generator_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for generator_runs"
    ON generator_runs FOR SELECT
    USING (true);

CREATE POLICY "Service role full access for generator_runs"
    ON generator_runs FOR ALL
    USING (auth.role() = 'service_role');

-- ========================================
-- 트리거: updated_at 자동 업데이트
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_generator_keywords_updated_at
    BEFORE UPDATE ON generator_keywords
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generator_images_updated_at
    BEFORE UPDATE ON generator_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
