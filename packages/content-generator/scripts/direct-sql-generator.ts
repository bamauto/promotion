#!/usr/bin/env tsx
/**
 * Direct SQL generator for blog posts
 * This creates SQL INSERT statements that can be executed via Supabase MCP
 */

interface KeywordData {
  id: string;
  keyword: string;
  category: string;
}

interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  category: string;
  regions: string[];
  keyword_id: string;
  keyword: string;
}

// Sample keywords from database
const GIHEUNG_KEYWORDS: KeywordData[] = [
  { id: 'ed1a4e23-1ea1-4b05-a024-aaecb2f31d48', keyword: '기흥 가라오케 초보자', category: 'beginner' },
  { id: 'eb45949d-5962-49dd-8ae8-f5614d97af71', keyword: '기흥 유흥 가이드', category: 'beginner' },
  // Add more as needed
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateBlogPost(keyword: KeywordData, region: string): BlogPost {
  const regionName = region === 'giheung' ? '기흥' : '오산';
  const locationInfo = region === 'giheung'
    ? '기흥역, 신갈동, 구갈동, 보정동 인근의 삼성전자와 SK하이닉스 근처'
    : '오산역, 세교신도시, 삼성전자 오산캠퍼스, 오산대역 인근';

  // Determine category
  let category = 'karaoke';
  if (keyword.keyword.includes('하이퍼블릭')) category = 'hyperpublic';
  else if (keyword.keyword.includes('셔츠룸')) category = 'shirtsroom';
  else if (keyword.keyword.includes('룸살롱')) category = 'businessroom';
  else if (keyword.keyword.includes('호빠')) category = 'hostbar';

  const title = `${keyword.keyword} - ${regionName} 지역 완벽 가이드`;
  const slug = generateSlug(title);

  // Generate comprehensive content (2000+ characters)
  const content = `
## ${regionName} ${keyword.keyword} 완벽 가이드

${regionName} 지역에서 ${keyword.keyword}를 찾고 계신가요? 이 글에서는 ${locationInfo}에 위치한 최고의 업소 정보와 이용 방법을 상세히 안내해드리겠습니다.

### 1. ${regionName} 유흥 문화 이해하기

${regionName}은 경기도 남부의 핵심 상권으로, 다양한 유흥 업소들이 밀집되어 있는 지역입니다. 특히 ${keyword.keyword}와 관련하여 이 지역은 높은 퀄리티와 합리적인 가격으로 유명합니다.

직장인들의 회식 2차 장소로도 많이 이용되며, 주말에는 친구들과의 모임 장소로도 인기가 높습니다. ${locationInfo}는 접근성이 뛰어나 대중교통으로도 쉽게 방문할 수 있습니다.

업소마다 시스템과 가격대가 다르므로, 방문 전 미리 예약하고 상담받는 것을 추천드립니다. 특히 주말이나 공휴일 전날에는 예약이 필수입니다.

### 2. 시스템 및 이용 방법

${regionName} ${keyword.keyword} 업소들은 대부분 깔끔한 시설과 체계적인 서비스를 제공합니다. 기본적인 이용 절차는 다음과 같습니다:

**예약 단계:**
- 전화나 카카오톡으로 사전 예약
- 방문 인원, 시간, 희망 룸 타입 상담
- 예산에 맞는 코스 선택

**방문 시:**
- 깨끗한 복장과 매너 준수
- 신분증 지참 (성인 인증)
- 예약 시간 10분 전 도착 권장

**이용 중:**
- 친절한 매니저의 안내
- 다양한 주류 및 안주 선택
- 노래방 시스템 이용

업소마다 특색 있는 서비스를 제공하므로, 첫 방문 시 매니저에게 상세한 설명을 들어보시기 바랍니다.

### 3. 가격 정보 및 추천 코스

${regionName} 지역의 ${keyword.keyword} 가격대는 업소의 등급과 서비스 종류에 따라 다양합니다. 일반적인 가격 범위는 다음과 같습니다:

**기본 코스:**
- 1시간 기본: 10만원~15만원
- 2시간 프리미엄: 20만원~30만원
- VIP 룸: 30만원~50만원

**추천 코스:**
초보자라면 2시간 기본 코스로 시작하시는 것을 추천드립니다. 시스템에 익숙해지면 프리미엄 코스나 VIP 룸을 이용해보세요.

단체 방문 시에는 별도 할인이 적용되는 경우가 많으니 예약 시 문의하시기 바랍니다.

### 4. 위치 및 교통편

${regionName} ${keyword.keyword} 업소들은 주로 ${locationInfo}에 밀집되어 있습니다. 대중교통 이용 시:

**지하철:**
- 신분당선, 분당선 등 주요 노선 이용
- 역에서 도보 5-10분 거리

**자가용:**
- 주차 공간 완비된 업소 다수
- 대리운전 서비스 이용 권장

**택시:**
- 심야 시간대 편리한 이용
- 주요 상권 내 위치로 접근 용이

방문 전 정확한 위치는 예약 시 안내받으시기 바랍니다.

### 5. 주의사항 및 에티켓

${regionName} ${keyword.keyword}를 이용할 때는 다음 사항들을 꼭 숙지하시기 바랍니다:

**기본 에티켓:**
- 직원과 다른 고객에 대한 존중
- 과도한 음주 자제
- 소음 및 시설 훼손 금지

**안전 수칙:**
- 귀중품 직접 관리
- 음주운전 절대 금지
- 건전한 유흥 문화 실천

**예약 취소:**
- 취소 시 최소 3시간 전 연락
- 노쇼 발생 시 향후 예약 제한 가능

### 6. 자주 묻는 질문 (FAQ)

**Q: 혼자 방문해도 되나요?**
A: 네, 1인 방문도 가능합니다. 다만 2인 이상 방문 시 더 다양한 서비스를 즐기실 수 있습니다.

**Q: 영업시간은 어떻게 되나요?**
A: 대부분 오후 6시부터 새벽 5시까지 영업합니다. 업소마다 차이가 있을 수 있습니다.

**Q: 드레스 코드가 있나요?**
A: 특별한 드레스 코드는 없으나, 깔끔한 복장을 권장합니다. 슬리퍼, 나시 착용은 삼가주세요.

**Q: 예약은 필수인가요?**
A: 주말과 공휴일에는 예약이 필수입니다. 평일도 예약 후 방문하시면 대기 시간 없이 이용 가능합니다.

### 7. ${regionName} 지역 특징

${regionName}은 ${locationInfo}를 중심으로 형성된 활기찬 상권입니다. 특히 직장인들이 많이 거주하고 근무하는 지역이라 평일 저녁과 주말에 특히 붐빕니다.

최신 시설과 젊은 층을 타겟으로 한 모던한 인테리어의 업소들이 많아, 쾌적하고 세련된 분위기에서 즐거운 시간을 보낼 수 있습니다.

### 마무리

${regionName} ${keyword.keyword}에 대한 정보가 도움이 되셨기를 바랍니다. 처음 방문하시는 분들은 예약 시 초보자라고 말씀하시면 친절한 안내를 받으실 수 있습니다.

안전하고 즐거운 시간 보내시기 바라며, 추가 문의 사항이 있으시면 언제든 예약 문의를 통해 상담받으시기 바랍니다.

**예약 문의:** 카카오톡 상담 또는 전화 예약 가능
**위치:** ${locationInfo}
**영업시간:** 오후 6시 - 새벽 5시 (업소마다 상이)

건전하고 즐거운 ${regionName} ${keyword.keyword} 문화를 함께 만들어갑시다!
`.trim();

  const excerpt = `${regionName} ${keyword.keyword} 완벽 가이드. ${locationInfo}의 프리미엄 업소 정보, 가격, 이용 방법, 예약 정보를 한눈에 확인하세요. 초보자도 쉽게 이해할 수 있는 상세한 안내를 제공합니다.`;

  const meta_title = `${keyword.keyword} | ${regionName} 지역 추천 업소 가이드`;
  const meta_description = `${regionName} ${keyword.keyword} 정보. ${locationInfo} 프리미엄 업소의 시스템, 가격, 예약 방법을 상세히 안내합니다. 초보자 환영!`;

  return {
    title,
    slug,
    content,
    excerpt,
    meta_title: meta_title.substring(0, 60),
    meta_description: meta_description.substring(0, 155),
    category,
    regions: [region],
    keyword_id: keyword.id,
    keyword: keyword.keyword,
  };
}

console.log('Blog post generator ready. Use this template to generate posts.');
console.log('Sample post structure:');
const sample = generateBlogPost(GIHEUNG_KEYWORDS[0], 'giheung');
console.log(JSON.stringify(sample, null, 2));
