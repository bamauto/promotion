/**
 * Slug generation utilities for Korean text
 */

// Korean consonant/vowel romanization map (simplified)
const KOREAN_ROMANIZATION: Record<string, string> = {
  // 초성
  'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt',
  'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's',
  'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch',
  'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
  // 중성
  'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo',
  'ㅔ': 'e', 'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa',
  'ㅙ': 'wae', 'ㅚ': 'oe', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo',
  'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅢ': 'ui',
  'ㅣ': 'i',
  // 종성
  'ㄱ종': 'k', 'ㄲ종': 'k', 'ㄳ종': 'k', 'ㄴ종': 'n', 'ㄵ종': 'n',
  'ㄶ종': 'n', 'ㄷ종': 't', 'ㄹ종': 'l', 'ㄺ종': 'k', 'ㄻ종': 'm',
  'ㄼ종': 'p', 'ㄽ종': 'l', 'ㄾ종': 'l', 'ㄿ종': 'p', 'ㅀ종': 'l',
  'ㅁ종': 'm', 'ㅂ종': 'p', 'ㅄ종': 'p', 'ㅅ종': 't', 'ㅆ종': 't',
  'ㅇ종': 'ng', 'ㅈ종': 't', 'ㅊ종': 't', 'ㅋ종': 'k', 'ㅌ종': 't',
  'ㅍ종': 'p', 'ㅎ종': 't',
};

const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

/**
 * Romanize a single Korean character
 */
function romanizeChar(char: string): string {
  const code = char.charCodeAt(0);
  
  // Check if it's a Korean syllable (Hangul Syllables block: U+AC00 to U+D7A3)
  if (code >= 0xAC00 && code <= 0xD7A3) {
    const syllableIndex = code - 0xAC00;
    const choIndex = Math.floor(syllableIndex / (21 * 28));
    const jungIndex = Math.floor((syllableIndex % (21 * 28)) / 28);
    const jongIndex = syllableIndex % 28;
    
    const cho = CHO[choIndex];
    const jung = JUNG[jungIndex];
    const jong = JONG[jongIndex];
    
    let result = KOREAN_ROMANIZATION[cho] || '';
    result += KOREAN_ROMANIZATION[jung] || '';
    if (jong) {
      result += KOREAN_ROMANIZATION[jong + '종'] || '';
    }
    
    return result;
  }
  
  return char;
}

/**
 * Romanize Korean text
 */
export function romanize(text: string): string {
  return text.split('').map(romanizeChar).join('');
}

/**
 * Generate a URL-safe slug from text
 */
export function generateSlug(text: string, maxLength = 80): string {
  let slug = text
    .toLowerCase()
    .trim();
  
  // Romanize Korean characters
  slug = romanize(slug);
  
  // Replace spaces and special characters with hyphens
  slug = slug
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Truncate to max length
  if (slug.length > maxLength) {
    slug = slug.substring(0, maxLength).replace(/-+$/, '');
  }
  
  // Add timestamp for uniqueness
  const timestamp = Date.now().toString(36);
  
  return `${slug}-${timestamp}`;
}

/**
 * Generate a simple unique ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}
