// Supabase Edge Function to trigger Vercel deployment on blog post publish
// This function is called by Supabase Database Webhooks

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: {
    id: string;
    slug: string;
    status: string;
    [key: string]: unknown;
  };
  old_record: {
    id: string;
    slug: string;
    status: string;
    [key: string]: unknown;
  } | null;
}

const VERCEL_DEPLOY_HOOK_URL = Deno.env.get('VERCEL_DEPLOY_HOOK_URL');

serve(async (req: Request) => {
  // CORS headers for preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const payload: WebhookPayload = await req.json();

    console.log('Received webhook:', {
      type: payload.type,
      table: payload.table,
      recordId: payload.record?.id,
      status: payload.record?.status,
    });

    // Only trigger deployment when:
    // 1. A new post is published (INSERT with status='published')
    // 2. An existing post is updated to published status
    // 3. A published post is modified
    const shouldTriggerDeploy =
      payload.record?.status === 'published' &&
      (payload.type === 'INSERT' ||
        (payload.type === 'UPDATE' &&
          (payload.old_record?.status !== 'published' ||
            payload.old_record?.status === 'published')));

    if (shouldTriggerDeploy) {
      if (!VERCEL_DEPLOY_HOOK_URL) {
        console.error('VERCEL_DEPLOY_HOOK_URL environment variable not set');
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Deploy hook URL not configured',
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Triggering Vercel deployment for post:', payload.record.slug);

      const deployResponse = await fetch(VERCEL_DEPLOY_HOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trigger: 'supabase-webhook',
          postSlug: payload.record.slug,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!deployResponse.ok) {
        console.error('Failed to trigger deployment:', deployResponse.statusText);
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Failed to trigger deployment',
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Deployment triggered successfully');

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Deployment triggered',
          postSlug: payload.record.slug,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // No deployment needed
    return new Response(
      JSON.stringify({
        success: true,
        message: 'No deployment needed',
        reason: payload.record?.status !== 'published' ? 'Post not published' : 'Unknown',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});
