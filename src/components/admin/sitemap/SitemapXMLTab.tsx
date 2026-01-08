import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Download, ExternalLink, Copy, Check, Globe } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { sitemapEntries, generateSitemapXML, getSitemapCategories, SITEMAP_DOMAIN } from "@/config/sitemapConfig";

const SitemapXMLTab = () => {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [lastRegenerated, setLastRegenerated] = useState<string | null>(null);
  const [sitemapUrl, setSitemapUrl] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [copied, setCopied] = useState(false);

  const categories = getSitemapCategories();
  
  const filteredEntries = categoryFilter === "all" 
    ? sitemapEntries 
    : sitemapEntries.filter(e => e.category === categoryFilter);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('regenerate-sitemap-int');
      
      if (error) throw error;
      
      if (data.success) {
        setLastRegenerated(data.generatedAt);
        setSitemapUrl(data.url);
        toast.success(`Sitemap regenerated with ${data.urlCount} URLs`);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error: any) {
      console.error('Error regenerating sitemap:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleDownload = () => {
    const xml = generateSitemapXML(sitemapEntries);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap-int.xml';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Sitemap downloaded');
  };

  const handleCopyUrl = async () => {
    const url = `${SITEMAP_DOMAIN}/sitemap.xml`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 0.9) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (priority >= 0.7) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (priority >= 0.5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Core': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Spain Setup': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Geographic': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
      'Services': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Calculators': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
      'Content': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Lead Magnets': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'Company': 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
      'Legal': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Group entries by category for stats
  const statsByCategory = categories.map(cat => ({
    category: cat,
    count: sitemapEntries.filter(e => e.category === cat).length
  }));

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Sitemap XML - global.nrro.es
              </CardTitle>
              <CardDescription>
                Manage and regenerate the sitemap for the international site
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyUrl}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy URL
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleRegenerate} disabled={isRegenerating}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
                Regenerate & Publish
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Total URLs</p>
              <p className="text-2xl font-bold">{sitemapEntries.length}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Public URL</p>
              <a 
                href={`${SITEMAP_DOMAIN}/sitemap.xml`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                {SITEMAP_DOMAIN}/sitemap.xml
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Last Regenerated</p>
              <p className="text-sm">
                {lastRegenerated 
                  ? new Date(lastRegenerated).toLocaleString() 
                  : 'Not regenerated yet'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats by Category */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">URLs by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {statsByCategory.map(stat => (
              <div 
                key={stat.category}
                className="flex items-center gap-2 rounded-lg border px-3 py-2"
              >
                <Badge variant="secondary" className={getCategoryColor(stat.category)}>
                  {stat.category}
                </Badge>
                <span className="text-sm font-medium">{stat.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* URL List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">All URLs</CardTitle>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">
                      {entry.url}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getCategoryColor(entry.category)}>
                        {entry.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getPriorityColor(entry.priority)}>
                        {entry.priority.toFixed(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {entry.changefreq}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`${SITEMAP_DOMAIN}${entry.url}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Showing {filteredEntries.length} of {sitemapEntries.length} URLs
          </p>
        </CardContent>
      </Card>

      {/* XML Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">XML Preview</CardTitle>
          <CardDescription>
            First 10 entries of the generated sitemap
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-xs font-mono max-h-96">
            {generateSitemapXML(sitemapEntries.slice(0, 10))}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default SitemapXMLTab;
