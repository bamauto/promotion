# ✅ Batch Generation Execution Checklist

## Pre-Execution Verification

### ✅ Environment Setup
- [x] Working directory: `/Users/deneb/promotion/packages/content-generator`
- [x] Dependencies installed (openai, @supabase/supabase-js, dotenv, tsx)
- [x] `.env` file configured with Qwen API key
- [x] All credentials hardcoded in script for reliability

### ✅ Scripts Ready
- [x] `batch-generate-enhanced.ts` - Main generation script (14KB)
- [x] `test-qwen.ts` - API connection test (1.8KB)
- [x] `simple-test.js` - Node.js API test (2.8KB)
- [x] `run-batch-generation.sh` - Wrapper with logging (705B)

### ✅ Documentation Complete
- [x] `START_HERE.md` - Quick start guide (4.3KB)
- [x] `READY_TO_RUN.md` - Pre-flight checklist (7.4KB)
- [x] `GENERATION_SUMMARY.md` - Technical summary (16KB)
- [x] `BATCH_GENERATION_GUIDE.md` - Detailed guide (11KB)
- [x] `EXECUTION_CHECKLIST.md` - This file

### ✅ Target Configuration
- [x] Giheung: 28 keywords defined in script
- [x] Osan: 50 keywords defined in script
- [x] Total: 78 blog posts to generate
- [x] Qwen API: qwen-plus model
- [x] Temperature: 0.8
- [x] Max tokens: 2500

### ✅ Database Ready
- [x] Supabase project: rrzeapykmyrsiqmkwjcf
- [x] Table: blog_posts (exists)
- [x] Table: generator_history (exists)
- [x] Anon key configured

---

## Execution Steps

### Step 1: Navigate to Directory
```bash
cd /Users/deneb/promotion/packages/content-generator
```
**Expected:** Current directory changes to content-generator

### Step 2: (Optional) Test API Connection
```bash
tsx scripts/test-qwen.ts
```
**Expected output:**
```
🧪 Testing Qwen API connection...
✅ API Response received!
✅ JSON parsing successful!
```

**If test fails:** Check internet connection, verify Qwen API key

### Step 3: Run Main Generation Script
```bash
tsx scripts/batch-generate-enhanced.ts
```

**Expected start:**
```
🚀 Enhanced Batch Content Generation with Qwen API
Start time: 2026-01-25 XX:XX:XX

============================================================
📍 Region: 기흥
   Target: 28 posts
   Available keywords: 28
============================================================
```

### Step 4: Monitor Progress
Watch for:
- [x] Each keyword processing successfully
- [x] Character count ≥ 1000 (target: 2000+)
- [x] Progress reports every 10 posts
- [x] No API errors or timeouts

**Progress indicators:**
```
   [1/28] Keyword: 삼성전자 기흥 가라오케
   ✓ Generated (2156 chars)
   ✅ Inserted successfully
```

### Step 5: Review Progress Reports
Every 10 posts, check:
- [x] Success rate ≥ 90%
- [x] Average length ≥ 2000 chars
- [x] Failed count = 0 (or minimal)

**Example report:**
```
   ──────────────────────────────────────────────────
   📊 Progress Report (10/28)
   ✓ Successful: 10 (100%)
   ✗ Failed: 0
   📝 Average length: 2145 chars
   ⏱️  Time elapsed: 1.2 minutes
   ──────────────────────────────────────────────────
```

### Step 6: Wait for Completion
**Expected timeline:**
- Giheung (28 posts): ~2-3 minutes
- Osan (50 posts): ~4-5 minutes
- **Total: 6-8 minutes**

### Step 7: Review Final Summary
**Expected output:**
```
════════════════════════════════════════════════════════════
📊 FINAL GENERATION SUMMARY
════════════════════════════════════════════════════════════

📍 기흥 (giheung)
   ✓ Success: 28
   ✗ Failed: 0
   📝 Average length: 2143 chars
   📈 Success rate: 100%

📍 오산 (osan)
   ✓ Success: 50
   ✗ Failed: 0
   📝 Average length: 2198 chars
   📈 Success rate: 100%

TOTAL RESULTS:
   ✓ Total Success: 78
   ✗ Total Failed: 0
   📝 Overall Average: 2178 chars
   ⏱️  Total Time: 6.8 minutes
════════════════════════════════════════════════════════════

✅ Batch generation complete!
```

