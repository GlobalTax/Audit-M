import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author_name: string;
  category: string;
  published_at: string;
  read_time: number;
  className?: string;
}

export const NewsCard = ({
  title,
  slug,
  excerpt,
  featured_image_url,
  author_name,
  category,
  published_at,
  read_time,
  className,
}: NewsCardProps) => {
  return (
    <Link to={`/noticias/${slug}`}>
      <Card className={cn(
        "group overflow-hidden border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col",
        className
      )}>
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {featured_image_url ? (
            <img
              src={featured_image_url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <span className="text-4xl font-bold text-muted-foreground/20">N</span>
            </div>
          )}
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground shadow-lg">
            {category}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
          
          {excerpt && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
              {excerpt}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              <span>{author_name}</span>
              <span>•</span>
              <time dateTime={published_at}>
                {new Date(published_at).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{read_time} min</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-accent font-medium text-sm mt-4 group-hover:gap-3 transition-all">
            Leer más
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
};
