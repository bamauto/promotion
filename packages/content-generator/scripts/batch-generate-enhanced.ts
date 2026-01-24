#!/usr/bin/env tsx
/**
 * Enhanced batch content generation script using Qwen API
 * Generates remaining blog posts for Giheung and Osan with detailed reporting
 */

import { config } from 'dotenv';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Load environment variables
config();

const SUPABASE_URL = 'https://rrzeapykmyrsiqmkwjcf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyemVhcHlrbXlyc2lxbWt3amNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI0MzIsImV4cCI6MjA4NDQ3ODQzMn0.1syiV186n8K4pJnCqMXNBR4N4fr0BHnSba5sBrtMjGk';
const QWEN_API_KEY = 'sk-8abac8d439654955b2c05fa9e1b2e891';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const qwen = new OpenAI({
  apiKey: QWEN_API_KEY,
  baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
});

interface Region {
  id: string;
  name: string;
  domain: string;
}

const REGIONS: Record<string, Region> = {
  giheung: { id: 'giheung', name: '기흥', domain: 'giheungkaraoke.com' },
  osan: { id: 'osan', name: '오산', domain: 'osankaraoke.com' },
};

// Giheung keywords (28 needed)
const GIHEUNG_KEYWORDS = [
  '삼성전자 기흥 가라오케', '보정동 하이퍼블릭', '기흥 하이퍼블릭 정보', '기흥 주말 유흥',
  '기흥 직장인 가라오케', '기흥 하이퍼블릭 가격', '기흥 회식 장소', '죽전역 근처 가라오케',
  '상현역 가라오케', '기흥 가라오케 위치', '기흥 회식 2차', '기흥 셔츠룸 가격',
  '기흥 셔츠룸 위치', '기흥 하이퍼블릭 이용방법', '기흥 가라오케 이용료', '기흥 룸살롱 가격',
  '기흥 단체 예약', '기흥 평일 가라오케', '기흥 가라오케 추천', '기흥 셔츠룸 후기',
  '기흥IC 유흥', '신갈동 가라오케', '기흥 룸살롱 예약', '기흥 하이퍼블릭 추천',
  '기흥 가라오케 예약', '기흥 하이퍼블릭 시스템 설명', '기흥 가라오케 가격', '기흥역 가라오케'
];

// Osan keywords (50 needed)
const OSAN_KEYWORDS = [
  '오산 가라오케', '오산 하이퍼블릭', '오산 셔츠룸', '오산 룸살롱', '오산역 가라오케',
  '오산 유흥', '오산 노래방', '오산시 가라오케', '오산 접대', '오산 2차',
  '오산 회식', '오산 단체', '오산 예약', '오산 밤문화', '오산 나이트',
  '오산 가라오케 가격', '오산 하이퍼블릭 가격', '오산 셔츠룸 가격', '오산 룸살롑 가격', '오산 가라오케 위치',
  '오산 하이퍼블릭 위치', '오산 셔츠룸 위치', '오산 룸살롱 위치', '오산 가라오케 추천', '오산 하이퍼블릭 추천',
  '오산 셔츠룸 추천', '오산 룸살롱 추천', '오산 가라오케 후기', '오산 하이퍼블릭 후기', '오산 셔츠룸 후기',
  '오산 가라오케 시스템', '오산 하이퍼블릭 시스템', '오산 가라오케 이용방법', '오산 하이퍼블릭 이용방법', '오산 평일 가라오케',
  '오산 주말 가라오케', '오산 직장인 가라오케', '오산 회식 장소', '오산 접대 장소', '오산 2차 장소',
  '오산역 근처 가라오케', '오산 가라오케 예약방법', '오산 단체 예약', '오산 가라오케 정보', '오산 유흥 정보',
  '오산 나이트 문화', '오산 엔터테인먼트', '오산 가라오케 안내', '오산 하이퍼블릭 안내', '오산 가라오케 이용료'
];

function getSystemPrompt(region: Region): string {
  return `당신은 ${region.name} 지역 노래방/가라오케 관련 블로그 글을 작성하는 전문 작가입니다.
SEO에 최적화된 블로그 콘텐츠를 작성해주세요.

작성 규칙:
1. 제목은 "${region.name}"과 키워드를 포함하고 흥미롭게 작성
2. 본문은 최소 1500자 이상, 2500자 내외로 작성 (매우 중요!)
3. 자연스러운 한국어로 작성
4. ${region.name} 지역의 특성을 반영
5. HTML 태그 없이 일반 텍스트로 작성
6. 문단 구분은 빈 줄로 표시
7. 구체적인 예시와 설명을 풍부하게 포함
8. 각 문단은 250자 이상으로 작성

응답 형식 (JSON):
{
  "title": "제목",
  "content": "본문 (1500자 이상)",
  "excerpt": "요약 (150자 내외)",
  "meta_title": "SEO 제목 (60자 내외)",
  "meta_description": "SEO 설명 (155자 내외)"
}`;
}

