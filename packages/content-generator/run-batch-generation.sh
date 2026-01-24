#!/bin/bash
# Batch generation runner script
# This script generates 78 blog posts (28 for Giheung, 50 for Osan)

cd /Users/deneb/promotion/packages/content-generator

echo "🚀 Starting batch generation..."
echo "Target: 28 Giheung posts + 50 Osan posts = 78 total"
echo "Start time: $(date)"
echo ""

# Run the enhanced batch generation script
tsx scripts/batch-generate-enhanced.ts 2>&1 | tee batch-generation-$(date +%Y%m%d-%H%M%S).log

EXIT_CODE=${PIPESTATUS[0]}

echo ""
echo "End time: $(date)"
echo "Exit code: $EXIT_CODE"

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ Batch generation completed successfully!"
else
  echo "❌ Batch generation failed with exit code $EXIT_CODE"
fi

exit $EXIT_CODE
