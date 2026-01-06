import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Users, FileDown, Eye, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats-international'],
    queryFn: async () => {
      const [blogPosts, contactLeads, resourceLeads, topArticles, recentLeads] = await Promise.all([
        // Blog posts for international site
        supabase
          .from('blog_posts')
          .select('id, view_count', { count: 'exact' })
          .eq('status', 'published')
          .eq('source_site', 'int'),
        // Contact leads
        supabase
          .from('contact_leads')
          .select('id', { count: 'exact' })
          .eq('source_site', 'int'),
        // Resource/Playbook leads
        supabase
          .from('playbook_leads')
          .select('id', { count: 'exact' })
          .eq('source_site', 'international'),
        // Top 5 articles by views
        supabase
          .from('blog_posts')
          .select('id, title_en, slug_en, view_count, category')
          .eq('status', 'published')
          .eq('source_site', 'int')
          .not('title_en', 'is', null)
          .order('view_count', { ascending: false, nullsFirst: false })
          .limit(5),
        // Recent resource leads
        supabase
          .from('playbook_leads')
          .select('id, full_name, email, playbook_name, created_at')
          .eq('source_site', 'international')
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      // Calculate total views
      const totalViews = blogPosts.data?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0;

      return {
        blogPosts: blogPosts.count || 0,
        contactLeads: contactLeads.count || 0,
        resourceLeads: resourceLeads.count || 0,
        totalViews,
        topArticles: topArticles.data || [],
        recentLeads: recentLeads.data || [],
      };
    },
  });

  const statCards = [
    {
      title: 'Blog Posts',
      value: stats?.blogPosts || 0,
      icon: Newspaper,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/blog',
    },
    {
      title: 'Contact Leads',
      value: stats?.contactLeads || 0,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/admin/contact-leads',
    },
    {
      title: 'Resource Downloads',
      value: stats?.resourceLeads || 0,
      icon: FileDown,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/admin/playbook-leads',
    },
    {
      title: 'Total Views',
      value: stats?.totalViews || 0,
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const formatViewCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const getPlaybookLabel = (name: string): string => {
    const labels: Record<string, string> = {
      'spain-company-setup': 'Playbook',
      'spain-document-checklist': 'Checklist',
      'spain-readiness-quiz': 'Quiz',
      'spain-setup-calculator': 'Calculator',
    };
    return labels[name] || name;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-normal">Dashboard</h1>
        <p className="text-muted-foreground mt-1">NRRO International (global.nrro.es) Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className={stat.link ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}>
            {stat.link ? (
              <Link to={stat.link}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{formatViewCount(stat.value)}</div>
                </CardContent>
              </Link>
            ) : (
              <>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{formatViewCount(stat.value)}</div>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Articles */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Articles
            </CardTitle>
            <Link to="/admin/blog" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.topArticles && stats.topArticles.length > 0 ? (
              <div className="space-y-4">
                {stats.topArticles.map((article: any, index: number) => (
                  <div key={article.id} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{article.title_en}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        {article.category && <span>{article.category}</span>}
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {formatViewCount(article.view_count || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No articles yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Resource Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Resource Downloads
            </CardTitle>
            <Link to="/admin/playbook-leads" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.recentLeads && stats.recentLeads.length > 0 ? (
              <div className="space-y-4">
                {stats.recentLeads.map((lead: any) => (
                  <div key={lead.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{lead.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-muted">
                        {getPlaybookLabel(lead.playbook_name)}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No resource downloads yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
