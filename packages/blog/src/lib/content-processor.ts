import { getRegionDomain, getServicePath, LINK_KEYWORDS } from './regions';
import type { RegionId, ServiceType } from './regions';

interface LinkMatch {
  keyword: string;
  service: ServiceType;
  priority: number;
  index: number;
}

/**
 * 콘텐츠 내 키워드를 지역 사이트 링크로 변환
 * - 포스트당 최대 3개 링크 (과최적화 방지)
 * - 이미 링크가 있는 텍스트는 건너뜀
 * - 첫 번째 발견된 키워드만 링크 변환 (중복 방지)
 */
export function processContentLinks(
  content: string,
  regionId: RegionId,
  maxLinks: number = 3
): string {
  const baseUrl = getRegionDomain(regionId);

  // 이미 링크가 있는 부분 추출 (나중에 제외)
  const existingLinks: Array<{ start: number; end: number }> = [];
  const linkRegex = /<a[^>]*>[\s\S]*?<\/a>/gi;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(content)) !== null) {
    existingLinks.push({
      start: linkMatch.index,
      end: linkMatch.index + linkMatch[0].length,
    });
  }

  // 각 키워드에 대해 첫 번째 발견 위치 찾기
  const matches: LinkMatch[] = [];
  const processedKeywords = new Set<string>();

  // 우선순위대로 정렬된 키워드
  const sortedKeywords = Object.entries(LINK_KEYWORDS)
    .sort((a, b) => a[1].priority - b[1].priority);

  for (const [keyword, config] of sortedKeywords) {
    if (processedKeywords.has(config.service)) continue; // 같은 서비스의 키워드는 건너뜀

    // 키워드 검색 (대소문자 구분 없음)
    const keywordRegex = new RegExp(escapeRegex(keyword), 'gi');
    let match;

    while ((match = keywordRegex.exec(content)) !== null) {
      const index = match.index;

      // 이미 링크 안에 있는지 확인
      const isInsideLink = existingLinks.some(
        link => index >= link.start && index < link.end
      );

      if (!isInsideLink) {
        matches.push({
          keyword: match[0], // 원본 케이스 유지
          service: config.service,
          priority: config.priority,
          index,
        });
        processedKeywords.add(config.service);
        break; // 이 키워드의 첫 번째 발견만 처리
      }
    }

    if (matches.length >= maxLinks) break;
  }

  // 인덱스 역순으로 정렬 (뒤에서부터 치환해야 인덱스 유지)
  matches.sort((a, b) => b.index - a.index);

  // 링크로 치환
  let processedContent = content;
  for (const match of matches) {
    const servicePath = getServicePath(regionId, match.service);
    const linkHtml = `<a href="${baseUrl}${servicePath}" class="content-internal-link">${match.keyword}</a>`;
    processedContent =
      processedContent.slice(0, match.index) +
      linkHtml +
      processedContent.slice(match.index + match.keyword.length);
  }

  return processedContent;
}

/**
 * 정규식 특수문자 이스케이프
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 콘텐츠에서 특정 키워드 빈도 분석 (SEO 분석용)
 */
export function analyzeKeywordDensity(content: string): Map<string, number> {
  const density = new Map<string, number>();
  const plainText = content.replace(/<[^>]+>/g, ' '); // HTML 태그 제거
  const wordCount = plainText.split(/\s+/).length;

  for (const keyword of Object.keys(LINK_KEYWORDS)) {
    const regex = new RegExp(escapeRegex(keyword), 'gi');
    const matches = plainText.match(regex);
    const count = matches ? matches.length : 0;
    if (count > 0) {
      density.set(keyword, (count / wordCount) * 100);
    }
  }

  return density;
}
