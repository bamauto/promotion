# Content Generator

자동 블로그 콘텐츠 생성기 - Qwen AI를 사용하여 SEO 최적화된 블로그 포스트를 자동으로 생성합니다.

## 기능

- **AI 콘텐츠 생성**: Qwen API를 사용하여 800자 이상의 고품질 콘텐츠 생성
- **지역별 키워드**: 5개 지역(분당, 동탄, 인계동, 정자, 수원)별 맞춤 키워드
- **중복 방지**: 30일 내 사용된 키워드 재사용 방지
- **이미지 관리**: 사용량 기반 랜덤 이미지 선택
- **자동 배포**: Vercel Deploy Hook을 통한 자동 블로그 재빌드

## 설치

```bash
# 루트 디렉토리에서
pnpm install
```

## 환경 변수

`.env` 파일을 생성하거나 환경 변수를 설정하세요:

```bash
# Supabase
SUPABASE_URL=https://rrzeapykmyrsiqmkwjcf.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Qwen API
QWEN_API_KEY=your-qwen-api-key

# Vercel Deploy Hook (선택)
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/xxx
```

## 사용법

### 키워드 시딩

```bash
# 루트에서
pnpm seed:keywords

# 또는 패키지에서 직접
cd packages/content-generator
pnpm seed-keywords
```

### 이미지 시딩

```bash
pnpm seed:images
```

### 콘텐츠 생성

```bash
# 모든 지역에 대해 생성 (기본 5개/지역)
pnpm generate

# 테스트 (실제 저장 안 함)
pnpm generate:dry

# 특정 지역만
pnpm --filter @promotion/content-generator dev generate --region bundang --count 3
```

### 상태 확인

```bash
pnpm generator:status
```

### API 테스트

```bash
pnpm generator:test
```

## CLI 명령어

```bash
# 도움말
pnpm --filter @promotion/content-generator dev --help

# 생성 옵션
pnpm --filter @promotion/content-generator dev generate --help
  -r, --region <region>  특정 지역만 생성
  -c, --count <number>   지역당 포스트 수 (기본: 5)
  -a, --all              모든 지역 생성
  -d, --dry-run          테스트 모드 (저장 안 함)
```

## GitHub Actions

매일 오전 10시(KST)에 자동으로 실행됩니다.

수동 실행:
1. GitHub Actions 탭으로 이동
2. "Content Generator" 워크플로우 선택
3. "Run workflow" 클릭
4. 옵션 설정 후 실행

## 데이터베이스 테이블

- `generator_keywords`: 지역별 키워드 풀
- `generator_images`: 이미지 저장소
- `generator_history`: 생성 이력 (중복 방지)
- `generator_runs`: 실행 로그

## 비용 예상

- Qwen-plus: ~$0.08/일 (25개 포스트 기준)
- Supabase: 무료 티어 내

## 트러블슈팅

### API 연결 실패
```bash
pnpm generator:test
```
환경 변수가 올바르게 설정되었는지 확인하세요.

### 키워드 없음
```bash
pnpm seed:keywords
```

### 이미지 없음
```bash
pnpm seed:images
```
실제 이미지 URL로 `scripts/seed-images.ts`를 업데이트하세요.
