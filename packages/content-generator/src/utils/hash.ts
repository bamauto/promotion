import { createHash } from 'crypto';

/**
 * Generate a SHA-256 hash of the content
 * Used for duplicate detection
 */
export function hashContent(content: string): string {
  return createHash('sha256')
    .update(content)
    .digest('hex')
    .substring(0, 32); // Use first 32 characters
}

/**
 * Check if two contents are similar enough to be considered duplicates
 * Uses simple character overlap ratio
 */
export function isSimilarContent(content1: string, content2: string, threshold = 0.8): boolean {
  const words1 = new Set(content1.toLowerCase().split(/\s+/));
  const words2 = new Set(content2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  const similarity = intersection.size / union.size;
  
  return similarity >= threshold;
}
