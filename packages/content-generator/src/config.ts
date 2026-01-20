import type { Region } from './types.js';

// Region configurations
export const REGIONS: Record<string, Region> = {
  bundang: {
    id: 'bundang',
    name: '분당',
    domain: 'bundanghipublic.com',
  },
  dongtan: {
    id: 'dongtan',
    name: '동탄',
    domain: 'dongtankaraoke.net',
  },
  ingedong: {
    id: 'ingedong',
    name: '인계동',
    domain: 'ingedongkaraoke.com',
  },
  jengja: {
    id: 'jengja',
    name: '정자',
    domain: 'jengjakaraoke.com',
  },
  suwon: {
    id: 'suwon',
    name: '수원',
    domain: 'suwon.vip',
  },
};

export const ALL_REGIONS = Object.keys(REGIONS);

// Content generation settings
export const CONTENT_CONFIG = {
  // Minimum content length (characters)
  minContentLength: 800,
  
  // Target content length
  targetContentLength: 1200,
  
  // Posts to generate per region per day
  defaultPostsPerRegion: 5,
  
  // Total daily posts (across all regions)
  dailyTotalPosts: 25,
  
  // Keyword cooldown period (days)
  keywordCooldownDays: 30,
  
  // Default author name
  defaultAuthor: '관리자',
};

// Qwen API settings
export const QWEN_CONFIG = {
  baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
  model: 'qwen-plus',
  maxTokens: 2000,
  temperature: 0.8,
};

// Environment variable names
export const ENV_KEYS = {
  SUPABASE_URL: 'SUPABASE_URL',
  SUPABASE_SERVICE_ROLE_KEY: 'SUPABASE_SERVICE_ROLE_KEY',
  QWEN_API_KEY: 'QWEN_API_KEY',
  VERCEL_DEPLOY_HOOK_URL: 'VERCEL_DEPLOY_HOOK_URL',
} as const;

// Validate environment variables
export function validateEnv(): void {
  const missing: string[] = [];
  
  if (!process.env[ENV_KEYS.SUPABASE_URL]) {
    missing.push(ENV_KEYS.SUPABASE_URL);
  }
  if (!process.env[ENV_KEYS.SUPABASE_SERVICE_ROLE_KEY]) {
    missing.push(ENV_KEYS.SUPABASE_SERVICE_ROLE_KEY);
  }
  if (!process.env[ENV_KEYS.QWEN_API_KEY]) {
    missing.push(ENV_KEYS.QWEN_API_KEY);
  }
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
