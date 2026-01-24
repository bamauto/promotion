#!/usr/bin/env tsx
/**
 * Test Qwen API connection and content generation
 */

import { config } from 'dotenv';
import OpenAI from 'openai';

config();

const QWEN_API_KEY = 'sk-8abac8d439654955b2c05fa9e1b2e891';

const qwen = new OpenAI({
  apiKey: QWEN_API_KEY,
  baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
});

async function testQwen() {
  console.log('🧪 Testing Qwen API connection...\n');

  try {
    const response = await qwen.chat.completions.create({
      model: 'qwen-plus',
      messages: [
        {
          role: 'system',
          content: '당신은 기흥 지역 가라오케 블로그 작가입니다. JSON 형식으로 응답하세요.'
        },
        {
          role: 'user',
          content: '키워드: 기흥 가라오케\n\n간단한 테스트 블로그 글을 JSON 형식으로 작성해주세요. 형식: {"title": "...", "content": "..."}'
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;

    console.log('✅ API Response received!');
    console.log('\nResponse content:');
    console.log('─'.repeat(60));
    console.log(content);
    console.log('─'.repeat(60));

    // Try to parse JSON
    const jsonMatch = content?.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      console.log('\n✅ JSON parsing successful!');
      console.log('\nParsed data:');
      console.log('  Title:', parsed.title);
      console.log('  Content length:', parsed.content?.length || 0, 'chars');
    } else {
      console.log('\n❌ No JSON found in response');
    }

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

testQwen();
