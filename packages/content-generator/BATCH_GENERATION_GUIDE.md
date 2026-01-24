# Batch Blog Post Generation Guide

## Overview

This guide explains how to generate the remaining 78 blog posts for Giheung and Osan using the Qwen API.

### Target Posts
- **Giheung**: 28 posts (to reach 50 total)
- **Osan**: 50 posts (starting from 0)
- **Total**: 78 posts

## Prerequisites

All dependencies are already installed in `/Users/deneb/promotion/packages/content-generator`:
- ✅ Node.js and pnpm
- ✅ TypeScript and tsx
- ✅ OpenAI SDK (for Qwen API)
- ✅ Supabase client
- ✅ dotenv for environment variables

## Configuration

All credentials are already configured in `.env`:
- **Qwen API Key**: `sk-8abac8d439654955b2c05fa9e1b2e891`
- **Supabase URL**: `https://rrzeapykmyrsiqmkwjcf.supabase.co`
- **Supabase Anon Key**: `eyJhbG...` (configured in script)

## Available Scripts

### 1. Test Qwen API Connection (Optional)
```bash
cd /Users/deneb/promotion/packages/content-generator
tsx scripts/test-qwen.ts
```

This will test the Qwen API connection and verify JSON parsing works correctly.

### 2. Run Enhanced Batch Generation (Main Script)
```bash
cd /Users/deneb/promotion/packages/content-generator
tsx scripts/batch-generate-enhanced.ts
```

Or use the wrapper script:
```bash
cd /Users/deneb/promotion/packages/content-generator
./run-batch-generation.sh
```

## What the Script Does

### For Each Post:
1. **Generates content** using Qwen API with region-specific prompts
2. **Validates** content length (minimum 1000 chars, target 2000+)
3. **Parses** JSON response from Qwen
4. **Inserts** into `blog_posts` table
5. **Records** in `generator_history` table with content hash
6. **Waits** 2 seconds between requests (rate limiting)

### Progress Reporting:
- Real-time progress for each post
- Progress report every 10 posts showing:
  - Success/failure count
  - Average content length
  - Success rate percentage
  - Time elapsed

### Final Summary:
- Total posts generated per region
- Average content length per region
- Overall success rate
- Quality metrics (min/max/average length)
- Total execution time

## Keywords Used

### Giheung (28 keywords):
```
삼성전자 기흥 가라오케, 보정동 하이퍼블릭, 기흥 하이퍼블릭 정보, 기흥 주말 유흥,
기흥 직장인 가라오케, 기흥 하이퍼블릭 가격, 기흥 회식 장소, 죽전역 근처 가라오케,
상현역 가라오케, 기흥 가라오케 위치, 기흥 회식 2차, 기흥 셔츠룸 가격,
기흥 셔츠룸 위치, 기흥 하이퍼블릭 이용방법, 기흥 가라오케 이용료, 기흥 룸살롱 가격,
기흥 단체 예약, 기흥 평일 가라오케, 기흥 가라오케 추천, 기흥 셔츠룸 후기,
기흥IC 유흥, 신갈동 가라오케, 기흥 룸살롱 예약, 기흥 하이퍼블릭 추천,
기흥 가라오케 예약, 기흥 하이퍼블릭 시스템 설명, 기흥 가라오케 가격, 기흥역 가라오케
```

### Osan (50 keywords):
```
오산 가라오케, 오산 하이퍼블릭, 오산 셔츠룸, 오산 룸살롱, 오산역 가라오케,
오산 유흥, 오산 노래방, 오산시 가라오케, 오산 접대, 오산 2차,
오산 회식, 오산 단체, 오산 예약, 오산 밤문화, 오산 나이트,
오산 가라오케 가격, 오산 하이퍼블릭 가격, 오산 셔츠룸 가격, 오산 룸살롑 가격, 오산 가라오케 위치,
오산 하이퍼블릭 위치, 오산 셔츠룸 위치, 오산 룸살롱 위치, 오산 가라오케 추천, 오산 하이퍼블릭 추천,
오산 셔츠룸 추천, 오산 룸살롱 추천, 오산 가라오케 후기, 오산 하이퍼블릭 후기, 오산 셔츠룸 후기,
오산 가라오케 시스템, 오산 하이퍼블릭 시스템, 오산 가라오케 이용방법, 오산 하이퍼블릭 이용방법, 오산 평일 가라오케,
오산 주말 가라오케, 오산 직장인 가라오케, 오산 회식 장소, 오산 접대 장소, 오산 2차 장소,
오산역 근처 가라오케, 오산 가라오케 예약방법, 오산 단체 예약, 오산 가라오케 정보, 오산 유흥 정보,
오산 나이트 문화, 오산 엔터테인먼트, 오산 가라오케 안내, 오산 하이퍼블릭 안내, 오산 가라오케 이용료
```

## Expected Execution Time

- **Per post**: ~4-6 seconds (2s API call + 2s rate limit wait)
- **Giheung (28 posts)**: ~2-3 minutes
- **Osan (50 posts)**: ~4-5 minutes
- **Total**: ~6-8 minutes

## Output Example

