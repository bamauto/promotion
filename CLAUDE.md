# Promotion 프로젝트 정보

## Git Push 설정

**중요:** Git push 시 반드시 아래 토큰을 사용할 것

```bash
git push https://{GITHUB_TOKEN}@github.com/bamauto/promotion.git main
```

## Vercel API 토큰

```
SSxhOnGY9JbbPEEgkg85poIE
```

**사용 예시:**
```bash
# 프로젝트 설정 조회
curl -H "Authorization: Bearer SSxhOnGY9JbbPEEgkg85poIE" "https://api.vercel.com/v9/projects/{PROJECT_ID}?teamId=ymimis-projects"

# 배포 트리거
curl -X POST -H "Authorization: Bearer SSxhOnGY9JbbPEEgkg85poIE" -H "Content-Type: application/json" \
  -d '{"name":"{프로젝트명}","target":"production","gitSource":{"type":"github","org":"bamauto","repo":"promotion","ref":"main"}}' \
  "https://api.vercel.com/v13/deployments?teamId=ymimis-projects"
```

## 지역별 도메인

| 지역 | ID | 도메인 |
|------|-----|--------|
| 분당 | bundang | bundanghipublic.com |
| 동탄 | dongtan | dongtankaraoke.net |
| 인계동 | ingedong | ingedongkaraoke.com |
| 정자 | jengja | jengjakaraoke.com |
| 광교 | gwanggyo | gwanggyokaraoke.com |
| 영통 | yeongtong | yeongtongkaraoke.com |
| 수원 | suwon | suwon.vip |
| 안양 | anyang | anyangkaraoke.com |
| 수지 | suji | sujikaraoke.com |
| 평촌 | pyeongchon | pc-karaoke.com |
| 기흥 | giheung | giheungkaraoke.com |
| 오산 | osan | osankaraoke.com |

## 프로젝트 구조

```
promotion/
├── apps/
│   ├── bundang/     # 분당 사이트 (React/Vite)
│   ├── dongtan/     # 동탄 사이트
│   ├── gwanggyo/    # 광교 사이트
│   ├── ingedong/    # 인계동 사이트
│   ├── jengja/      # 정자 사이트
│   ├── yeongtong/   # 영통 사이트
│   ├── suwon/       # 수원 사이트
│   ├── suji/        # 수지 사이트
│   ├── anyang/      # 안양 사이트
│   ├── pyeongchon/  # 평촌 사이트
│   ├── giheung/     # 기흥 사이트
│   └── osan/        # 오산 사이트
├── packages/
│   └── blog/        # 공유 블로그 시스템 (Astro)
└── supabase/
    ├── migrations/  # DB 마이그레이션
    └── functions/   # Edge Functions
```

## 블로그 시스템

- **기술스택**: Astro + Supabase + Vercel
- **블로그 URL**: `{domain}/blog`, `{domain}/blog/{slug}`
- **사이트맵**: `{domain}/sitemap-blog.xml`

### Supabase 설정
- Project URL: https://rrzeapykmyrsiqmkwjcf.supabase.co
- Project ID: rrzeapykmyrsiqmkwjcf
- 테이블: blog_posts, blog_images
- Storage: blog-images 버킷
- MCP 설정: `.mcp.json` 파일에 Supabase MCP 서버 구성됨

### 블로그 포스팅 스케줄
블로그는 **하루 6개 카테고리**가 **2시간 간격**으로 자동 발행되도록 설정됨

| 시간 | 카테고리 |
|------|---------|
| 00:00 | 가라오케 |
| 02:00 | 하이퍼블릭 |
| 04:00 | 셔츠룸 |
| 06:00 | 룸살롱 |
| 08:00 | 호빠 |
| 10:00 | 기모노룸 |

### ⚠️ 블로그 포스트 status 규칙 (중요!)

| 조건 | status 값 |
|------|----------|
| `published_at <= NOW()` (과거/현재) | `published` |
| `published_at > NOW()` (미래) | `draft` |

