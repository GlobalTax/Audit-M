import { FileText, Edit, Calendar, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useBlogStats } from "@/hooks/useBlogSearch";
import { SITE_SOURCE } from "@/config/site";

export const BlogStatsCard = () => {
  const { data: stats, isLoading } = useBlogStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-8 bg-muted rounded w-12" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statItems = [
    {
      label: SITE_SOURCE === 'int' ? "Published" : "Publicados",
      value: stats?.total_published || 0,
      icon: FileText,
      color: "text-green-600",
    },
    {
      label: SITE_SOURCE === 'int' ? "Drafts" : "Borradores",
      value: stats?.total_drafts || 0,
      icon: Edit,
      color: "text-gray-600",
    },
    {
      label: SITE_SOURCE === 'int' ? "Scheduled" : "Programados",
      value: stats?.total_scheduled || 0,
      icon: Calendar,
      color: "text-yellow-600",
    },
    {
      label: SITE_SOURCE === 'int' ? "Total Views" : "Vistas Totales",
      value: stats?.total_views || 0,
      icon: Eye,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-normal text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-3xl font-normal mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
