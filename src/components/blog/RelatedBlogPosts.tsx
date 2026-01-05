import { useRelatedBlogPosts } from '@/hooks/useRelatedBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogPostCard } from './BlogPostCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface RelatedBlogPostsProps {
  currentPostId: string;
  category: string;
  tags: string[];
  language?: string;
  onPostClick?: (targetArticleId: string, targetArticleTitle: string, position: number) => void;
}

export const RelatedBlogPosts = ({ 
  currentPostId, 
  category, 
  tags, 
  language = 'es',
  onPostClick 
}: RelatedBlogPostsProps) => {
  const { t } = useLanguage();
  
  const { data: relatedPosts, isLoading } = useRelatedBlogPosts({
    currentPostId,
    category,
    tags: tags || [],
    language,
  });

  const handlePostClick = (post: any, index: number) => {
    if (onPostClick) {
      onPostClick(
        post.id,
        post[`title_${language}`] || post.title_es,
        index + 1
      );
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-normal mb-8">{t('blog.relatedPosts.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-normal mb-8">{t('blog.relatedPosts.title')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post: any, index: number) => (
            <div key={post.id} onClick={() => handlePostClick(post, index)}>
              <BlogPostCard
                slug={post[`slug_${language}`] || post.slug_es}
                slug_es={post.slug_es}
                slug_en={post.slug_en}
                category={post.category}
                title={post[`title_${language}`] || post.title_es}
                excerpt={post[`excerpt_${language}`] || post.excerpt_es}
                authorName={post.author_name}
                publishedAt={post.published_at}
                readTime={post.read_time}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
