import { Command } from 'commander';
import { config } from 'dotenv';
import { validateEnv, ALL_REGIONS, CONTENT_CONFIG, REGIONS } from './config.js';
import { generateForRegion, generateForAllRegions, testConnection } from './services/index.js';
import { getKeywordCount } from './services/keyword.js';
import { getImageCount } from './services/image.js';
import { getRecentRuns } from './services/publisher.js';

// Load environment variables
config();

const program = new Command();

program
  .name('content-generator')
  .description('Automated blog content generator using Qwen AI')
  .version('1.0.0');

// Generate command
program
  .command('generate')
  .description('Generate blog posts')
  .option('-r, --region <region>', 'Generate for specific region')
  .option('-c, --count <number>', 'Number of posts per region', String(CONTENT_CONFIG.defaultPostsPerRegion))
  .option('-a, --all', 'Generate for all regions')
  .option('-d, --dry-run', 'Dry run (no actual publishing)')
  .action(async (options) => {
    try {
      validateEnv();
      
      const count = parseInt(options.count, 10);
      const dryRun = options.dryRun || false;
      
      if (options.all || !options.region) {
        // Generate for all regions
        await generateForAllRegions(count, dryRun);
      } else {
        // Generate for specific region
        const region = options.region;
        if (!ALL_REGIONS.includes(region)) {
          console.error(`Invalid region: ${region}`);
          console.error(`Valid regions: ${ALL_REGIONS.join(', ')}`);
          process.exit(1);
        }
        await generateForRegion({ region, count, dryRun });
      }
    } catch (e) {
      console.error('Generation failed:', e);
      process.exit(1);
    }
  });

// Status command
program
  .command('status')
  .description('Show generator status')
  .action(async () => {
    try {
      validateEnv();
      
      console.log('📊 Content Generator Status\n');
      
      // Test Qwen API
      console.log('🔗 API Connections:');
      const qwenOk = await testConnection();
      console.log(`   Qwen API: ${qwenOk ? '✅ Connected' : '❌ Failed'}`);
      
      // Keyword counts
      console.log('\n📝 Keywords by Region:');
      for (const region of ALL_REGIONS) {
        const count = await getKeywordCount(region);
        console.log(`   ${REGIONS[region].name}: ${count} keywords`);
      }
      
      // Image count
      const imageCount = await getImageCount();
      console.log(`\n🖼️ Images: ${imageCount} available`);
      
      // Recent runs
      console.log('\n📅 Recent Runs:');
      const runs = await getRecentRuns(5);
      if (runs.length === 0) {
        console.log('   No recent runs');
      } else {
        for (const run of runs) {
          const date = new Date(run.started_at).toLocaleString('ko-KR');
          console.log(`   ${date} - ${REGIONS[run.region]?.name}: ${run.total_generated} generated, ${run.total_failed} failed (${run.status})`);
        }
      }
      
    } catch (e) {
      console.error('Status check failed:', e);
      process.exit(1);
    }
  });

// Test command
program
  .command('test')
  .description('Test API connections')
  .action(async () => {
    try {
      validateEnv();
      
      console.log('🔗 Testing API connections...\n');
      
      // Test Qwen
      console.log('Testing Qwen API...');
      const qwenOk = await testConnection();
      console.log(`Qwen API: ${qwenOk ? '✅ OK' : '❌ Failed'}`);
      
      // Test Supabase (via keyword count)
      console.log('\nTesting Supabase...');
      try {
        const count = await getKeywordCount(ALL_REGIONS[0]);
        console.log(`Supabase: ✅ OK (${count} keywords in ${ALL_REGIONS[0]})`);
      } catch (e) {
        console.log(`Supabase: ❌ Failed - ${e}`);
      }
      
    } catch (e) {
      console.error('Test failed:', e);
      process.exit(1);
    }
  });

// Parse arguments
program.parse();
