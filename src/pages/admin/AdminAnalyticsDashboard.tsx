import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Mail, 
  FileText, 
  Calculator, 
  ClipboardCheck, 
  HelpCircle,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { format, subDays, startOfDay, eachDayOfInterval } from 'date-fns';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const LEAD_MAGNET_LABELS: Record<string, string> = {
  'spain-company-setup': 'Playbook',
  'spain-document-checklist': 'Checklist',
  'spain-readiness-quiz': 'Quiz',
  'spain-setup-calculator': 'Calculator',
};

export const AdminAnalyticsDashboard = () => {
  // Fetch all analytics data
  const { data, isLoading } = useQuery({
    queryKey: ['analytics-dashboard'],
    queryFn: async () => {
      const thirtyDaysAgo = subDays(new Date(), 30).toISOString();
      const sevenDaysAgo = subDays(new Date(), 7).toISOString();

      const [
        playbookLeads,
        contactLeads,
        blogPosts,
        nurtureEmails,
        blogTopics
      ] = await Promise.all([
        // All playbook/resource leads
        supabase
          .from('playbook_leads')
          .select('*')
          .eq('source_site', 'international')
          .gte('created_at', thirtyDaysAgo)
          .order('created_at', { ascending: true }),
        
        // Contact leads
        supabase
          .from('contact_leads')
          .select('*')
          .eq('source_site', 'int')
          .gte('created_at', thirtyDaysAgo)
          .order('created_at', { ascending: true }),
        
        // Blog posts
        supabase
          .from('blog_posts')
          .select('id, title_en, view_count, created_at, status')
          .eq('source_site', 'int')
          .eq('status', 'published'),
        
        // Nurture emails sent
        supabase
          .from('nurture_email_log')
          .select('*')
          .gte('sent_at', thirtyDaysAgo)
          .order('sent_at', { ascending: true }),

        // Blog topics queue
        supabase
          .from('blog_topics_queue')
          .select('*')
          .eq('target_site', 'int')
      ]);

      return {
        playbookLeads: playbookLeads.data || [],
        contactLeads: contactLeads.data || [],
        blogPosts: blogPosts.data || [],
        nurtureEmails: nurtureEmails.data || [],
        blogTopics: blogTopics.data || [],
      };
    },
  });

  // Calculate metrics
  const metrics = {
    totalLeads: (data?.playbookLeads?.length || 0) + (data?.contactLeads?.length || 0),
    resourceDownloads: data?.playbookLeads?.length || 0,
    contactRequests: data?.contactLeads?.length || 0,
    emailsSent: data?.nurtureEmails?.length || 0,
    blogViews: data?.blogPosts?.reduce((sum, p) => sum + (p.view_count || 0), 0) || 0,
    publishedPosts: data?.blogPosts?.length || 0,
    pendingTopics: data?.blogTopics?.filter(t => t.status === 'pending')?.length || 0,
  };

  // Leads by resource type
  const leadsByResource = Object.entries(
    (data?.playbookLeads || []).reduce((acc, lead) => {
      const name = lead.playbook_name || 'other';
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({
    name: LEAD_MAGNET_LABELS[name] || name,
    value,
    fill: COLORS[Object.keys(LEAD_MAGNET_LABELS).indexOf(name) % COLORS.length]
  }));

  // Leads by country (top 5)
  const leadsByCountry = Object.entries(
    (data?.playbookLeads || []).reduce((acc, lead) => {
      acc[lead.country] = (acc[lead.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  // Daily leads trend (last 30 days)
  const dailyLeadsTrend = eachDayOfInterval({
    start: subDays(new Date(), 29),
    end: new Date()
  }).map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const resources = (data?.playbookLeads || []).filter(
      l => format(new Date(l.created_at), 'yyyy-MM-dd') === dateStr
    ).length;
    const contacts = (data?.contactLeads || []).filter(
      l => format(new Date(l.created_at), 'yyyy-MM-dd') === dateStr
    ).length;
    return {
      date: format(date, 'MMM dd'),
      resources,
      contacts,
      total: resources + contacts
    };
  });

  // Nurture email performance
  const nurtureBySequence = Object.entries(
    (data?.nurtureEmails || []).reduce((acc, email) => {
      const key = `${email.lead_type} #${email.sequence_order}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Timeline distribution
  const timelineDistribution = Object.entries(
    (data?.playbookLeads || []).reduce((acc, lead) => {
      const timeline = lead.timeline || 'not specified';
      acc[timeline] = (acc[timeline] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ 
    name: name === 'immediate' ? 'Immediate' : 
          name === '1-3 months' ? '1-3 Months' : 
          name === '3-6 months' ? '3-6 Months' : 
          name === '6+ months' ? '6+ Months' : 'Not Specified',
    value 
  }));

  // High intent leads (immediate timeline)
  const highIntentLeads = (data?.playbookLeads || []).filter(l => l.timeline === 'immediate').length;
  const highIntentRate = metrics.resourceDownloads > 0 
    ? Math.round((highIntentLeads / metrics.resourceDownloads) * 100) 
    : 0;

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
        <h1 className="text-3xl font-normal">Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">Performance metrics for the last 30 days</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" /> Total Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalLeads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <FileText className="h-3 w-3" /> Downloads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.resourceDownloads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Target className="h-3 w-3" /> Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.contactRequests}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Zap className="h-3 w-3" /> High Intent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highIntentRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" /> Emails Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.emailsSent}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <BookOpen className="h-3 w-3" /> Blog Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.blogViews.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingTopics}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="funnels">Funnels</TabsTrigger>
          <TabsTrigger value="nurture">Nurture</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-normal flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Leads Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyLeadsTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))' 
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="resources" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.6}
                      name="Resources"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="contacts" 
                      stackId="1"
                      stroke="hsl(var(--chart-2))" 
                      fill="hsl(var(--chart-2))" 
                      fillOpacity={0.6}
                      name="Contacts"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Timeline Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-normal">Lead Intent Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timelineDistribution} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Resource Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-normal">Downloads by Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadsByResource}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {leadsByResource.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Funnels Tab */}
        <TabsContent value="funnels" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(LEAD_MAGNET_LABELS).map(([key, label]) => {
              const count = (data?.playbookLeads || []).filter(l => l.playbook_name === key).length;
              const immediate = (data?.playbookLeads || []).filter(l => l.playbook_name === key && l.timeline === 'immediate').length;
              const rate = count > 0 ? Math.round((immediate / count) * 100) : 0;
              
              const IconComponent = 
                key === 'spain-company-setup' ? BookOpen :
                key === 'spain-document-checklist' ? ClipboardCheck :
                key === 'spain-readiness-quiz' ? HelpCircle :
                Calculator;

              return (
                <Card key={key}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-primary" />
                      {label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-3xl font-bold">{count}</div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">High Intent</span>
                      <Badge variant={rate >= 30 ? "default" : "secondary"}>
                        {rate}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-normal">Funnel Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadsByResource}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {leadsByResource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nurture Tab */}
        <TabsContent value="nurture" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Emails Sent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.emailsSent}</div>
                <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Unique Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {new Set((data?.nurtureEmails || []).map(e => e.lead_id)).size}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Receiving nurture</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Emails/Lead</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(() => {
                    const uniqueLeads = new Set((data?.nurtureEmails || []).map(e => e.lead_id)).size;
                    return uniqueLeads > 0 ? (metrics.emailsSent / uniqueLeads).toFixed(1) : '0';
                  })()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Sequence progress</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-normal">Emails by Sequence Step</CardTitle>
            </CardHeader>
            <CardContent>
              {nurtureBySequence.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={nurtureBySequence} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={150} />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  No nurture emails sent yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geography Tab */}
        <TabsContent value="geography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-normal">Top Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadsByCountry}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {leadsByCountry.map((country, index) => (
              <Card key={country.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <span className="text-lg">#{index + 1}</span>
                    {country.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{country.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {metrics.resourceDownloads > 0 
                      ? Math.round((country.value / metrics.resourceDownloads) * 100) 
                      : 0}% of total
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
