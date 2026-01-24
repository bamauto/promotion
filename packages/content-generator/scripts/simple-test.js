#!/usr/bin/env node
/**
 * Simple test script to verify Qwen API works
 * Run with: node scripts/simple-test.js
 */

const https = require('https');

const QWEN_API_KEY = 'sk-8abac8d439654955b2c05fa9e1b2e891';

const requestData = JSON.stringify({
  model: 'qwen-plus',
  messages: [
    {
      role: 'system',
      content: '당신은 기흥 지역 가라오케 블로그 작가입니다. 간단한 JSON 형식으로 응답하세요.'
    },
    {
      role: 'user',
      content: '키워드: 기흥 가라오케 테스트\n\nJSON 형식으로 간단한 블로그 글을 작성해주세요. 형식: {"title": "제목", "content": "내용 (최소 100자)"}'
    }
  ],
  temperature: 0.8,
  max_tokens: 500
});

const options = {
  hostname: 'dashscope-intl.aliyuncs.com',
  port: 443,
  path: '/compatible-mode/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${QWEN_API_KEY}`,
    'Content-Length': Buffer.byteLength(requestData)
  }
};

console.log('🧪 Testing Qwen API connection...\n');
console.log('Request URL:', `https://${options.hostname}${options.path}`);
console.log('Model: qwen-plus\n');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('─'.repeat(60));

    if (res.statusCode === 200) {
      try {
        const response = JSON.parse(data);
        const content = response.choices[0]?.message?.content;

        console.log('✅ API Response received!\n');
        console.log('Response content:');
        console.log('─'.repeat(60));
        console.log(content);
        console.log('─'.repeat(60));

        // Try to parse JSON from content
        const jsonMatch = content?.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          console.log('\n✅ JSON parsing successful!\n');
          console.log('Parsed data:');
          console.log('  Title:', parsed.title);
          console.log('  Content:', parsed.content?.substring(0, 100) + '...');
          console.log('  Content length:', parsed.content?.length || 0, 'chars');
          console.log('\n✅ Test passed! Qwen API is working correctly.');
        } else {
          console.log('\n⚠️  No JSON found in response, but API is responding');
        }
      } catch (error) {
        console.error('\n❌ Error parsing response:', error.message);
        console.log('\nRaw response:', data);
      }
    } else {
      console.error('\n❌ API Error (Status', res.statusCode, ')');
      console.log('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
  process.exit(1);
});

req.write(requestData);
req.end();
