#!/usr/bin/env tsx
/**
 * Batch content generation script using Qwen API
 * Generates remaining blog posts for Giheung and Osan
 */

import { config } from 'dotenv';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Load environment variables
config();

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyemVhcHlrbXlyc2lxbWt3amNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI0MzIsImV4cCI6MjA4NDQ3ODQzMn0.1syiV186n8K4pJnCqMXNBR4N4fr0BHnSba5sBrtMjGk';
const QWEN_API_KEY = process.env.QWEN_API_KEY!;

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
  "content": "본문 (1200자 이상)",
  "excerpt": "요약 (150자 내외)",
  "meta_title": "SEO 제목 (60자 내외)",
  "meta_description": "SEO 설명 (155자 내외)"
}`;
}

function getUserPrompt(region: Region, keyword: string): string {
  return \`키워드: \${keyword}
지역: \${region.name}

위 키워드와 지역을 포함한 블로그 글을 작성해주세요.
반드시 JSON 형식으로만 응답해주세요.\`;
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\\s-]/g, '')
    .replace(/\\s+/g, '-')
    .substring(0, 100);
}

function createHash(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

async function generateContent(region: Region, keyword: string): Promise<any | null> {
  try {
    const response = await qwen.chat.completions.create({
      model: 'qwen-plus',
      messages: [
        { role: 'system', content: getSystemPrompt(region) },
        { role: 'user', content: getUserPrompt(region, keyword) },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error(\`   ❌ No content generated for keyword: \${keyword}\`);
      return null;
    }

    // Extract JSON from response
    const jsonMatch = content.match(/\\{[\\s\\S]*\\}/);
    if (!jsonMatch) {
      console.error(\`   ❌ No JSON found in response for keyword: \${keyword}\`);
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate content length
    if (!parsed.content || parsed.content.length < 1000) {
      console.error(\`   ❌ Content too short (\${parsed.content?.length || 0} chars) for keyword: \${keyword}\`);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error(\`   ❌ Error generating content for keyword \${keyword}:\`, error);
    return null;
  }
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
      console.error(\`   ❌ Error inserting post:\`, postError);
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
      console.error(\`   ⚠️  Post created but history failed:\`, historyError);
    }

    return true;
  } catch (error) {
    console.error(\`   ❌ Error inserting post:\`, error);
    return false;
  }
}

async function generateForRegion(
  regionId: string,
  keywords: Array<{ keyword: string; category: string }>,
  targetCount: number
): Promise<{ success: number; failed: number }> {
  const region = REGIONS[regionId];
  console.log(\`\\n📍 Region: \${region.name}\`);
  console.log(\`   Target: \${targetCount} posts\`);
  console.log(\`   Available keywords: \${keywords.length}\`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < Math.min(targetCount, keywords.length); i++) {
    const { keyword, category } = keywords[i];
    console.log(\`\\n   [\${i + 1}/\${targetCount}] Keyword: \${keyword}\`);

    const content = await generateContent(region, keyword);
    if (!content) {
      failed++;
      continue;
    }

    console.log(\`   ✓ Generated (\${content.content.length} chars)\`);

    const inserted = await insertPost(region, keyword, content);
    if (inserted) {
      success++;
      console.log(\`   ✓ Inserted successfully\`);
    } else {
      failed++;
    }

    // Rate limiting - wait 2 seconds between requests
    if (i < targetCount - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return { success, failed };
}

async function main() {
  console.log('🚀 Batch Content Generation with Qwen API\\n');

  // Get available keywords for Giheung and Osan
  const { data: giheungKeywords, error: gErr } = await supabase.rpc('get_available_keywords', {
    p_region: 'giheung',
    p_limit: 30
  });

  const { data: osanKeywords, error: oErr } = await supabase.rpc('get_available_keywords', {
    p_region: 'osan',
    p_limit: 50
  });

  // Fallback if RPC doesn't exist
  let giheungKW = giheungKeywords;
  let osanKW = osanKeywords;

  if (gErr || !giheungKW) {
    const { data } = await supabase
      .from('generator_keywords')
      .select('keyword, category')
      .eq('region', 'giheung')
      .order('priority', { ascending: false })
      .limit(30);
    giheungKW = data;
  }

  if (oErr || !osanKW) {
    const { data } = await supabase
      .from('generator_keywords')
      .select('keyword, category')
      .eq('region', 'osan')
      .order('priority', { ascending: false })
      .limit(50);
    osanKW = data;
  }

  const results: any = {};

  // Generate Giheung posts (28 more needed)
  if (giheungKW && giheungKW.length > 0) {
    results.giheung = await generateForRegion('giheung', giheungKW, 28);
  }

  // Generate Osan posts (50 needed)
  if (osanKW && osanKW.length > 0) {
    results.osan = await generateForRegion('osan', osanKW, 50);
  }

  // Summary
  console.log('\\n\\n📊 Generation Summary:');
  console.log('━'.repeat(50));
  for (const [region, result] of Object.entries(results)) {
    console.log(\`\${region}: ✓ \${result.success} success, ✗ \${result.failed} failed\`);
  }
  console.log('━'.repeat(50));

  const totalSuccess = Object.values(results).reduce((sum: number, r: any) => sum + r.success, 0);
  const totalFailed = Object.values(results).reduce((sum: number, r: any) => sum + r.failed, 0);
  console.log(\`Total: ✓ \${totalSuccess} success, ✗ \${totalFailed} failed\`);

  if (totalSuccess > 0) {
    console.log('\\n✅ Batch generation complete!');
  } else {
    console.log('\\n❌ No posts were generated successfully.');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('\\n❌ Fatal error:', error);
  process.exit(1);
});