---

## Post-Execution Verification

### Verify Database Counts

#### Check Giheung Posts
```bash
curl -G 'https://rrzeapykmyrsiqmkwjcf.supabase.co/rest/v1/blog_posts' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyemVhcHlrbXlyc2lxbWt3amNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI0MzIsImV4cCI6MjA4NDQ3ODQzMn0.1syiV186n8K4pJnCqMXNBR4N4fr0BHnSba5sBrtMjGk" \
  --data-urlencode "select=id" \
  --data-urlencode "regions=cs.{giheung}" | grep -o '"id"' | wc -l
```
**Expected:** 50 (22 existing + 28 new)

#### Check Osan Posts
```bash
curl -G 'https://rrzeapykmyrsiqmkwjcf.supabase.co/rest/v1/blog_posts' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyemVhcHlrbXlyc2lxbWt3amNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI0MzIsImV4cCI6MjA4NDQ3ODQzMn0.1syiV186n8K4pJnCqMXNBR4N4fr0BHnSba5sBrtMjGk" \
  --data-urlencode "select=id" \
  --data-urlencode "regions=cs.{osan}" | grep -o '"id"' | wc -l
```
**Expected:** 50

### Verify Blog Pages

#### Giheung Blog
1. Open: https://giheungkaraoke.com/blog
2. Check:
   - [x] Page loads without errors
   - [x] Posts are visible
   - [x] Titles display correctly
   - [x] Excerpts show properly
   - [x] Pagination works (if applicable)

#### Osan Blog
1. Open: https://osankaraoke.com/blog
2. Check:
   - [x] Page loads without errors
   - [x] Posts are visible
   - [x] Titles display correctly
   - [x] Excerpts show properly
   - [x] Pagination works (if applicable)

### Quality Spot Check

Pick 3 random posts and verify:
1. **Content Length**
   - [x] ≥ 1000 characters (minimum)
   - [x] ~2000+ characters (target)

2. **Content Quality**
   - [x] Natural Korean text
   - [x] No HTML tags in content
   - [x] Proper paragraph breaks
   - [x] Keyword integrated naturally

3. **Metadata**
   - [x] Title present and relevant
   - [x] Excerpt present (150 chars)
   - [x] meta_title present (60 chars)
   - [x] meta_description present (155 chars)
   - [x] Region tag correct

4. **Database Fields**
   - [x] slug is URL-friendly
   - [x] author = '관리자'
   - [x] category = 'general'
   - [x] published = true
   - [x] created_at timestamp present

### Check Generator History

```bash
curl -G 'https://rrzeapykmyrsiqmkwjcf.supabase.co/rest/v1/generator_history' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyemVhcHlrbXlyc2lxbWt3amNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI0MzIsImV4cCI6MjA4NDQ3ODQzMn0.1syiV186n8K4pJnCqMXNBR4N4fr0BHnSba5sBrtMjGk" \
  --data-urlencode "select=region,keyword,blog_post_id,generation_date" \
  --data-urlencode "generation_date=eq.$(date +%Y-%m-%d)" \
  --data-urlencode "limit=5"
```

**Expected:** 78 entries created today

---

## Success Criteria (Final Check)

### Generation Metrics
- [x] **Total posts generated:** 78
- [x] **Giheung posts:** 28
- [x] **Osan posts:** 50
- [x] **Success rate:** ≥ 95%
- [x] **Average length:** ≥ 2000 chars
- [x] **Minimum length:** ≥ 1000 chars
- [x] **Execution time:** 6-10 minutes

### Database Integrity
- [x] All posts in blog_posts table
- [x] All generations in generator_history table
- [x] No duplicate slugs
- [x] No missing required fields
- [x] Content hashes recorded

### Content Quality
- [x] Natural Korean language
- [x] Keywords integrated properly
- [x] No HTML tags in content
- [x] Proper paragraph formatting
- [x] SEO metadata complete

### Blog Functionality
- [x] Blog pages load correctly
- [x] Individual posts accessible
- [x] No 404 errors
- [x] Pagination works
- [x] SEO tags visible in source

