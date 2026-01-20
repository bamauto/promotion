import { ALL_REGIONS, CONTENT_CONFIG, REGIONS } from '../config.js';
import { generateContent } from './qwen.js';
import { getAvailableKeywords, markKeywordUsed, isContentDuplicate } from './keyword.js';
import { getRandomImage, incrementImageUsage, getDefaultImage } from './image.js';
import { publishPost, startRun, completeRun, triggerDeploy } from './publisher.js';
import { generateSlug, hashContent } from '../utils/index.js';
import type { GenerateOptions, GenerateResult, Keyword } from '../types.js';

/**
 * Generate a single blog post for a region and keyword
 */
async function generateSinglePost(
  region: string,
  keyword: Keyword,
  dryRun: boolean
): Promise<GenerateResult> {
  const regionInfo = REGIONS[region];
  
  try {
    console.log(`  Generating content for "${keyword.keyword}"...`);
    
    // Generate content using Qwen
    const content = await generateContent(region, keyword.keyword);
    
    // Check for duplicates
    const contentHash = hashContent(content.content);
    if (await isContentDuplicate(contentHash)) {
      console.log(`  ⚠️ Duplicate content detected, skipping`);
      return {
        success: false,
        region,
        keyword: keyword.keyword,
        error: 'Duplicate content',
      };
    }
    
    // Get a random image
    const image = await getRandomImage();
    const imageUrl = image?.url || getDefaultImage();
    
    // Generate slug
    const slug = generateSlug(content.title);
    
    // Dry run - don't actually save
    if (dryRun) {
      console.log(`  [DRY RUN] Would publish: "${content.title}"`);
      console.log(`    - Slug: ${slug}`);
      console.log(`    - Content length: ${content.content.length} chars`);
      console.log(`    - Image: ${imageUrl}`);
      
      return {
        success: true,
        region,
        keyword: keyword.keyword,
      };
    }
    
    // Publish the post
    const postId = await publishPost({
      region,
      title: content.title,
      slug,
      content: content.content,
      excerpt: content.excerpt,
      featured_image: imageUrl,
      meta_title: content.meta_title,
      meta_description: content.meta_description,
      author: CONTENT_CONFIG.defaultAuthor,
      status: 'published',
      published_at: new Date().toISOString(),
    });
    
    // Mark keyword as used
    await markKeywordUsed(
      keyword.id,
      region,
      keyword.keyword,
      postId,
      contentHash
    );
    
    // Increment image usage
    if (image) {
      await incrementImageUsage(image.id);
    }
    
    console.log(`  ✅ Published: "${content.title}" (${postId})`);
    
    return {
      success: true,
      region,
      keyword: keyword.keyword,
      postId,
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.error(`  ❌ Failed: ${error}`);
    
    return {
      success: false,
      region,
      keyword: keyword.keyword,
      error,
    };
  }
}

/**
 * Generate posts for a single region
 */
export async function generateForRegion(
  options: GenerateOptions
): Promise<GenerateResult[]> {
  const { region, count, dryRun = false } = options;
  const results: GenerateResult[] = [];
  
  console.log(`\n📍 Region: ${REGIONS[region]?.name || region}`);
  console.log(`   Target: ${count} posts`);
  
  // Start a run record (unless dry run)
  let runId: string | null = null;
  if (!dryRun) {
    runId = await startRun(region);
  }
  
  try {
    // Get available keywords
    const keywords = await getAvailableKeywords(region, count);
    
    if (keywords.length === 0) {
      console.log('   ⚠️ No available keywords');
      return results;
    }
    
    console.log(`   Found ${keywords.length} available keywords`);
    
    // Generate posts sequentially to avoid rate limits
    for (const keyword of keywords) {
      const result = await generateSinglePost(region, keyword, dryRun);
      results.push(result);
      
      // Small delay between generations to avoid rate limits
      if (!dryRun) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Update run record
    if (runId) {
      const successCount = results.filter(r => r.success).length;
      const failCount = results.filter(r => !r.success).length;
      const errors = results
        .filter(r => r.error)
        .map(r => `${r.keyword}: ${r.error}`);
      
      await completeRun(runId, successCount, failCount, errors);
    }
    
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.error(`   ❌ Region failed: ${error}`);
    
    if (runId) {
      await completeRun(runId, 0, 1, [error]);
    }
  }
  
  return results;
}

/**
 * Generate posts for all regions
 */
export async function generateForAllRegions(
  count: number = CONTENT_CONFIG.defaultPostsPerRegion,
  dryRun: boolean = false
): Promise<Map<string, GenerateResult[]>> {
  const allResults = new Map<string, GenerateResult[]>();
  
  console.log('🚀 Starting content generation for all regions');
  console.log(`   Posts per region: ${count}`);
  console.log(`   Dry run: ${dryRun}`);
  
  for (const region of ALL_REGIONS) {
    const results = await generateForRegion({ region, count, dryRun });
    allResults.set(region, results);
  }
  
  // Print summary
  console.log('\n📊 Summary:');
  let totalSuccess = 0;
  let totalFailed = 0;
  
  for (const [region, results] of allResults) {
    const success = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    totalSuccess += success;
    totalFailed += failed;
    console.log(`   ${REGIONS[region]?.name}: ${success} success, ${failed} failed`);
  }
  
  console.log(`\n   Total: ${totalSuccess} success, ${totalFailed} failed`);
  
  // Trigger deploy if any posts were created
  if (!dryRun && totalSuccess > 0) {
    console.log('\n🔄 Triggering deploy...');
    await triggerDeploy();
  }
  
  return allResults;
}
