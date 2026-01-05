import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  FileText, 
  ClipboardList, 
  HelpCircle, 
  Calculator,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Target,
  Trophy,
  Zap
} from "lucide-react";
import { useLeadMagnetStats, DateRange, LeadMagnetStat } from "@/hooks/useLeadMagnetStats";

const iconMap = {
  FileText,
  ClipboardList,
  HelpCircle,
  Calculator,
};

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "all", label: "All time" },
];

function PerformanceBadge({ status }: { status: LeadMagnetStat["performanceStatus"] }) {
  const config = {
    high: { label: "High Performer", variant: "default" as const, className: "bg-green-100 text-green-800 hover:bg-green-100" },
    "on-track": { label: "On Track", variant: "secondary" as const, className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    attention: { label: "Needs Attention", variant: "outline" as const, className: "bg-orange-100 text-orange-800 hover:bg-orange-100" },
    new: { label: "New", variant: "outline" as const, className: "bg-purple-100 text-purple-800 hover:bg-purple-100" },
  };

  const { label, className } = config[status];
  return <Badge className={className}>{label}</Badge>;
}

function TrendIndicator({ trend, direction }: { trend: number; direction: "up" | "down" | "neutral" }) {
  if (direction === "neutral") {
    return (
      <span className="flex items-center gap-1 text-muted-foreground">
        <Minus className="h-4 w-4" />
        <span className="text-sm">0%</span>
      </span>
    );
  }

  const isUp = direction === "up";
  return (
    <span className={`flex items-center gap-1 ${isUp ? "text-green-600" : "text-red-600"}`}>
      {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
      <span className="text-sm font-medium">{trend}%</span>
    </span>
  );
}

interface LeadMagnetComparisonTableProps {
  showFilters?: boolean;
  compact?: boolean;
}

export function LeadMagnetComparisonTable({ 
  showFilters = true, 
  compact = false 
}: LeadMagnetComparisonTableProps) {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const { data, isLoading, error } = useLeadMagnetStats(dateRange);

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Failed to load lead magnet data. Please try again.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-normal">Lead Magnet Performance</h2>
          <p className="text-sm text-muted-foreground">
            Compare downloads, conversion rates, and trends across Spain setup resources
          </p>
        </div>
        {showFilters && (
          <div className="flex gap-2">
            {dateRangeOptions.map((option) => (
              <Button
                key={option.value}
                variant={dateRange === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setDateRange(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{data?.totals.allTime || 0}</div>
                  <p className="text-xs text-muted-foreground">all-time across all resources</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">This Period</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{data?.totals.thisPeriod || 0}</div>
                  <p className="text-xs text-muted-foreground">within selected date range</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <>
                  <div className="text-2xl font-bold truncate">{data?.totals.topPerformer || "N/A"}</div>
                  <p className="text-xs text-muted-foreground">{data?.totals.topPerformerShare || 0}% of all downloads</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">High-Intent Leads</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <>
                  <div className="text-2xl font-bold">{data?.totals.immediateTotal || 0}</div>
                  <p className="text-xs text-muted-foreground">marked as "immediate" timeline</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-normal">Resource Comparison</CardTitle>
          <CardDescription>Performance metrics for each lead magnet</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : data?.stats.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <Download className="mx-auto h-12 w-12 opacity-50 mb-4" />
              <p>No downloads recorded yet.</p>
              <p className="text-sm">Lead magnets will appear here once visitors start downloading resources.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  <TableHead className="text-right">Downloads</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">This Period</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Top Country</TableHead>
                  <TableHead className="text-center">Trend</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.stats.map((stat) => {
                  const IconComponent = iconMap[stat.icon];
                  return (
                    <TableRow key={stat.name}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">{stat.displayName}</div>
                            <div className="text-xs text-muted-foreground hidden sm:block">
                              {stat.immediateCount} high-intent
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold">{stat.totalDownloads}</TableCell>
                      <TableCell className="text-right hidden sm:table-cell">{stat.periodDownloads}</TableCell>
                      <TableCell className="text-right hidden md:table-cell text-muted-foreground">
                        {stat.topCountry}
                      </TableCell>
                      <TableCell className="text-center">
                        <TrendIndicator trend={stat.trend} direction={stat.trendDirection} />
                      </TableCell>
                      <TableCell className="text-right">
                        <PerformanceBadge status={stat.performanceStatus} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
