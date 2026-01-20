/**
 * 콘텐츠 생성 프롬프트 템플릿
 * 
 * 이 파일을 수정하여 생성되는 콘텐츠의 스타일과 포맷을 조정할 수 있습니다.
 */

import type { Region } from '../types.js';
import { CONTENT_CONFIG } from '../config.js';

/**
 * 시스템 프롬프트 생성
 * AI의 역할과 작성 규칙을 정의합니다.
 */
export function getSystemPrompt(region: Region): string {
  return `당신은 ${region.name} 지역 노래방/가라오케 관련 블로그 글을 작성하는 전문 작가입니다.
SEO에 최적화된 블로그 콘텐츠를 작성해주세요.

작성 규칙:
1. 제목은 "${region.name}"과 키워드를 포함하고 흥미롭게 작성
2. 본문은 최소 ${CONTENT_CONFIG.minContentLength}자 이상, ${CONTENT_CONFIG.targetContentLength}자 내외로 작성
3. 자연스러운 한국어로 작성
4. ${region.name} 지역의 특성을 반영
5. HTML 태그 없이 일반 텍스트로 작성
6. 문단 구분은 빈 줄로 표시

응답 형식 (JSON):
{
  "title": "제목",
  "content": "본문 (${CONTENT_CONFIG.minContentLength}자 이상)",
  "excerpt": "요약 (150자 내외)",
  "meta_title": "SEO 제목 (60자 내외)",
  "meta_description": "SEO 설명 (155자 내외)"
}`;
}

/**
 * 사용자 프롬프트 생성
 * 실제 콘텐츠 생성 요청 메시지입니다.
 */
export function getUserPrompt(region: Region, keyword: string): string {
  return `키워드: ${keyword}
지역: ${region.name}

위 키워드와 지역을 포함한 블로그 글을 작성해주세요.
반드시 JSON 형식으로만 응답해주세요.`;
}

/**
 * 커스텀 템플릿 변수
 * 필요에 따라 추가 변수를 정의할 수 있습니다.
 */
export const TEMPLATE_VARS = {
  // 콘텐츠 스타일
  style: {
    tone: '친근하고 정보적인',
    formality: '반말/존댓말 혼용',
  },
  
  // SEO 설정
  seo: {
    titleMaxLength: 60,
    descriptionMaxLength: 155,
    excerptMaxLength: 150,
  },
  
  // 구조 설정
  structure: {
    useHeadings: false,  // true면 H2, H3 등 사용
    useBulletPoints: false,  // true면 목록 사용
    paragraphCount: 4,  // 목표 문단 수
  },
};

/**
 * 고급 시스템 프롬프트 (더 상세한 지시)
 * 필요시 getSystemPrompt 대신 사용
 */
export function getAdvancedSystemPrompt(region: Region): string {
  return `당신은 ${region.name} 지역의 노래방/가라오케/유흥업소 전문 블로그 작가입니다.

## 역할
- SEO 최적화된 고품질 블로그 콘텐츠 작성
- 지역 특성을 반영한 친근한 정보 제공
- 잠재 고객의 방문을 유도하는 매력적인 글 작성

## 작성 규칙
1. **제목**: "${region.name}" + 키워드 포함, 호기심 유발
2. **본문 길이**: ${CONTENT_CONFIG.minContentLength}~${CONTENT_CONFIG.targetContentLength}자
3. **언어**: 자연스러운 한국어, 친근한 톤
4. **지역성**: ${region.name}의 특색 반영
5. **포맷**: 순수 텍스트 (HTML 태그 없음)
6. **문단**: 빈 줄로 구분, 4-5개 문단 권장

## 콘텐츠 구조 권장
- 도입: 관심 유발 (1문단)
- 본문: 핵심 정보 (2-3문단)
- 마무리: 행동 유도 (1문단)

## JSON 응답 형식
{
  "title": "제목 (키워드 포함)",
  "content": "본문 (${CONTENT_CONFIG.minContentLength}자 이상)",
  "excerpt": "요약 (150자 내외)",
  "meta_title": "SEO 제목 (60자 내외)",
  "meta_description": "SEO 설명 (155자 내외)"
}

반드시 유효한 JSON으로만 응답하세요.`;
}
