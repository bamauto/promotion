#!/usr/bin/env tsx
/**
 * Manual content generation script
 * Usage: pnpm --filter @promotion/content-generator generate
 */

import { config } from 'dotenv';
import { validateEnv, CONTENT_CONFIG } from '../src/config.js';
import { generateForAllRegions } from '../src/services/generator.js';

// Load environment variables
config();

async function main() {
  console.log('🚀 Manual Content Generation\n');
  
  try {
    validateEnv();
    
    // Parse command line arguments
    const args = process.argv.slice(2);
    const countArg = args.find(a => a.startsWith('--count='));
    const dryRun = args.includes('--dry-run');
    
    const count = countArg 
      ? parseInt(countArg.split('=')[1], 10) 
      : CONTENT_CONFIG.defaultPostsPerRegion;
    
    console.log(`Posts per region: ${count}`);
    console.log(`Dry run: ${dryRun}\n`);
    
    await generateForAllRegions(count, dryRun);
    
    console.log('\n✅ Generation complete!');
    
  } catch (e) {
    console.error('\n❌ Generation failed:', e);
    process.exit(1);
  }
}

main();
