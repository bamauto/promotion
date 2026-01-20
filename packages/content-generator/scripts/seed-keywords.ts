#!/usr/bin/env tsx
/**
 * Seed keywords for content generation
 * Usage: pnpm --filter @promotion/content-generator seed-keywords
 */

import { config } from 'dotenv';
import { validateEnv, ALL_REGIONS, REGIONS } from '../src/config.js';
import { addKeywords, getKeywordCount } from '../src/services/keyword.js';

// Load environment variables
config();

// Base keywords (will be combined with region names)
const BASE_KEYWORDS = [
  // 일반 노래방 관련
  '노래방',
  '가라오케',
  '노래방 추천',
  '노래방 가격',
  '노래방 시스템',
  '노래방 예약',
  '룸 노래방',
  '프리미엄 노래방',
  '단체 노래방',
  '파티룸',
  
  // 시설/서비스 관련
  '음향 시스템',
  '최신곡 업데이트',
  '넓은 룸',
  '대형 룸',
  '소형 룸',
  'VIP 룸',
  '파티 룸',
  '이벤트 룸',
  '신곡 노래방',
  '최신 노래방',
  
  // 이용 목적별
  '2차 장소',
  '회식 장소',
  '모임 장소',
  '데이트 코스',
  '친구 모임',
  '동창회',
  '생일 파티',
  '기념일',
  '야간 노래방',
  '심야 노래방',
  
  // 특징/분위기
  '고급 노래방',
  '깨끗한 노래방',
  '분위기 좋은 노래방',
  '인테리어 노래방',
  '럭셔리 노래방',
  '모던 노래방',
  '가성비 노래방',
  '주차 가능',
  '역세권 노래방',
  
  // 시간대별
  '점심 노래방',
  '저녁 노래방',
  '야간 영업',
  '새벽 노래방',
  '주말 노래방',
  '평일 노래방',
  
  // 메뉴/부가서비스
  '노래방 음식',
  '노래방 주류',
  '노래방 안주',
  '스낵바',
  '음료 서비스',
  
  // 기술/장비
  'TJ 노래방',
  '금영 노래방',
  '최신 기기',
  '음질 좋은 노래방',
  '마이크 좋은 노래방',
  '화면 큰 노래방',
  
  // 접근성
  '노래방 위치',
  '노래방 찾기',
  '근처 노래방',
  '노래방 영업시간',
  '노래방 연락처',
  '노래방 전화번호',
];

// Region-specific keywords
const REGION_SPECIFIC_KEYWORDS: Record<string, string[]> = {
  bundang: [
    '서현역',
    '정자역',
    '수내역',
    '야탑역',
    '이매역',
    '판교',
    '분당 맛집 근처',
    '분당 유흥',
    '성남시',
    '분당구',
  ],
  dongtan: [
    '동탄역',
    '동탄2신도시',
    '동탄1동',
    '동탄 상가',
    '화성시',
    '동탄 호수공원 근처',
    '동탄 맛집 근처',
    '동탄 신도시',
    '동탄 번화가',
    '메타폴리스',
  ],
  ingedong: [
    '인계동 맛집 근처',
    '권선구',
    '인계동 상권',
    '인계동 유흥가',
    '인계동 번화가',
    '수원역 근처',
    '세류역',
    '수원 시내',
    '인계동 밤문화',
    '인계동 2차',
  ],
  jengja: [
    '정자동',
    '정자역 근처',
    '정자동 상권',
    '정자동 맛집 근처',
    '분당 정자',
    '네이버 본사 근처',
    '카카오 근처',
    'IT밸리',
    '정자역 번화가',
    '정자동 회식',
  ],
  suwon: [
    '수원역',
    '수원 시내',
    '팔달구',
    '영통구',
    '권선구',
    '장안구',
    '수원 화성',
    '수원 행궁',
    '수원 번화가',
    '수원 맛집 근처',
    '광교',
    '영통역',
    '망포역',
  ],
};

async function main() {
  console.log('🌱 Seeding Keywords\n');
  
  try {
    validateEnv();
    
    for (const region of ALL_REGIONS) {
      const regionName = REGIONS[region].name;
      console.log(`\n📍 Processing ${regionName}...`);
      
      // Combine base keywords with region name
      const keywords: Array<{
        region: string;
        keyword: string;
        category: string;
        priority: number;
      }> = [];
      
      // Base keywords combined with region
      for (const baseKeyword of BASE_KEYWORDS) {
        keywords.push({
          region,
          keyword: `${regionName} ${baseKeyword}`,
          category: 'general',
          priority: 1,
        });
      }
      
      // Region-specific keywords
      const specificKeywords = REGION_SPECIFIC_KEYWORDS[region] || [];
      for (const specific of specificKeywords) {
        // Keyword with region
        keywords.push({
          region,
          keyword: `${specific} 노래방`,
          category: 'location',
          priority: 2,
        });
        
        // Keyword with karaoke variations
        keywords.push({
          region,
          keyword: `${specific} 가라오케`,
          category: 'location',
          priority: 2,
        });
      }
      
      // Add keywords to database
      const added = await addKeywords(keywords);
      const total = await getKeywordCount(region);
      
      console.log(`   Added: ${added} keywords`);
      console.log(`   Total: ${total} keywords`);
    }
    
    console.log('\n✅ Keyword seeding complete!');
    
  } catch (e) {
    console.error('\n❌ Seeding failed:', e);
    process.exit(1);
  }
}

main();
