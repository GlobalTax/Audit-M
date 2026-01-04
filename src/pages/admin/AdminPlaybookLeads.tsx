import { useState } from "react";
import { usePlaybookLeads, useDeletePlaybookLead, usePlaybookStats, PlaybookLeadFilters } from "@/hooks/usePlaybookLeads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Trash2, 
  Search,
  Calendar,
  Globe,
  Clock,
  Users
} from "lucide-react";
import { format } from "date-fns";

const AdminPlaybookLeads = () => {
  const [filters, setFilters] = useState<PlaybookLeadFilters>({});
  const { data: leads, isLoading } = usePlaybookLeads(filters);
  const { data: stats } = usePlaybookStats();
  const deleteMutation = useDeletePlaybookLead();
  const { toast } = useToast();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the lead for ${name}?`)) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast({
        title: "Lead deleted",
        description: "The lead has been removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the lead.",
        variant: "destructive",
      });
    }
  };

  const exportToCsv = () => {
    if (!leads || leads.length === 0) return;

    const headers = [
      "Name",
      "Email",
      "Company",
      "Job Title",
      "Country",
      "Timeline",
      "Playbook",
      "UTM Source",
      "UTM Campaign",
      "Downloaded At",
    ];

    const rows = leads.map((lead) => [
      lead.full_name,
      lead.email,
      lead.company_name,
      lead.job_title || "",
      lead.country,
      lead.timeline || "",
      lead.playbook_name,
      lead.utm_source || "",
      lead.utm_campaign || "",
      format(new Date(lead.created_at), "yyyy-MM-dd HH:mm"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `playbook-leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const timelineLabels: Record<string, string> = {
    immediate: "Immediate",
    "1-3-months": "1-3 months",
    "3-6-months": "3-6 months",
    "6-12-months": "6-12 months",
    exploring: "Exploring",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Playbook Downloads</h1>
          <p className="text-muted-foreground">
            Manage leads from downloadable resources
          </p>
        </div>
        <Button onClick={exportToCsv} disabled={!leads || leads.length === 0}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.total || 0}</p>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Calendar className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.thisMonth || 0}</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Globe className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Object.keys(stats?.byCountry || {}).length}
                </p>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {stats?.byTimeline?.immediate || 0}
                </p>
                <p className="text-sm text-muted-foreground">Immediate Interest</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, company..."
                  className="pl-10"
                  value={filters.search || ""}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, search: e.target.value }))
                  }
                />
              </div>
            </div>

            <Select
              value={filters.playbookName || "all"}
              onValueChange={(value) =>
                setFilters((f) => ({
                  ...f,
                  playbookName: value === "all" ? undefined : value,
                }))
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Lead Magnet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lead Magnets</SelectItem>
                <SelectItem value="spain-company-setup">Setup Playbook</SelectItem>
                <SelectItem value="spain-document-checklist">Document Checklist</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.timeline || "all"}
              onValueChange={(value) =>
                setFilters((f) => ({
                  ...f,
                  timeline: value === "all" ? undefined : value,
                }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Timelines</SelectItem>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="1-3-months">1-3 months</SelectItem>
                <SelectItem value="3-6-months">3-6 months</SelectItem>
                <SelectItem value="6-12-months">6-12 months</SelectItem>
                <SelectItem value="exploring">Exploring</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setFilters({})}
              disabled={Object.keys(filters).length === 0}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Leads ({leads?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading leads...
            </div>
          ) : !leads || leads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No leads found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Lead Magnet</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{lead.full_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {lead.email}
                        </p>
                        {lead.job_title && (
                          <p className="text-xs text-muted-foreground">
                            {lead.job_title}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{lead.company_name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          lead.playbook_name === "spain-document-checklist"
                            ? "outline"
                            : "secondary"
                        }
                      >
                        {lead.playbook_name === "spain-document-checklist"
                          ? "Document Checklist"
                          : "Setup Playbook"}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.country}</TableCell>
                    <TableCell>
                      {lead.timeline ? (
                        <Badge
                          variant={
                            lead.timeline === "immediate"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {timelineLabels[lead.timeline] || lead.timeline}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(lead.created_at), "MMM d, yyyy")}
                      <br />
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(lead.created_at), "HH:mm")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(lead.id, lead.full_name)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPlaybookLeads;
