import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Users, Eye, TrendingUp, Clock, ClipboardList, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface DashboardStats {
  blogPosts: number;
  contactLeads: number;
  services: number;
  caseStudies: number;
  totalViews: number;
  topArticles: Array<{ id: string; title_en: string; slug_en: string; view_count: number; category: string }>;
  recentLeads: Array<{ id: string; name: string; email: string; service: string; created_at: string }>;
}

async function fetchDashboardStats(): Promise<DashboardStats> {
  const blogPosts = await supabase
    .from('blog_posts')
    .select('id, view_count', { count: 'exact' })
    .eq('status', 'published')
    .eq('source_site', 'int');
  
  const contactLeads = await supabase
    .from('contact_leads')
    .select('id', { count: 'exact' })
    .eq('source_site', 'int');
  
  const servicesResult = await (supabase as any)
    .from('services')
    .select('id', { count: 'exact' })
    .eq('status', 'published');
  
  const caseStudiesResult = await supabase
    .from('case_studies')
    .select('id', { count: 'exact' })
    .eq('status', 'published');
  
  const topArticles = await supabase
    .from('blog_posts')
    .select('id, title_en, slug_en, view_count, category')
    .eq('status', 'published')
    .eq('source_site', 'int')
    .not('title_en', 'is', null)
    .order('view_count', { ascending: false, nullsFirst: false })
    .limit(5);
  
  const recentLeads = await supabase
    .from('contact_leads')
    .select('id, name, email, service, created_at')
    .eq('source_site', 'int')
    .order('created_at', { ascending: false })
    .limit(5);

  const totalViews = blogPosts.data?.reduce((sum, post) => sum + ((post as any).view_count || 0), 0) || 0;

  return {
    blogPosts: blogPosts.count || 0,
    contactLeads: contactLeads.count || 0,
    services: servicesResult.count || 0,
    caseStudies: caseStudiesResult.count || 0,
    totalViews,
    topArticles: (topArticles.data || []) as any,
    recentLeads: (recentLeads.data || []) as any,
  };
}

export const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats-audit'],
    queryFn: fetchDashboardStats,
  });

  const statCards = [
    { title: 'Services', value: stats?.services || 0, icon: ClipboardList, color: 'text-primary', bgColor: 'bg-primary/10', link: '/admin/services' },
    { title: 'Case Studies', value: stats?.caseStudies || 0, icon: Briefcase, color: 'text-emerald-600', bgColor: 'bg-emerald-50', link: '/admin/case-studies' },
    { title: 'Contact Leads', value: stats?.contactLeads || 0, icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-50', link: '/admin/contact-leads' },
    { title: 'Blog Posts', value: stats?.blogPosts || 0, icon: Newspaper, color: 'text-blue-600', bgColor: 'bg-blue-50', link: '/admin/blog' },
  ];

  const formatViewCount = (count: number): string => count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-normal">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Audit Services Administration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <Link to={stat.link}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}><stat.icon className={`h-4 w-4 ${stat.color}`} /></div>
              </CardHeader>
              <CardContent><div className="text-3xl font-bold">{formatViewCount(stat.value)}</div></CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Top Articles</CardTitle>
            <Link to="/admin/blog" className="text-sm text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent>
            {stats?.topArticles && stats.topArticles.length > 0 ? (
              <div className="space-y-4">
                {stats.topArticles.map((article, index) => (
                  <div key={article.id} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{article.title_en}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        {article.category && <span>{article.category}</span>}
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{formatViewCount(article.view_count || 0)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-muted-foreground text-sm">No articles yet</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" />Recent Inquiries</CardTitle>
            <Link to="/admin/contact-leads" className="text-sm text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent>
            {stats?.recentLeads && stats.recentLeads.length > 0 ? (
              <div className="space-y-4">
                {stats.recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{lead.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {lead.service && <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-muted">{lead.service}</span>}
                      <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-muted-foreground text-sm">No inquiries yet</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};