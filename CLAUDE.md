# Promotion 프로젝트 정보

## Git Push 설정

**중요:** Git push 시 반드시 아래 토큰을 사용할 것

```bash
git push https://{GITHUB_TOKEN}@github.com/bamauto/promotion.git main
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
│   └── suwon/       # 수원 사이트
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

### 5단계: 블로그 지역 등록
`packages/blog/src/lib/regions.ts`에 새 지역 추가:
```typescript
{새지역ID}: {
  id: '{새지역ID}',
  name: '{지역명}',
  nameEn: '{영문명}',
  domain: '{도메인}',
  keyword: '가라오케',
  description: '{지역명} 가라오케 하이퍼블릭 정보',
},
```

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

### 8단계: Vercel 배포
```bash
cd apps/{새지역ID}
vercel --prod --yes
```

### 9단계: Vercel 설정
1. **Git 연결**: https://vercel.com/new → Import → `bamauto/promotion` → Root Directory: `apps/{새지역ID}`
2. **SSO Protection 해제** (API 사용):
```bash
# 프로젝트 ID 확인
vercel project inspect {새지역ID}

# Protection 해제
curl -X PATCH \
  -H "Authorization: Bearer {VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"ssoProtection": null}' \
  "https://api.vercel.com/v9/projects/{PROJECT_ID}"
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

## Vercel API 토큰
토큰 위치: `~/Library/Application Support/com.vercel.cli/auth.json`

## 주의사항
- sitemap.xml, robots.txt의 도메인 철자 정확히 확인
- pnpm-lock.yaml 반드시 커밋 (안 하면 Vercel 빌드 실패)
- 블로그 regions.ts 수정 후 블로그도 자동 재배포됨