function getUserPrompt(region: Region, keyword: string): string {
  return `키워드: ${keyword}
지역: ${region.name}

위 키워드와 지역을 포함한 블로그 글을 작성해주세요.
반드시 JSON 형식으로만 응답해주세요.`;
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 100);
}

function createHash(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

async function generateContent(region: Region, keyword: string, retries = 2): Promise<any | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await qwen.chat.completions.create({
        model: 'qwen-plus',
        messages: [
          { role: 'system', content: getSystemPrompt(region) },
          { role: 'user', content: getUserPrompt(region, keyword) },
        ],
        temperature: 0.8,
        max_tokens: 2500,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        console.error(`   ❌ No content generated (attempt ${attempt + 1}/${retries + 1})`);
        continue;
      }

      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error(`   ❌ No JSON found in response (attempt ${attempt + 1}/${retries + 1})`);
        continue;
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Validate content length
      if (!parsed.content || parsed.content.length < 1000) {
        console.error(`   ❌ Content too short (${parsed.content?.length || 0} chars, attempt ${attempt + 1}/${retries + 1})`);
        continue;
      }

      return parsed;
    } catch (error) {
      console.error(`   ❌ Error generating content (attempt ${attempt + 1}/${retries + 1}):`, error instanceof Error ? error.message : error);
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }
  return null;
}

async function insertPost(region: Region, keyword: string, content: any): Promise<boolean> {
  try {
    const slug = createSlug(content.title);
    const contentHash = createHash(content.content);

    // Insert blog post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert({
        title: content.title,
        slug: slug,
        content: content.content,
        excerpt: content.excerpt,
        meta_title: content.meta_title,
        meta_description: content.meta_description,
        regions: [region.id],
        category: 'general',
        author: '관리자',
        published: true,
        featured: false,
        view_count: 0,
      })
      .select()
      .single();

    if (postError) {
      console.error(`   ❌ Error inserting post:`, postError.message);
      return false;
    }

    // Insert generator history
    const { error: historyError } = await supabase
      .from('generator_history')
      .insert({
        region: region.id,
        keyword: keyword,
        blog_post_id: post.id,
        content_hash: contentHash,
        generation_date: new Date().toISOString().split('T')[0],
      });

    if (historyError) {
      console.error(`   ⚠️  Post created but history failed:`, historyError.message);
    }

    return true;
  } catch (error) {
    console.error(`   ❌ Error inserting post:`, error instanceof Error ? error.message : error);
    return false;
  }
}

