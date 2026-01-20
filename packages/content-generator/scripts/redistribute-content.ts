#!/usr/bin/env tsx
/**
 * 기존 콘텐츠를 다른 지역용으로 복제/변환
 * 기존 글은 유지하고 추가로 생성
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 지역 설정
const REGIONS = {
  bundang: { id: 'bundang', name: '분당', aliases: ['분당', '판교', '서현', '야탑'] },
  dongtan: { id: 'dongtan', name: '동탄', aliases: ['동탄', '동탄2', '병점'] },
  ingedong: { id: 'ingedong', name: '인계동', aliases: ['인계동', '인계', '수원'] },
  jengja: { id: 'jengja', name: '정자', aliases: ['정자', '정자동', '분당 정자'] },
  suwon: { id: 'suwon', name: '수원', aliases: ['수원', '수원역', '영통'] },
};

// 지역명 치환 매핑
const REGION_REPLACEMENTS: Record<string, Record<string, string>> = {
  bundang: {
    '인계동': '분당',
    '수원': '분당',
    '동탄': '분당',
    '영통': '판교',
    '수원역': '서현역',
  },
  dongtan: {
    '인계동': '동탄',
    '수원': '동탄',
    '분당': '동탄',
    '영통': '동탄',
    '수원역': '동탄역',
  },
  jengja: {
    '인계동': '정자동',
    '수원': '정자',
    '동탄': '정자',
    '영통': '정자',
    '수원역': '정자역',
  },
  suwon: {
    '인계동': '수원',
    '동탄': '수원',
    '분당': '수원',
    '정자': '수원',
  },
  ingedong: {
    '동탄': '인계동',
    '분당': '인계동',
    '정자': '인계동',
  },
};

function replaceRegionNames(text: string, targetRegion: string): string {
  const replacements = REGION_REPLACEMENTS[targetRegion];
  if (!replacements) return text;

  let result = text;
  for (const [from, to] of Object.entries(replacements)) {
    result = result.replace(new RegExp(from, 'g'), to);
  }
  return result;
}

function generateSlug(title: string): string {
  // 간단한 슬러그 생성 (한글 포함)
  const base = title
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);

  const suffix = Math.random().toString(36).substring(2, 10);
  return `${base}-${suffix}`;
}

async function redistributeContent() {
  console.log('🔄 콘텐츠 지역 재배분 시작\n');

  // 기존 글 가져오기
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('글 조회 실패:', error.message);
    return;
  }

  console.log(`📊 기존 글 수: ${posts.length}개\n`);

  // 지역별 현황
  const regionCounts: Record<string, number> = {
    bundang: 0, dongtan: 0, ingedong: 0, jengja: 0, suwon: 0
  };

  posts.forEach(p => {
    const region = p.regions?.[0];
    if (region && regionCounts[region] !== undefined) {
      regionCounts[region]++;
    }
  });

  console.log('📊 현재 지역별 분포:');
  Object.entries(regionCounts).forEach(([r, c]) => {
    console.log(`   ${REGIONS[r as keyof typeof REGIONS].name}: ${c}개`);
  });

  // 목표: 각 지역 최소 24개 (총 120개 ÷ 5개 지역)
  const TARGET_PER_REGION = 24;

  // 인계동 글을 소스로 사용 (가장 많음)
  const sourcePosts = posts.filter(p => p.regions?.[0] === 'ingedong').slice(0, 30);

  console.log(`\n📝 소스 글 ${sourcePosts.length}개를 다른 지역용으로 복제합니다...\n`);

  const targetRegions = ['bundang', 'dongtan', 'jengja', 'suwon'];
  let totalCreated = 0;

  for (const targetRegion of targetRegions) {
    const needed = TARGET_PER_REGION - regionCounts[targetRegion];
    if (needed <= 0) {
      console.log(`✅ ${REGIONS[targetRegion as keyof typeof REGIONS].name}: 이미 충분 (${regionCounts[targetRegion]}개)`);
      continue;
    }

    console.log(`\n📍 ${REGIONS[targetRegion as keyof typeof REGIONS].name}: ${needed}개 추가 필요`);

    const postsToUse = sourcePosts.slice(0, needed);
    let created = 0;

    for (const post of postsToUse) {
      // 제목과 콘텐츠의 지역명 치환
      const newTitle = replaceRegionNames(post.title, targetRegion);
      const newContent = replaceRegionNames(post.content, targetRegion);
      const newExcerpt = post.excerpt ? replaceRegionNames(post.excerpt, targetRegion) : null;
      const newMetaTitle = post.meta_title ? replaceRegionNames(post.meta_title, targetRegion) : null;
      const newMetaDesc = post.meta_description ? replaceRegionNames(post.meta_description, targetRegion) : null;

      const newSlug = generateSlug(newTitle);

      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          regions: [targetRegion],
          title: newTitle,
          slug: newSlug,
          content: newContent,
          excerpt: newExcerpt,
          meta_title: newMetaTitle,
          meta_description: newMetaDesc,
          author: post.author || '관리자',
          status: 'published',
          published_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error(`   ❌ 실패: ${newTitle.substring(0, 30)}...`);
      } else {
        created++;
        totalCreated++;
      }
    }

    console.log(`   ✅ ${created}개 생성 완료`);
  }

  console.log(`\n🎉 총 ${totalCreated}개 글 추가 생성 완료!`);

  // 최종 현황 확인
  const { data: finalPosts } = await supabase
    .from('blog_posts')
    .select('regions');

  const finalCounts: Record<string, number> = {
    bundang: 0, dongtan: 0, ingedong: 0, jengja: 0, suwon: 0
  };

  finalPosts?.forEach(p => {
    const region = p.regions?.[0];
    if (region && finalCounts[region] !== undefined) {
      finalCounts[region]++;
    }
  });

  console.log('\n📊 최종 지역별 분포:');
  Object.entries(finalCounts).forEach(([r, c]) => {
    console.log(`   ${REGIONS[r as keyof typeof REGIONS].name}: ${c}개`);
  });
}

redistributeContent().catch(console.error);
