import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { subDays, startOfDay } from "date-fns";

export type DateRange = "7d" | "30d" | "90d" | "all";

export interface LeadMagnetStat {
  name: string;
  displayName: string;
  icon: "FileText" | "ClipboardList" | "HelpCircle" | "Calculator";
  totalDownloads: number;
  periodDownloads: number;
  previousPeriodDownloads: number;
  trend: number;
  trendDirection: "up" | "down" | "neutral";
  topCountry: string;
  immediateCount: number;
  performanceStatus: "high" | "on-track" | "attention" | "new";
}

export interface LeadMagnetTotals {
  allTime: number;
  thisPeriod: number;
  topPerformer: string;
  topPerformerShare: number;
  immediateTotal: number;
}

const LEAD_MAGNET_CONFIG = [
  { name: "spain-company-setup", displayName: "Setup Playbook", icon: "FileText" as const },
  { name: "spain-document-checklist", displayName: "Document Checklist", icon: "ClipboardList" as const },
  { name: "spain-readiness-quiz", displayName: "Readiness Quiz", icon: "HelpCircle" as const },
  { name: "spain-setup-calculator", displayName: "Cost Calculator", icon: "Calculator" as const },
];

function getPeriodDays(period: DateRange): number | null {
  switch (period) {
    case "7d": return 7;
    case "30d": return 30;
    case "90d": return 90;
    case "all": return null;
  }
}

function calculateTrend(current: number, previous: number): { trend: number; direction: "up" | "down" | "neutral" } {
  if (previous === 0) {
    return { trend: current > 0 ? 100 : 0, direction: current > 0 ? "up" : "neutral" };
  }
  const change = ((current - previous) / previous) * 100;
  if (Math.abs(change) < 2) {
    return { trend: 0, direction: "neutral" };
  }
  return { trend: Math.abs(Math.round(change)), direction: change > 0 ? "up" : "down" };
}

function getPerformanceStatus(
  downloads: number,
  trend: number,
  trendDirection: string,
  firstDownloadDate: Date | null
): "high" | "on-track" | "attention" | "new" {
  if (firstDownloadDate && (Date.now() - firstDownloadDate.getTime()) < 7 * 24 * 60 * 60 * 1000) {
    return "new";
  }
  if (downloads > 50 || (trend > 15 && trendDirection === "up")) {
    return "high";
  }
  if (trendDirection === "down" && trend > 10) {
    return "attention";
  }
  return "on-track";
}

export const useLeadMagnetStats = (period: DateRange = "30d") => {
  return useQuery({
    queryKey: ["lead-magnet-stats", period],
    queryFn: async () => {
      const { data: allLeads, error } = await supabase
        .from("playbook_leads")
        .select("playbook_name, country, timeline, created_at")
        .order("created_at", { ascending: true });

      if (error) throw error;

      const leads = allLeads || [];
      const now = new Date();
      const periodDays = getPeriodDays(period);
      
      const periodStart = periodDays ? startOfDay(subDays(now, periodDays)) : null;
      const previousPeriodStart = periodDays ? startOfDay(subDays(now, periodDays * 2)) : null;

      const stats: LeadMagnetStat[] = LEAD_MAGNET_CONFIG.map((config) => {
        const resourceLeads = leads.filter((l) => l.playbook_name === config.name);
        const totalDownloads = resourceLeads.length;

        const periodDownloads = periodStart
          ? resourceLeads.filter((l) => new Date(l.created_at) >= periodStart).length
          : totalDownloads;

        const previousPeriodDownloads = previousPeriodStart && periodStart
          ? resourceLeads.filter((l) => {
              const date = new Date(l.created_at);
              return date >= previousPeriodStart && date < periodStart;
            }).length
          : 0;

        const { trend, direction } = calculateTrend(periodDownloads, previousPeriodDownloads);

        // Calculate top country
        const countryCount: Record<string, number> = {};
        resourceLeads.forEach((l) => {
          countryCount[l.country] = (countryCount[l.country] || 0) + 1;
        });
        const topCountry = Object.entries(countryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

        // Calculate immediate interest
        const immediateCount = resourceLeads.filter((l) => l.timeline === "immediate").length;

        // First download date
        const firstDownloadDate = resourceLeads.length > 0 ? new Date(resourceLeads[0].created_at) : null;

        return {
          ...config,
          totalDownloads,
          periodDownloads,
          previousPeriodDownloads,
          trend,
          trendDirection: direction,
          topCountry,
          immediateCount,
          performanceStatus: getPerformanceStatus(periodDownloads, trend, direction, firstDownloadDate),
        };
      });

      // Calculate totals
      const allTime = stats.reduce((sum, s) => sum + s.totalDownloads, 0);
      const thisPeriod = stats.reduce((sum, s) => sum + s.periodDownloads, 0);
      const immediateTotal = stats.reduce((sum, s) => sum + s.immediateCount, 0);

      const topPerformerStat = [...stats].sort((a, b) => b.totalDownloads - a.totalDownloads)[0];
      const topPerformer = topPerformerStat?.displayName || "N/A";
      const topPerformerShare = allTime > 0 ? Math.round((topPerformerStat?.totalDownloads || 0) / allTime * 100) : 0;

      const totals: LeadMagnetTotals = {
        allTime,
        thisPeriod,
        topPerformer,
        topPerformerShare,
        immediateTotal,
      };

      return { stats, totals };
    },
  });
};
