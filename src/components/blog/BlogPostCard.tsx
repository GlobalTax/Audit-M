import { memo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogPostCardProps {
  slug: string;
  slug_es?: string;
  slug_en?: string;
  category?: string;
  title: string;
  excerpt?: string;
  authorName?: string;
  authorAvatarUrl?: string;
  publishedAt?: string;
  readTime?: number;
  featuredImage?: string;
  className?: string;
}

export const BlogPostCard = memo(({
  slug,
  slug_es,
  slug_en,
  category,
  title,
  excerpt,
  authorName,
  authorAvatarUrl,
  publishedAt,
  readTime,
  featuredImage,
  className = "",
}: BlogPostCardProps) => {
  const { language } = useLanguage();
  
  // Prioritize slug based on active language
  const resolvedSlug = language === 'en' 
    ? (slug_en || slug_es || slug) 
    : (slug_es || slug_en || slug);
  const blogPath = `/blog/${resolvedSlug}`;

  const initials = authorName
    ? authorName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";
  
  return (
    <Link to={blogPath}>
      <Card className={`h-full hover-lift transition-smooth group overflow-hidden ${className}`}>
        {/* Featured Image */}
        {featuredImage && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={featuredImage} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        
        <CardContent className="p-6 flex flex-col h-full">
          {/* Category Badge */}
          {category && (
            <Badge variant="secondary" className="mb-4 w-fit">
              {category}
            </Badge>
          )}

          {/* Title */}
          <h3 className="text-xl font-display font-normal mb-3 line-clamp-2 group-hover:text-accent transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
              {excerpt}
            </p>
          )}

          {/* Footer: Author, Date & Read Time */}
          <div className="flex items-end justify-between mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              {authorName && (
                <Avatar className="h-6 w-6">
                  {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} alt={authorName} />}
                  <AvatarFallback className="text-xs bg-muted">{initials}</AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col gap-0.5">
                {authorName && (
                  <p className="text-sm font-medium text-foreground">
                    {authorName}
                  </p>
                )}
                {publishedAt && (
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(publishedAt), "d MMM yyyy")}
                  </p>
                )}
              </div>
            </div>

            {readTime && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{readTime} min</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}, (prevProps, nextProps) => {
  return prevProps.slug === nextProps.slug && 
         prevProps.title === nextProps.title &&
         prevProps.publishedAt === nextProps.publishedAt &&
         prevProps.featuredImage === nextProps.featuredImage;
});