**절대 미래 날짜 글에 status='published' 설정하지 말 것!**

블로그 쿼리는 `status = 'published' AND published_at <= NOW()` 조건으로 글을 가져옴.
- 미래 글은 반드시 `draft` 상태여야 함
- 과거 날짜로 글을 소급 발행하지 말 것 (오늘 날짜부터 미래로만 스케줄링)

**포스트 발행 설정 SQL:**
```sql
-- 새 지역 블로그 포스트 발행 시간 설정 (예: giheung)
-- 300개 포스트를 향후 50일에 걸쳐 하루 6개씩 발행
WITH category_schedule AS (
  SELECT '가라오케' as category, 0 as hour_offset UNION ALL
  SELECT '하이퍼블릭', 2 UNION ALL
  SELECT '셔츠룸', 4 UNION ALL
  SELECT '룸살롱', 6 UNION ALL
  SELECT '호빠', 8 UNION ALL
  SELECT '기모노룸', 10
),
ranked_posts AS (
  SELECT
    bp.id,
    bp.category,
    cs.hour_offset,
    ROW_NUMBER() OVER (PARTITION BY bp.category ORDER BY bp.created_at) - 1 as day_offset
  FROM blog_posts bp
  JOIN category_schedule cs ON bp.category = cs.category
  WHERE 'giheung' = ANY(bp.regions)
    AND bp.category IN ('가라오케', '하이퍼블릭', '셔츠룸', '룸살롱', '호빠', '기모노룸')
)
UPDATE blog_posts bp
SET published_at = (CURRENT_DATE + (rp.day_offset || ' days')::INTERVAL + (rp.hour_offset || ' hours')::INTERVAL)
FROM ranked_posts rp
WHERE bp.id = rp.id;
```

## 스크립트

```bash
# 개발
pnpm dev:blog      # 블로그 개발 서버
pnpm dev:bundang   # 분당 개발 서버

# 빌드
pnpm build:blog    # 블로그 빌드
pnpm build         # 전체 빌드
```

---

## 새 지역 사이트 추가 가이드

### 1단계: 앱 생성
```bash
# 기존 사이트 복사 (bundang 또는 jengja 추천)
cp -r apps/jengja apps/{새지역ID}
```

### 2단계: 기본 설정 수정
| 파일 | 수정 내용 |
|------|----------|
| `package.json` | name을 `@promotion/{새지역ID}`로 변경 |
| `index.html` | title, meta description, canonical URL, OG tags 수정 |
| `public/sitemap.xml` | 모든 URL을 새 도메인으로 변경 |
| `public/robots.txt` | sitemap URL을 새 도메인으로 변경 |
| `vercel.json` | 블로그 rewrite 경로를 새 지역으로 변경 |

### 3단계: 콘텐츠 수정
모든 페이지에서 지역명 변경:
- `src/pages/*.jsx` - 메타태그, 본문 내 지역명
- `src/components/SchemaJsonLd.jsx` - 스키마 데이터

### 4단계: Favicon 생성
```bash
cd apps/{새지역ID}

# 원본 이미지를 ICO로 변환 (멀티 해상도)
magick {원본이미지}.jpg -resize 256x256 -gravity center -background white -extent 256x256 /tmp/favicon_256.png
magick /tmp/favicon_256.png -define icon:auto-resize=256,192,128,96,64,48,32,16 public/favicon.ico

# 다양한 크기 PNG 생성
magick {원본이미지}.jpg -resize 180x180 -gravity center -background white -extent 180x180 public/apple-touch-icon.png
magick {원본이미지}.jpg -resize 192x192 -gravity center -background white -extent 192x192 public/favicon-192x192.png
magick {원본이미지}.jpg -resize 512x512 -gravity center -background white -extent 512x512 public/favicon-512x512.png
magick {원본이미지}.jpg -resize 32x32 -gravity center -background white -extent 32x32 public/favicon-32x32.png
magick {원본이미지}.jpg -resize 16x16 -gravity center -background white -extent 16x16 public/favicon-16x16.png
```

