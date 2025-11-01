import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRelatedBlogPosts } from '@/hooks/useRelatedBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedBlogPostsProps {
  currentPostId: string;
  category: string;
  tags: string[];
}

export const RelatedBlogPosts = ({ currentPostId, category, tags }: RelatedBlogPostsProps) => {
  const { data: relatedPosts, isLoading } = useRelatedBlogPosts({
    currentPostId,
    category,
    tags: tags || [],
  });

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-normal mb-8">Artículos relacionados</h2>
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
        <h2 className="text-2xl md:text-3xl font-normal mb-8">Artículos relacionados</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post: any) => (
            <Link key={post.id} to={`/blog/${post.slug_es}`}>
              <Card className="h-full overflow-hidden hover-lift transition-smooth group">
                {post.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title_es}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  {post.category && (
                    <Badge variant="secondary" className="mb-3">
                      {post.category}
                    </Badge>
                  )}
                  <h3 className="text-lg font-medium mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title_es}
                  </h3>
                  {post.excerpt_es && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt_es}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <time dateTime={post.published_at}>
                      {new Date(post.published_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    {post.read_time && (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.read_time} min
                        </span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
