#!/usr/bin/env tsx
/**
 * Seed images for content generation
 * Usage: pnpm --filter @promotion/content-generator seed-images
 * 
 * Note: Replace placeholder URLs with actual image URLs from your storage
 */

import { config } from 'dotenv';
import { validateEnv } from '../src/config.js';
import { addImages, getImageCount } from '../src/services/image.js';

// Load environment variables
config();

// Sample images - Replace these with actual image URLs
// Images should be hosted in Supabase Storage or another CDN
const SAMPLE_IMAGES = [
  {
    url: 'https://placehold.co/800x450/1a1a1a/white?text=Karaoke+Room+1',
    alt_text: '프리미엄 노래방 룸',
    category: 'room',
  },
  {
    url: 'https://placehold.co/800x450/2a2a2a/white?text=Karaoke+Room+2',
    alt_text: '넓은 노래방 공간',
    category: 'room',
  },
  {
    url: 'https://placehold.co/800x450/333333/white?text=VIP+Room',
    alt_text: 'VIP 노래방 룸',
    category: 'vip',
  },
  {
    url: 'https://placehold.co/800x450/444444/white?text=Party+Room',
    alt_text: '파티룸',
    category: 'party',
  },
  {
    url: 'https://placehold.co/800x450/555555/white?text=Sound+System',
    alt_text: '최신 음향 시스템',
    category: 'equipment',
  },
  {
    url: 'https://placehold.co/800x450/1a1a2e/white?text=Modern+Interior',
    alt_text: '모던 인테리어',
    category: 'interior',
  },
  {
    url: 'https://placehold.co/800x450/16213e/white?text=Luxury+Room',
    alt_text: '럭셔리 룸',
    category: 'luxury',
  },
  {
    url: 'https://placehold.co/800x450/0f3460/white?text=Cozy+Space',
    alt_text: '아늑한 공간',
    category: 'room',
  },
  {
    url: 'https://placehold.co/800x450/e94560/1a1a1a?text=Neon+Lights',
    alt_text: '네온 조명',
    category: 'atmosphere',
  },
  {
    url: 'https://placehold.co/800x450/533483/white?text=Group+Room',
    alt_text: '단체 룸',
    category: 'group',
  },
];

async function main() {
  console.log('🖼️ Seeding Images\n');
  
  try {
    validateEnv();
    
    // Check current image count
    const currentCount = await getImageCount();
    console.log(`Current images: ${currentCount}`);
    
    if (currentCount >= SAMPLE_IMAGES.length) {
      console.log('Images already seeded. Skipping...');
      console.log('\n⚠️ To add real images, update the SAMPLE_IMAGES array');
      console.log('   with actual URLs from your image storage.');
      return;
    }
    
    // Add images
    const added = await addImages(SAMPLE_IMAGES);
    console.log(`Added: ${added} images`);
    
    const total = await getImageCount();
    console.log(`Total: ${total} images`);
    
    console.log('\n✅ Image seeding complete!');
    console.log('\n⚠️ Note: These are placeholder images.');
    console.log('   Replace them with actual karaoke images for production.');
    
  } catch (e) {
    console.error('\n❌ Seeding failed:', e);
    process.exit(1);
  }
}

main();