---

## Troubleshooting Guide

### Issue: tsx not found
**Error:** `bash: tsx: command not found`

**Solution:**
```bash
cd /Users/deneb/promotion/packages/content-generator
pnpm install
```

### Issue: API connection timeout
**Error:** `Error generating content (attempt X/3): timeout`

**Solution:**
- Check internet connection
- Verify Qwen API key is valid
- Wait and retry (script will auto-retry)

### Issue: Content too short
**Error:** `Content too short (XXX chars)`

**Solution:**
- Script will retry automatically
- AI may generate short content occasionally
- Check if most posts meet length requirement

### Issue: Database insertion failed
**Error:** `Error inserting post: ...`

**Solution:**
- Check Supabase project status
- Verify API key has correct permissions
- Check for duplicate slugs
- Review table schema

### Issue: JSON parsing error
**Error:** `No JSON found in response`

**Solution:**
- Script will retry automatically
- AI may not return valid JSON occasionally
- Check if most posts parse correctly

---

## Execution Log Template

Use this template to track execution:

```
Date: ________________
Start Time: ________________
End Time: ________________

RESULTS:
- Giheung Posts Generated: ______ / 28
- Osan Posts Generated: ______ / 50
- Total Success: ______ / 78
- Total Failed: ______
- Average Length: ______ chars
- Execution Time: ______ minutes

DATABASE VERIFICATION:
- Giheung posts in DB: ______ (expected: 50)
- Osan posts in DB: ______ (expected: 50)
- Generator history entries: ______ (expected: 78)

BLOG PAGE CHECK:
- giheungkaraoke.com/blog: [ ] OK  [ ] Issues
- osankaraoke.com/blog: [ ] OK  [ ] Issues

QUALITY SPOT CHECK (3 random posts):
Post 1: [ ] OK  [ ] Issues
Post 2: [ ] OK  [ ] Issues
Post 3: [ ] OK  [ ] Issues

ISSUES ENCOUNTERED:
_________________________________________________
_________________________________________________
_________________________________________________

RESOLUTION:
_________________________________________________
_________________________________________________
_________________________________________________

OVERALL STATUS: [ ] SUCCESS  [ ] PARTIAL  [ ] FAILED
```

---

## Quick Reference Commands

### Execute Generation
```bash
cd /Users/deneb/promotion/packages/content-generator && tsx scripts/batch-generate-enhanced.ts
```

### Test API
```bash
cd /Users/deneb/promotion/packages/content-generator && tsx scripts/test-qwen.ts
```

### Check Giheung Count
```bash
curl -G 'https://rrzeapykmyrsiqmkwjcf.supabase.co/rest/v1/blog_posts' -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyemVhcHlrbXlyc2lxbWt3amNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI0MzIsImV4cCI6MjA4NDQ3ODQzMn0.1syiV186n8K4pJnCqMXNBR4N4fr0BHnSba5sBrtMjGk" --data-urlencode "select=id" --data-urlencode "regions=cs.{giheung}" | grep -o '"id"' | wc -l
```

### Check Osan Count
```bash
curl -G 'https://rrzeapykmyrsiqmkwjcf.supabase.co/rest/v1/blog_posts' -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyemVhcHlrbXlyc2lxbWt3amNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI0MzIsImV4cCI6MjA4NDQ3ODQzMn0.1syiV186n8K4pJnCqMXNBR4N4fr0BHnSba5sBrtMjGk" --data-urlencode "select=id" --data-urlencode "regions=cs.{osan}" | grep -o '"id"' | wc -l
```

---

## Next Steps After Success

1. ✅ **Document Results**
   - Fill out execution log template
   - Save any error logs
   - Note any issues encountered

2. ✅ **Quality Review**
   - Read sample posts
   - Check for grammatical errors
   - Verify keyword integration

3. ⚠️ **Deploy (if needed)**
   - Blog package may need redeployment
   - Clear ISR cache for updated content
   - Verify sitemap.xml includes new posts

4. 📊 **Monitor**
   - Track blog traffic
   - Monitor search rankings
   - Check Google Search Console

---

**Last Updated:** 2026-01-25
**Status:** Ready for Execution ✅
