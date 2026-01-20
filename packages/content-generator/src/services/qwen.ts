import OpenAI from 'openai';
import { QWEN_CONFIG, CONTENT_CONFIG, REGIONS } from '../config.js';
import { getSystemPrompt, getUserPrompt } from '../templates/index.js';
import type { GeneratedContent } from '../types.js';

let qwenClient: OpenAI | null = null;

/**
 * Get or create Qwen client instance
 */
function getClient(): OpenAI {
  if (!qwenClient) {
    const apiKey = process.env.QWEN_API_KEY;
    if (!apiKey) {
      throw new Error('QWEN_API_KEY is not set');
    }
    
    qwenClient = new OpenAI({
      apiKey,
      baseURL: QWEN_CONFIG.baseURL,
    });
  }
  
  return qwenClient;
}

/**
 * Generate blog content using Qwen AI
 */
export async function generateContent(
  region: string,
  keyword: string
): Promise<GeneratedContent> {
  const client = getClient();
  const regionInfo = REGIONS[region];
  
  if (!regionInfo) {
    throw new Error(`Unknown region: ${region}`);
  }
  
  // 템플릿에서 프롬프트 가져오기 (수정 가능: src/templates/prompts.ts)
  const systemPrompt = getSystemPrompt(regionInfo);
  const userPrompt = getUserPrompt(regionInfo, keyword);

  const response = await client.chat.completions.create({
    model: QWEN_CONFIG.model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: QWEN_CONFIG.maxTokens,
    temperature: QWEN_CONFIG.temperature,
  });

  const responseText = response.choices[0]?.message?.content;
  
  if (!responseText) {
    throw new Error('No response from Qwen API');
  }

  // Parse JSON response
  let parsed: GeneratedContent;
  try {
    // Try to extract JSON from response (handle markdown code blocks)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    parsed = JSON.parse(jsonMatch[0]);
  } catch (e) {
    throw new Error(`Failed to parse Qwen response: ${e}`);
  }

  // Validate content length
  if (parsed.content.length < CONTENT_CONFIG.minContentLength) {
    console.warn(`Content too short (${parsed.content.length} chars), regenerating...`);
    // Could retry here, but for now just warn
  }

  return {
    title: parsed.title || `${regionInfo.name} ${keyword}`,
    content: parsed.content,
    excerpt: parsed.excerpt || parsed.content.substring(0, 150) + '...',
    meta_title: parsed.meta_title || parsed.title,
    meta_description: parsed.meta_description || parsed.excerpt,
  };
}

/**
 * Test Qwen API connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const client = getClient();
    const response = await client.chat.completions.create({
      model: QWEN_CONFIG.model,
      messages: [{ role: 'user', content: '안녕하세요' }],
      max_tokens: 10,
    });
    return !!response.choices[0]?.message?.content;
  } catch (e) {
    console.error('Qwen API connection test failed:', e);
    return false;
  }
}
