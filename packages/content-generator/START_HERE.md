# 🚀 START HERE - Blog Post Generation

## Quick Execute (Single Command)

```bash
cd /Users/deneb/promotion/packages/content-generator && tsx scripts/batch-generate-enhanced.ts
```

**This will generate 78 blog posts in 6-8 minutes.**

---

## What This Does

Generates blog posts using Qwen AI:
- **28 posts** for Giheung (기흥)
- **50 posts** for Osan (오산)
- **78 total posts**

---

## Pre-Flight Check

Everything is already configured:
- ✅ Qwen API Key configured
- ✅ Supabase credentials set
- ✅ All 78 keywords defined
- ✅ Dependencies installed
- ✅ Scripts ready to run

---

## Execution Options

### Option 1: Direct Run (Fastest)
```bash
cd /Users/deneb/promotion/packages/content-generator
tsx scripts/batch-generate-enhanced.ts
```

### Option 2: Test First (Recommended)
```bash
cd /Users/deneb/promotion/packages/content-generator

# Test API connection
tsx scripts/test-qwen.ts

# If test passes, run generation
tsx scripts/batch-generate-enhanced.ts
```

### Option 3: With Logging
```bash
cd /Users/deneb/promotion/packages/content-generator
./run-batch-generation.sh
# Creates log file: batch-generation-YYYYMMDD-HHMMSS.log
```

---

## What to Expect

### Timeline
- Giheung: 28 posts in ~2-3 minutes
- Osan: 50 posts in ~4-5 minutes
- **Total: 6-8 minutes**

### Output
You'll see real-time progress like this:
```
📍 Region: 기흥
   [1/28] Keyword: 삼성전자 기흥 가라오케
   ✓ Generated (2156 chars)
   ✅ Inserted successfully

   [2/28] Keyword: 보정동 하이퍼블릭
   ✓ Generated (2234 chars)
   ✅ Inserted successfully

   ... (continues)

   📊 Progress Report (10/28)
   ✓ Successful: 10 (100%)
   📝 Average length: 2145 chars
   ⏱️  Time elapsed: 1.2 minutes
```

### Final Summary
```
═══════════════════════════════════════════════
📊 FINAL GENERATION SUMMARY
═══════════════════════════════════════════════

📍 기흥: ✓ 28 success (Avg: 2143 chars)
📍 오산: ✓ 50 success (Avg: 2198 chars)

TOTAL: ✓ 78 success | ⏱️ 6.8 minutes
═══════════════════════════════════════════════
```

---

## After Completion

### 1. Verify in Database
```bash
# Check Giheung posts (should be 50 total: 22 existing + 28 new)
curl -G 'https://rrzeapykmyrsiqmkwjcf.supabase.co/rest/v1/blog_posts' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyemVhcHlrbXlyc2lxbWt3amNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI0MzIsImV4cCI6MjA4NDQ3ODQzMn0.1syiV186n8K4pJnCqMXNBR4N4fr0BHnSba5sBrtMjGk" \
  --data-urlencode "select=count" \
  --data-urlencode "regions=cs.{giheung}"
```

### 2. Check Blog Pages
- Giheung: https://giheungkaraoke.com/blog
- Osan: https://osankaraoke.com/blog

---

## Documentation

More detailed information available in:

| File | Purpose |
|------|---------|
| `START_HERE.md` | This file - quickest path to execution |
| `READY_TO_RUN.md` | Pre-flight checklist and execution guide |
| `GENERATION_SUMMARY.md` | Complete technical summary |
| `BATCH_GENERATION_GUIDE.md` | Detailed implementation guide |

---

## Troubleshooting

### Script won't run?
```bash
# Make sure you're in the right directory
cd /Users/deneb/promotion/packages/content-generator

# Check if tsx is available
which tsx

# If not found, install dependencies
pnpm install
```

### Want to test API first?
```bash
# TypeScript test
tsx scripts/test-qwen.ts

# Or Node.js test (no dependencies)
node scripts/simple-test.js
```

### Need help?
- Read `BATCH_GENERATION_GUIDE.md` for detailed info
- Check log files: `batch-generation-*.log`
- Verify `.env` configuration

---

## Success Criteria

After completion, you should have:
- ✅ 78 new posts in database
- ✅ Average length ≥ 2000 characters
- ✅ All posts visible on blog pages
- ✅ All generations tracked in history table
- ✅ No duplicate content

---

## Ready? Run This Now!

```bash
cd /Users/deneb/promotion/packages/content-generator && tsx scripts/batch-generate-enhanced.ts
```

⏱️ **Estimated time: 6-8 minutes**

🎯 **Target: 78 blog posts**

✅ **Everything is configured and ready to go!**