### 5단계: 블로그 지역 등록 (⚠️ 중요 - 모든 파일 수정 필수!)

**반드시 아래 3개 파일 모두 수정해야 함! 누락 시 Internal Server Error 발생**

#### 5-1. `packages/blog/src/lib/regions.ts`
```typescript
{새지역ID}: {
  id: '{새지역ID}',
  name: '{지역명}',
  nameEn: '{영문명}',
  domain: '{도메인}',
  keyword: '가라오케',
  description: '{지역명} 가라오케 하이퍼블릭 정보',
  urlPrefix: '{새지역ID}',
  hyperpubSlug: 'highpub',
  pricePrefix: 'entertainment-',
},
```

#### 5-2. `packages/blog/src/components/PostFooterCTA.astro`
```typescript
// PHONE_NUMBERS 객체에 추가
{새지역ID}: '010-5765-8553',

// KAKAO_IDS 객체에 추가
{새지역ID}: 'abcd1234',
```

#### 5-3. `packages/blog/src/components/LocalBusinessSchema.astro`
```typescript
// businessInfo 객체에 추가
{새지역ID}: {
  address: '경기도 {시} {구/동}',
  areaServed: '{지역명}, {인근지역}',
  geo: { lat: {위도}, lng: {경도} }
},
```

#### 체크리스트
- [ ] `regions.ts` - 기본 지역 정보
- [ ] `PostFooterCTA.astro` - PHONE_NUMBERS, KAKAO_IDS
- [ ] `LocalBusinessSchema.astro` - businessInfo

### 6단계: pnpm 설치 및 빌드
```bash
pnpm install                    # lockfile 업데이트 필수!
pnpm build:{새지역ID}           # 빌드 테스트
```

### 7단계: Git 커밋 & 푸시
```bash
git add apps/{새지역ID} packages/blog/src/lib/regions.ts pnpm-lock.yaml
git commit -m "feat({새지역ID}): Add new {지역명} site"
git push https://{GITHUB_TOKEN}@github.com/bamauto/promotion.git main
```

### 8단계: Vercel 초기 배포
```bash
cd apps/{새지역ID}
vercel --prod --yes
# 프롬프트가 나오면:
# - Set up and deploy? Y
# - Which scope? ymimis-projects
# - Link to existing project? N
# - Project name? {새지역ID}
# - In which directory is your code? ./
# - Want to modify settings? N
```

### 9단계: Vercel 프로젝트 설정 (중요!)
Git 연결 후 **반드시 API로 설정 수정** (대시보드에서 하면 공백 문제 발생):

```bash
# 1. 프로젝트 ID 확인
vercel project inspect {새지역ID}
# → ID: prj_xxxxxxxxxxxx 확인

# 2. 필수 설정 일괄 적용 (SSO해제 + npm사용 + Root Directory)
curl -X PATCH \
  -H "Authorization: Bearer {VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "ssoProtection": null,
    "installCommand": "npm install",
    "rootDirectory": "apps/{새지역ID}"
  }' \
  "https://api.vercel.com/v9/projects/{PROJECT_ID}?teamId=ymimis-projects"
```

### 9-1단계: Git 연결 (대시보드)
1. https://vercel.com/ymimis-projects/{새지역ID}/settings/git
2. Connected Git Repository → `bamauto/promotion` 연결
3. Production Branch: `main`

### 9-2단계: 재배포 트리거
```bash
# Git 연결 후 빈 커밋으로 재배포
git commit --allow-empty -m "chore({새지역ID}): trigger initial deploy"
git push https://{GITHUB_TOKEN}@github.com/bamauto/promotion.git main
```

### 10단계: 도메인 연결
```bash
vercel domains add {도메인}
vercel domains add www.{도메인}
```

DNS 설정 (도메인 제공업체에서):
| 타입 | 호스트 | 값 |
|------|--------|-----|
| A | @ | 76.76.21.21 |
| A | www | 76.76.21.21 |

