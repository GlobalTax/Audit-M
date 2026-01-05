import { useState } from "react";
import { useCalculatorSettingsByCategory, useDeleteCalculatorSetting, CalculatorSetting } from "@/hooks/useCalculatorSettings";
import { CalculatorSettingDialog } from "@/components/admin/calculator/CalculatorSettingDialog";
import { CalculatorPreviewPanel } from "@/components/admin/calculator/CalculatorPreviewPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Clock, Euro, Settings } from "lucide-react";

const ENTITY_LABELS: Record<string, string> = {
  sl: 'SL',
  sa: 'SA',
  branch: 'Branch',
  subsidiary: 'Subsidiary',
  global: 'Global',
};

export default function AdminCalculatorSettings() {
  const { data, isLoading } = useCalculatorSettingsByCategory();
  const deleteMutation = useDeleteCalculatorSetting();
  
  const [activeTab, setActiveTab] = useState<'timeline' | 'cost' | 'general'>('timeline');
  const [entityFilter, setEntityFilter] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'edit' | 'create'>('edit');
  const [selectedSetting, setSelectedSetting] = useState<CalculatorSetting | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [settingToDelete, setSettingToDelete] = useState<CalculatorSetting | null>(null);
  
  const handleEdit = (setting: CalculatorSetting) => {
    setSelectedSetting(setting);
    setDialogMode('edit');
    setDialogOpen(true);
  };
  
  const handleCreate = () => {
    setSelectedSetting(null);
    setDialogMode('create');
    setDialogOpen(true);
  };
  
  const handleDeleteClick = (setting: CalculatorSetting) => {
    setSettingToDelete(setting);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (settingToDelete) {
      await deleteMutation.mutateAsync(settingToDelete.id);
      setDeleteDialogOpen(false);
      setSettingToDelete(null);
    }
  };
  
  const getFilteredSettings = () => {
    if (!data?.grouped) return [];
    
    const categoryData = data.grouped[activeTab] || {};
    
    if (entityFilter === 'all') {
      return Object.values(categoryData).flat().sort((a, b) => {
        // Sort by entity type first, then by display_order
        const entityOrder = ['sl', 'sa', 'branch', 'subsidiary', 'global', null];
        const aIdx = entityOrder.indexOf(a.entity_type as string);
        const bIdx = entityOrder.indexOf(b.entity_type as string);
        if (aIdx !== bIdx) return aIdx - bIdx;
        return a.display_order - b.display_order;
      });
    }
    
    const entityKey = entityFilter === 'global' ? 'global' : entityFilter;
    return categoryData[entityKey] || [];
  };
  
  const filteredSettings = getFilteredSettings();
  
  const formatValue = (setting: CalculatorSetting) => {
    if (activeTab === 'cost') {
      return `€${Number(setting.min_value).toLocaleString()} – €${Number(setting.max_value).toLocaleString()}`;
    }
    return `${setting.min_value} – ${setting.max_value} weeks`;
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-normal">Calculator Settings</h1>
          <p className="text-muted-foreground">
            Manage costs, timelines, and descriptions for the Spain Setup Calculator
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Setting
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'timeline' | 'cost' | 'general')}>
                  <TabsList>
                    <TabsTrigger value="timeline" className="gap-2">
                      <Clock className="w-4 h-4" />
                      Timeline
                    </TabsTrigger>
                    <TabsTrigger value="cost" className="gap-2">
                      <Euro className="w-4 h-4" />
                      Costs
                    </TabsTrigger>
                    <TabsTrigger value="general" className="gap-2">
                      <Settings className="w-4 h-4" />
                      General
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Select value={entityFilter} onValueChange={setEntityFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Entities</SelectItem>
                    <SelectItem value="sl">SL</SelectItem>
                    <SelectItem value="sa">SA</SelectItem>
                    <SelectItem value="branch">Branch</SelectItem>
                    <SelectItem value="subsidiary">Subsidiary</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entity</TableHead>
                    <TableHead>Concept</TableHead>
                    <TableHead>Range</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="w-[50px]">Order</TableHead>
                    <TableHead className="w-[80px]">Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSettings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No settings found for this category/filter
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSettings.map((setting) => (
                      <TableRow key={setting.id}>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {ENTITY_LABELS[setting.entity_type || 'global']}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{setting.item_label}</p>
                            <p className="text-xs text-muted-foreground">{setting.item_key}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {formatValue(setting)}
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <p className="text-xs text-muted-foreground truncate">
                            {setting.item_notes || '—'}
                          </p>
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          {setting.display_order}
                        </TableCell>
                        <TableCell>
                          <Badge variant={setting.is_active ? 'default' : 'secondary'}>
                            {setting.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(setting)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(setting)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <CalculatorPreviewPanel settings={data?.settings || []} />
        </div>
      </div>
      
      {/* Edit/Create Dialog */}
      <CalculatorSettingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        setting={selectedSetting}
        mode={dialogMode}
        defaultCategory={activeTab}
        defaultEntityType={entityFilter === 'all' ? 'sl' : entityFilter}
      />
      
      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Setting</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{settingToDelete?.item_label}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
