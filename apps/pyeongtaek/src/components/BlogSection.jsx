import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

const SUPABASE_URL = 'https://rrzeapykmyrsiqmkwjcf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyemVhcHlrbXlyc2lxbWt3amNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MDI0MzIsImV4cCI6MjA4NDQ3ODQzMn0.1syiV186n8K4pJnCqMXNBR4N4fr0BHnSba5sBrtMjGk';
const REGION = 'pyeongtaek';
const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public/blog-images`;

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const now = new Date().toISOString();
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/blog_posts?select=id,slug,title,excerpt,category,published_at&regions=cs.{${REGION}}&status=eq.published&published_at=lte.${now}&order=published_at.desc&limit=3`,
          {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
          }
        );
        const data = await response.json();

        // Fetch images for each post
        const postsWithImages = await Promise.all(
          data.map(async (post) => {
            const imgResponse = await fetch(
              `${SUPABASE_URL}/rest/v1/blog_images?select=storage_path,alt_text&post_id=eq.${post.id}&image_type=eq.featured&limit=1`,
              {
                headers: {
                  'apikey': SUPABASE_ANON_KEY,
                  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                },
              }
            );
            const imgData = await imgResponse.json();
            const image = imgData[0];
            return {
              ...post,
              image: image ? `${STORAGE_URL}/${image.storage_path}` : null,
              imageAlt: image?.alt_text || post.title,
            };
          })
        );

        setPosts(postsWithImages);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-800 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-slate-800 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
          <span className="text-amber-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-3 block">
            평택 유흥 정보
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 relative z-10 drop-shadow-sm">
            평택 하이퍼블릭 블로그
          </h2>
          <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-transparent mx-auto mt-6"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden bg-slate-800 relative">
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    width="1200"
                    height="675"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <BookOpen size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>

                {/* Category Badge */}
                {post.category && (
                  <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <time className="text-slate-500 text-sm">
                    {formatDate(post.published_at)}
                  </time>
                  <span className="text-amber-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    읽기 <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800/50 text-white font-bold rounded-xl border border-slate-700 hover:border-amber-500 hover:text-amber-400 transition-all hover:bg-slate-800"
          >
            <BookOpen size={20} />
            블로그 전체보기
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
