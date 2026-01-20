# Supabase Configuration for Blog System

## Overview
This directory contains Supabase migrations and Edge Functions for the regional blog system.

## Setup Instructions

### 1. Run Migrations
Execute the SQL migrations in your Supabase project:

```bash
# Using Supabase CLI
supabase db push

# Or manually via Supabase Dashboard:
# Go to SQL Editor → New Query → Paste contents from migrations/
```

### 2. Create Storage Bucket
The storage bucket `blog-images` will be created by the migration. Verify the structure:

```
blog-images/
├── bundang/
├── suwon/
├── dongtan/
├── jengja/
├── ingedong/
└── shared/
```

### 3. Deploy Edge Function
Deploy the deploy-trigger function:

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy the function
supabase functions deploy deploy-trigger
```

### 4. Set Environment Variables
Set the Vercel Deploy Hook URL:

```bash
supabase secrets set VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/YOUR_HOOK_ID
```

### 5. Configure Database Webhook
In Supabase Dashboard:
1. Go to Database → Webhooks
2. Create new webhook:
   - Name: `blog-post-deploy-trigger`
   - Table: `blog_posts`
   - Events: INSERT, UPDATE
   - Type: Supabase Edge Function
   - Function: `deploy-trigger`

## Vercel Deploy Hook Setup
1. Go to Vercel Dashboard → Your Blog Project
2. Settings → Git → Deploy Hooks
3. Create new hook named "supabase-trigger"
4. Copy the generated URL
5. Set it as VERCEL_DEPLOY_HOOK_URL secret

## Testing
Insert a test post to verify the webhook:

```sql
INSERT INTO blog_posts (slug, title, content, regions, status)
VALUES (
  'test-post',
  'Test Post',
  '<p>This is a test post content.</p>',
  ARRAY['bundang'],
  'published'
);
```

Check:
1. Supabase function logs for execution
2. Vercel deployments for new build trigger
