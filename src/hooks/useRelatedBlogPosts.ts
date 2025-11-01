import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface RelatedPostsParams {
  currentPostId: string;
  category: string;
  tags: string[];
}

export function useRelatedBlogPosts({ currentPostId, category, tags }: RelatedPostsParams) {
  return useQuery({
    queryKey: ['related-blog-posts', currentPostId, category, tags],
    queryFn: async () => {
      // Get posts from same category (excluding current)
      const { data: categoryPosts, error: categoryError } = await supabase
        .from('blog_posts')
        .select('id, title_es, slug_es, excerpt_es, featured_image, category, published_at, read_time')
        .eq('status', 'published')
        .eq('category', category)
        .neq('id', currentPostId)
        .order('published_at', { ascending: false })
        .limit(5);

      if (categoryError) throw categoryError;

      // Get posts with overlapping tags
      const { data: tagPosts, error: tagError } = await supabase
        .from('blog_posts')
        .select('id, title_es, slug_es, excerpt_es, featured_image, category, tags, published_at, read_time')
        .eq('status', 'published')
        .neq('id', currentPostId)
        .order('published_at', { ascending: false })
        .limit(10);

      if (tagError) throw tagError;

      // Calculate relevance score
      const scoredPosts = new Map<string, any>();

      categoryPosts?.forEach(post => {
        scoredPosts.set(post.id, { ...post, score: 3 });
      });

      tagPosts?.forEach(post => {
        const postTags = post.tags || [];
        const commonTags = postTags.filter((tag: string) => tags.includes(tag));
        
        if (commonTags.length > 0) {
          const existing = scoredPosts.get(post.id);
          if (existing) {
            existing.score += commonTags.length * 2;
          } else {
            scoredPosts.set(post.id, { ...post, score: commonTags.length * 2 });
          }
        }
      });

      // Sort by score and return top 3
      return Array.from(scoredPosts.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    },
    enabled: !!currentPostId,
  });
}
