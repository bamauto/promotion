# Promotion 프로젝트 정보

## 지역별 도메인

| 지역 | ID | 도메인 |
|------|-----|--------|
| 분당 | bundang | bundanghipublic.com |
| 동탄 | dongtan | dongtankaraoke.net |
| 인계동 | ingedong | ingedongkaraoke.com |
| 정자 | jengja | jengjakaraoke.com |
| 수원 | suwon | suwon.vip |

## 프로젝트 구조

```
promotion/
├── apps/
│   ├── bundang/     # 분당 사이트 (React/Vite)
│   ├── dongtan/     # 동탄 사이트
│   ├── ingedong/    # 인계동 사이트
│   ├── jengja/      # 정자 사이트
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
