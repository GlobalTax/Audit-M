import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BadgeFilter } from "@/components/ui/badge-filter";
import { Meta } from "@/components/seo/Meta";
import { EmptyState } from "@/components/ui/empty-state";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsSkeleton } from "@/components/news/NewsSkeleton";
import { useNewsSearch, useNewsFilterOptions } from "@/hooks/useNewsSearch";
import { insights } from "@/data/mockData";
import { BadgeHero } from "@/components/ui/badge-hero";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 9;

const Insights = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: filterOptions } = useNewsFilterOptions();
  
  const { data: newsArticles, isLoading } = useNewsSearch({
    searchQuery: searchTerm || undefined,
    category: activeCategory !== "all" ? activeCategory : undefined,
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  });

  // Normalize data structure
  const normalizedNews = (newsArticles || []).map(article => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    featured_image_url: article.featured_image_url,
    author_name: article.author_name,
    category: article.category,
    published_at: article.published_at,
    read_time: article.read_time,
    is_featured: article.is_featured,
  }));

  const normalizedInsights = insights.map((insight: any) => ({
    id: insight.slug,
    title: insight.title,
    slug: insight.slug,
    excerpt: insight.excerpt,
    featured_image_url: null,
    author_name: insight.author,
    category: insight.category,
    published_at: insight.date,
    read_time: parseInt(insight.readTime) || 5,
    is_featured: false,
  }));

  const combinedArticles = [...normalizedNews, ...normalizedInsights];
  
  const categories = ["all", ...(filterOptions?.categories || [])];
  const totalPages = Math.ceil((combinedArticles.length || 0) / ITEMS_PER_PAGE);

  const featuredArticle = combinedArticles.find(article => article.is_featured) || combinedArticles[0];
  const regularArticles = combinedArticles.filter(article => article.id !== featuredArticle?.id);

  return (
    <>
      <Meta 
        title="Noticias | Navarro Tax Legal"
        description="Mantente informado con las últimas noticias del sector legal y fiscal. Actualizaciones, tendencias y análisis del mercado."
        canonicalUrl={`${window.location.origin}/noticias`}
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-black via-black to-primary/20 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNGgydjJoLTJ2LTJ6bS0yIDJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0yLTJ2Mmgydi0yaC0yem0wLTJ2Mmgydi0yaC0yem0tMiAydjJoMnYtMmgtMnptMC0ydjJoMnYtMmgtMnptMi0ydjJoMnYtMmgtMnptMC0ydjJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <BadgeHero variant="dark" className="mb-6">
                Actualidad
              </BadgeHero>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Noticias
              </h1>
              
              <p className="text-xl text-white/80 max-w-2xl">
                Las últimas novedades y actualizaciones del sector legal y fiscal
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="bg-background border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-xl mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar noticias..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <BadgeFilter
                  key={category}
                  label={category === "all" ? "Todas" : category}
                  active={activeCategory === category}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {isLoading ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <NewsSkeleton />
                <NewsSkeleton />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <NewsSkeleton />
                <NewsSkeleton />
                <NewsSkeleton />
              </div>
            </div>
          ) : combinedArticles.length === 0 ? (
            <EmptyState
              title="No hay noticias disponibles"
              description="No se encontraron noticias que coincidan con tu búsqueda."
            />
          ) : (
            <div className="space-y-12">
              {/* Featured Article */}
              {featuredArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Link to={`/noticias/${featuredArticle.slug}`}>
                    <Card className="group overflow-hidden border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <div className="grid lg:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative aspect-[16/9] lg:aspect-auto overflow-hidden bg-muted">
                          {featuredArticle.featured_image_url ? (
                            <img
                              src={featuredArticle.featured_image_url}
                              alt={featuredArticle.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                              <span className="text-6xl font-bold text-muted-foreground/20">N</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <Badge className="absolute top-6 left-6 bg-accent text-accent-foreground shadow-lg">
                            Destacada
                          </Badge>
                        </div>

                        {/* Content */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-background to-muted/20">
                          <Badge className="w-fit mb-4 bg-primary/10 text-primary border-primary/20">
                            {featuredArticle.category}
                          </Badge>
                          
                          <h2 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:text-accent transition-colors">
                            {featuredArticle.title}
                          </h2>
                          
                          {featuredArticle.excerpt && (
                            <p className="text-muted-foreground mb-6 line-clamp-3 text-lg">
                              {featuredArticle.excerpt}
                            </p>
                          )}

                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-4">
                              <span className="font-medium">{featuredArticle.author_name}</span>
                              <span>•</span>
                              <time dateTime={featuredArticle.published_at}>
                                {new Date(featuredArticle.published_at).toLocaleDateString("es-ES", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </time>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{featuredArticle.read_time} min</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                            Leer noticia completa
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )}

              {/* Regular Articles Grid */}
              {regularArticles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {regularArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <NewsCard
                        id={article.id}
                        title={article.title}
                        slug={article.slug}
                        excerpt={article.excerpt}
                        featured_image_url={article.featured_image_url}
                        author_name={article.author_name}
                        category={article.category}
                        published_at={article.published_at}
                        read_time={article.read_time}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-16">
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Insights;