```
🚀 Enhanced Batch Content Generation with Qwen API

Start time: 2026-01-25 ...

============================================================
📍 Region: 기흥
   Target: 28 posts
   Available keywords: 28
============================================================

   [1/28] Keyword: 삼성전자 기흥 가라오케
   ✓ Generated (2156 chars)
   ✅ Inserted successfully

   [2/28] Keyword: 보정동 하이퍼블릭
   ✓ Generated (2234 chars)
   ✅ Inserted successfully

   ...

   ──────────────────────────────────────────────────
   📊 Progress Report (10/28)
   ✓ Successful: 10 (100%)
   ✗ Failed: 0
   📝 Average length: 2145 chars
   ⏱️  Time elapsed: 1.2 minutes
   ──────────────────────────────────────────────────

   ...

============================================================
📍 Region: 오산
   Target: 50 posts
   Available keywords: 50
============================================================

   ...

════════════════════════════════════════════════════════════
📊 FINAL GENERATION SUMMARY
════════════════════════════════════════════════════════════

📍 기흥 (giheung)
   ✓ Success: 28
   ✗ Failed: 0
   📝 Average length: 2143 chars
   📈 Success rate: 100%
   Total chars: 60,004

📍 오산 (osan)
   ✓ Success: 50
   ✗ Failed: 0
   📝 Average length: 2198 chars
   📈 Success rate: 100%
   Total chars: 109,900

────────────────────────────────────────────────────────────
TOTAL RESULTS:
   ✓ Total Success: 78
   ✗ Total Failed: 0
   📝 Overall Average: 2178 chars
   ⏱️  Total Time: 6.8 minutes
   📈 Overall Success Rate: 100%
════════════════════════════════════════════════════════════

📋 QUALITY REPORT:
────────────────────────────────────────────────────────────

기흥:
   Minimum length: 1876 chars
   Maximum length: 2456 chars
   Posts under 1500 chars: 0
   Posts over 2000 chars: 26

오산:
   Minimum length: 1923 chars
   Maximum length: 2534 chars
   Posts under 1500 chars: 0
   Posts over 2000 chars: 48

════════════════════════════════════════════════════════════
End time: 2026-01-25 ...
════════════════════════════════════════════════════════════

✅ Batch generation complete!

💡 Next steps:
   1. Verify posts at: https://rrzeapykmyrsiqmkwjcf.supabase.co
   2. Check blog pages: https://giheungkaraoke.com/blog
   3. Check blog pages: https://osankaraoke.com/blog
```

## Error Handling

The script includes:
- **Retry logic**: Up to 2 retries per failed generation
- **Validation**: Minimum 1000 characters per post
- **JSON parsing**: Extracts JSON from Qwen response
- **Database error handling**: Logs insertion failures
- **Rate limiting**: 2-second wait between requests to avoid API limits

## Verification

After generation completes, verify:

1. **Database check**:
```bash
# Check post counts
curl -G 'https://rrzeapykmyrsiqmkwjcf.supabase.co/rest/v1/blog_posts' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  --data-urlencode "select=count" \
  --data-urlencode "regions=cs.{giheung}"
```

2. **Blog pages**:
- Visit: https://giheungkaraoke.com/blog
- Visit: https://osankaraoke.com/blog

3. **Generator history**:
```bash
curl -G 'https://rrzeapykmyrsiqmkwjcf.supabase.co/rest/v1/generator_history' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  --data-urlencode "select=region,keyword,generation_date" \
  --data-urlencode "order=generation_date.desc" \
  --data-urlencode "limit=10"
```

## Troubleshooting

### Issue: "No content generated"
- **Cause**: Qwen API timeout or rate limit
- **Solution**: Script will retry automatically (up to 2 times)

### Issue: "Content too short"
- **Cause**: Qwen didn't generate enough content
- **Solution**: Script will retry with same prompt

### Issue: "Error inserting post"
- **Cause**: Database connection or duplicate slug
- **Solution**: Check Supabase logs, script continues with next post

### Issue: API rate limit exceeded
- **Cause**: Too many requests to Qwen API
- **Solution**: Script has 2-second delay between requests

## Manual Run Instructions

To run the batch generation manually:

```bash
# Step 1: Navigate to content-generator directory
cd /Users/deneb/promotion/packages/content-generator

# Step 2: Verify environment
cat .env  # Should show Qwen API key

# Step 3: Test API connection (optional)
tsx scripts/test-qwen.ts

# Step 4: Run batch generation
tsx scripts/batch-generate-enhanced.ts

# Or use the wrapper script
./run-batch-generation.sh
```

## Files Created

### Scripts:
- ✅ `scripts/batch-generate-enhanced.ts` - Main generation script with progress reporting
- ✅ `scripts/test-qwen.ts` - API connection test
- ✅ `run-batch-generation.sh` - Bash wrapper for logging

### Documentation:
- ✅ `BATCH_GENERATION_GUIDE.md` - This file

## Success Criteria

- ✅ Minimum 1000 characters per post (target: 2000+)
- ✅ All 78 posts generated (28 Giheung + 50 Osan)
- ✅ No duplicate content (verified by MD5 hash)
- ✅ All posts inserted into blog_posts table
- ✅ All generations tracked in generator_history table
- ✅ Progress updates every 10 posts
- ✅ Detailed quality report at completion

## Next Steps After Completion

1. ✅ Verify all posts in Supabase dashboard
2. ✅ Check blog page renders correctly
3. ✅ Verify sitemap.xml includes new posts
4. ✅ Test a few blog posts for quality
5. ✅ Check SEO metadata (title, description)
6. ⚠️ Consider deploying blog to trigger ISR refresh