### 11단계: Google Search Console 등록
1. https://search.google.com/search-console 접속
2. 속성 추가 → `{도메인}` 입력
3. DNS 인증 완료
4. Sitemaps 메뉴에서 등록:
   - `https://{도메인}/sitemap.xml`
   - `https://{도메인}/sitemap-blog.xml`

---

## API 토큰

| 서비스 | 토큰 |
|--------|------|
| Vercel | `SSxhOnGY9JbbPEEgkg85poIE` |
| GitHub | `hPt5LefjCd2YxlH5nOLOgTdR` |

> Vercel CLI 토큰 위치: `~/Library/Application Support/com.vercel.cli/auth.json`

## 주의사항
- sitemap.xml, robots.txt의 도메인 철자 정확히 확인
- pnpm-lock.yaml 반드시 커밋 (안 하면 Vercel 빌드 실패)
- 블로그 regions.ts 수정 후 블로그도 자동 재배포됨
- 새 지역 추가 시 `packages/blog/src/components/LocalBusinessSchema.astro`에도 지역 정보 추가 필수

---

## Vercel 배포 트러블슈팅

### 문제 1: pnpm ERR_INVALID_THIS 에러

**증상:**
```
ERR_PNPM_META_FETCH_FAIL GET https://registry.npmjs.org/turbo: Value of "this" must be of type URLSearchParams
WARN GET https://registry.npmjs.org/react error (ERR_INVALID_THIS)
Error: Command "pnpm install" exited with 1
```

**원인:** Vercel 빌드 환경의 pnpm + Node.js 버전 호환성 문제 (간헐적 발생)

**해결:**
```bash
# 1. 프로젝트 ID 확인
vercel project inspect {프로젝트명}

# 2. install command를 npm으로 변경
curl -X PATCH \
  -H "Authorization: Bearer {VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"installCommand":"npm install"}' \
  "https://api.vercel.com/v9/projects/{PROJECT_ID}?teamId=ymimis-projects"

# 3. 빈 커밋으로 재배포 트리거
git commit --allow-empty -m "chore: trigger redeploy"
git push https://{GITHUB_TOKEN}@github.com/bamauto/promotion.git main
```

### 문제 2: Root Directory 공백 에러

**증상:**
```
The specified Root Directory "apps/gwanggyo  " does not exist.
```

**원인:** Vercel 대시보드에서 Root Directory 설정 시 공백이 포함됨

**해결:**
```bash
# API로 Root Directory 수정 (공백 제거)
curl -X PATCH \
  -H "Authorization: Bearer {VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"rootDirectory":"apps/{지역ID}"}' \
  "https://api.vercel.com/v9/projects/{PROJECT_ID}?teamId=ymimis-projects"
```

### 문제 3: 블로그 Internal Server Error

**증상:** `https://{domain}/blog` 접속 시 "Internal server error"

**원인:** `packages/blog/src/components/LocalBusinessSchema.astro`에 해당 지역 정보 누락

**해결:**
```typescript
// LocalBusinessSchema.astro의 businessInfo에 지역 추가
{새지역ID}: {
  address: '경기도 {시} {구} {동}',
  areaServed: '{지역명}, {인근지역}',
  geo: { lat: {위도}, lng: {경도} }
},
```

### Vercel API 빠른 참조

```bash
# 토큰 위치
cat ~/Library/Application\ Support/com.vercel.cli/auth.json

# 프로젝트 목록
vercel project ls

# 프로젝트 상세
vercel project inspect {프로젝트명}

# 배포 목록
vercel ls {프로젝트명}

# 배포 로그 확인
vercel inspect {배포URL} --logs

# API로 배포 트리거
curl -X POST \
  -H "Authorization: Bearer {VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"name":"{프로젝트명}","target":"production","gitSource":{"type":"github","org":"bamauto","repo":"promotion","ref":"main"}}' \
  "https://api.vercel.com/v13/deployments?teamId=ymimis-projects"
```
