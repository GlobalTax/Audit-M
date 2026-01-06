import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { usePopularArticles } from '@/hooks/usePopularArticles';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface PopularArticlesProps {
  currentPostId?: string;
}

const formatViewCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const PopularArticles = ({ currentPostId }: PopularArticlesProps) => {
  const { data: articles, isLoading } = usePopularArticles(currentPostId, 5);
  const { trackEvent } = useAnalytics();

  const handleArticleClick = (articleId: string, articleTitle: string, position: number) => {
    trackEvent('popular_article_click_global_nrro', {
      article_id: articleId,
      article_title: articleTitle,
      position: position + 1,
      source: 'sidebar',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-normal text-foreground mb-4">Most Popular</h3>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-normal text-foreground mb-4">Most Popular</h3>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            to={`/blog/${article.slug}`}
            onClick={() => handleArticleClick(article.id, article.title, index)}
            className="group flex gap-3 items-start"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                {article.category && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {article.category}
                  </Badge>
                )}
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  {formatViewCount(article.view_count)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
