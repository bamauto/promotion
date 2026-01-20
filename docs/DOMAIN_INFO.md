# 도메인 정보

## 지역별 실제 도메인

| 지역 | ID | 도메인 | 블로그 URL |
|------|-----|--------|-----------|
| 분당 | bundang | bundanghipublic.com | bundanghipublic.com/blog |
| 동탄 | dongtan | dongtankaraoke.net | dongtankaraoke.net/blog |
| 인계동 | ingedong | ingedongkaraoke.com | ingedongkaraoke.com/blog |
| 정자 | jengja | jengjakaraoke.com | jengjakaraoke.com/blog |
| 수원 | suwon | suwon.vip | suwon.vip/blog |

## Vercel 프로젝트 구조

### 지역 앱들 (각각 별도 Vercel 프로젝트)
- `apps/bundang` → bundanghipublic.com
- `apps/dongtan` → dongtankaraoke.net
- `apps/ingedong` → ingedongkaraoke.com
- `apps/jengja` → jengjakaraoke.com
- `apps/suwon` → suwon.vip

### 공유 블로그 (별도 Vercel 프로젝트)
- `packages/blog` → promotion-blog.vercel.app (내부 URL)
- 각 지역 앱에서 `/blog` 경로를 이 앱으로 리다이렉트

## URL 라우팅

```
사용자 요청: bundanghipublic.com/blog/room-guide
    ↓
Vercel Rewrite (apps/bundang/vercel.json)
    ↓
promotion-blog.vercel.app/bundang/room-guide
    ↓
Astro 렌더링 (분당 지역 데이터만 표시)
```

## Supabase 설정

- **Project URL**: https://rrzeapykmyrsiqmkwjcf.supabase.co
- **Anon Key**: sb_publishable_PURbxvJKEEW_JSuH4NLHqQ_4QXKY71W

### 테이블
- `blog_posts` - 블로그 포스트 (regions 배열로 지역 필터링)
- `blog_images` - 지역별 이미지

### Storage
- `blog-images/` 버킷
  - `bundang/`, `dongtan/`, `ingedong/`, `jengja/`, `suwon/`, `shared/`

## 파일 위치

도메인 설정이 있는 파일들:
1. `packages/blog/src/lib/regions.ts` - 지역 정보 및 도메인
2. `packages/blog/astro.config.mjs` - Astro 사이트맵 설정
3. `apps/*/vercel.json` - 각 지역 앱의 리다이렉트 설정
4. `CLAUDE.md` - 프로젝트 참조 문서