async function generateForRegion(
  regionId: string,
  keywords: string[],
  targetCount: number
): Promise<{ success: number; failed: number; totalChars: number; posts: any[] }> {
  const region = REGIONS[regionId];
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📍 Region: ${region.name}`);
  console.log(`   Target: ${targetCount} posts`);
  console.log(`   Available keywords: ${keywords.length}`);
  console.log(`${'='.repeat(60)}`);

  let success = 0;
  let failed = 0;
  let totalChars = 0;
  const posts: any[] = [];
  const startTime = Date.now();

  for (let i = 0; i < Math.min(targetCount, keywords.length); i++) {
    const keyword = keywords[i];
    console.log(`\n   [${i + 1}/${targetCount}] Keyword: ${keyword}`);

    const content = await generateContent(region, keyword);
    if (!content) {
      failed++;
      console.log(`   ⚠️  Generation failed for: ${keyword}`);
      continue;
    }

    console.log(`   ✓ Generated (${content.content.length} chars)`);

    const inserted = await insertPost(region, keyword, content);
    if (inserted) {
      success++;
      totalChars += content.content.length;
      posts.push({ keyword, chars: content.content.length, title: content.title });
      console.log(`   ✅ Inserted successfully`);
    } else {
      failed++;
      console.log(`   ❌ Insert failed for: ${keyword}`);
    }

    // Progress update every 10 posts
    if ((i + 1) % 10 === 0) {
      const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
      const avgChars = Math.round(totalChars / success);
      const successRate = Math.round(success / (i + 1) * 100);
      console.log(`\n   ${'─'.repeat(50)}`);
      console.log(`   📊 Progress Report (${i + 1}/${targetCount})`);
      console.log(`   ✓ Successful: ${success} (${successRate}%)`);
      console.log(`   ✗ Failed: ${failed}`);
      console.log(`   📝 Average length: ${avgChars} chars`);
      console.log(`   ⏱️  Time elapsed: ${elapsed} minutes`);
      console.log(`   ${'─'.repeat(50)}`);
    }

    // Rate limiting - wait 2 seconds between requests
    if (i < targetCount - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return { success, failed, totalChars, posts };
}

async function main() {
  console.log('\n🚀 Enhanced Batch Content Generation with Qwen API\n');
  console.log(`Start time: ${new Date().toLocaleString('ko-KR')}\n`);

  const results: any = {};
  const overallStart = Date.now();

  // Generate Giheung posts (28 needed)
  console.log('\n🔵 Starting Giheung generation...');
  results.giheung = await generateForRegion('giheung', GIHEUNG_KEYWORDS, 28);

  // Generate Osan posts (50 needed)
  console.log('\n🔵 Starting Osan generation...');
  results.osan = await generateForRegion('osan', OSAN_KEYWORDS, 50);

  // Final Summary
  const totalTime = ((Date.now() - overallStart) / 1000 / 60).toFixed(1);
  console.log('\n\n');
  console.log('═'.repeat(60));
  console.log('📊 FINAL GENERATION SUMMARY');
  console.log('═'.repeat(60));

  let totalSuccess = 0;
  let totalFailed = 0;
  let totalChars = 0;

  for (const [region, result] of Object.entries(results)) {
    const regionName = REGIONS[region as keyof typeof REGIONS].name;
    const avgChars = result.success > 0 ? Math.round(result.totalChars / result.success) : 0;
    const successRate = result.success + result.failed > 0
      ? Math.round(result.success / (result.success + result.failed) * 100)
      : 0;

    console.log(`\n📍 ${regionName} (${region})`);
    console.log(`   ✓ Success: ${result.success}`);
    console.log(`   ✗ Failed: ${result.failed}`);
    console.log(`   📝 Average length: ${avgChars} chars`);
    console.log(`   📈 Success rate: ${successRate}%`);
    console.log(`   Total chars: ${result.totalChars.toLocaleString()}`);

    totalSuccess += result.success;
    totalFailed += result.failed;
    totalChars += result.totalChars;
  }

  console.log('\n' + '─'.repeat(60));
  console.log(`TOTAL RESULTS:`);
  console.log(`   ✓ Total Success: ${totalSuccess}`);
  console.log(`   ✗ Total Failed: ${totalFailed}`);
  console.log(`   📝 Overall Average: ${totalSuccess > 0 ? Math.round(totalChars / totalSuccess) : 0} chars`);
  console.log(`   ⏱️  Total Time: ${totalTime} minutes`);
  console.log(`   📈 Overall Success Rate: ${Math.round(totalSuccess / (totalSuccess + totalFailed) * 100)}%`);
  console.log('═'.repeat(60));

  // Quality Report
  console.log('\n📋 QUALITY REPORT:');
  console.log('─'.repeat(60));

  for (const [region, result] of Object.entries(results)) {
    if (result.posts.length > 0) {
      const regionName = REGIONS[region as keyof typeof REGIONS].name;
      console.log(`\n${regionName}:`);
      console.log(`   Minimum length: ${Math.min(...result.posts.map((p: any) => p.chars))} chars`);
      console.log(`   Maximum length: ${Math.max(...result.posts.map((p: any) => p.chars))} chars`);
      console.log(`   Posts under 1500 chars: ${result.posts.filter((p: any) => p.chars < 1500).length}`);
      console.log(`   Posts over 2000 chars: ${result.posts.filter((p: any) => p.chars >= 2000).length}`);
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`End time: ${new Date().toLocaleString('ko-KR')}`);
  console.log('═'.repeat(60));

  if (totalSuccess > 0) {
    console.log('\n✅ Batch generation complete!');
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Verify posts at: https://rrzeapykmyrsiqmkwjcf.supabase.co`);
    console.log(`   2. Check blog pages: https://giheungkaraoke.com/blog`);
    console.log(`   3. Check blog pages: https://osankaraoke.com/blog`);
  } else {
    console.log('\n❌ No posts were generated successfully.');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
