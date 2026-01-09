import { useState } from 'react';
import { toast } from 'sonner';
import { PresentationForm } from '@/components/admin/presentation/PresentationForm';
import { PresentationData } from '@/types/corporatePresentation';
import { downloadCorporatePresentationPDF, generateCorporatePresentationPDF } from '@/lib/corporatePresentationPdf';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Download, Monitor, FileText, Info } from 'lucide-react';

const AdminCorporatePresentation = () => {
  const [lastGeneratedPresentation, setLastGeneratedPresentation] = useState<PresentationData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (data: PresentationData) => {
    setIsGenerating(true);
    try {
      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 300));
      downloadCorporatePresentationPDF(data);
      setLastGeneratedPresentation(data);
      toast.success('Presentation generated successfully!');
    } catch (error) {
      console.error('Error generating presentation:', error);
      toast.error('Error generating presentation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = () => {
    if (!lastGeneratedPresentation) return;
    
    try {
      const doc = generateCorporatePresentationPDF(lastGeneratedPresentation);
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error previewing presentation:', error);
      toast.error('Error previewing presentation');
    }
  };

  const handleRedownload = () => {
    if (!lastGeneratedPresentation) return;
    downloadCorporatePresentationPDF(lastGeneratedPresentation);
    toast.success('Presentation downloaded again!');
  };

  const countSelectedSections = (data: PresentationData) => {
    return Object.values(data.sections).filter(Boolean).length + 1; // +1 for cover
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal text-foreground">Corporate Presentation Generator</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create professional corporate presentations for potential clients
          </p>
        </div>
        {lastGeneratedPresentation && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={handleRedownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Again
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <PresentationForm onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Tips */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• <strong>Landscape</strong> format is ideal for presentations on screen</p>
              <p>• <strong>Portrait</strong> format works better for email attachments</p>
              <p>• Leave recipient blank for a generic company presentation</p>
              <p>• Toggle off sections to create a focused, shorter deck</p>
            </CardContent>
          </Card>

          {/* Last Generated */}
          {lastGeneratedPresentation && (
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">Last Generated</CardTitle>
                <CardDescription>Successfully created</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  {lastGeneratedPresentation.format === 'landscape' ? (
                    <Monitor className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                  <span className="capitalize">{lastGeneratedPresentation.format}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="uppercase">{lastGeneratedPresentation.language}</span>
                </div>
                {lastGeneratedPresentation.recipientCompany && (
                  <p className="text-muted-foreground">
                    For: {lastGeneratedPresentation.recipientCompany}
                  </p>
                )}
                <p className="text-muted-foreground">
                  {countSelectedSections(lastGeneratedPresentation)} pages
                </p>
              </CardContent>
            </Card>
          )}

          {/* PDF Structure */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">PDF Structure</CardTitle>
              <CardDescription>Possible sections in the presentation</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-black text-white text-xs flex items-center justify-center">1</span>
                Cover Page
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center">2</span>
                About NRRO
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center">3</span>
                Key Figures
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center">4</span>
                Practice Areas
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <span className="w-5 h-5 rounded bg-muted/50 text-xs flex items-center justify-center">•</span>
                Leadership Team (optional)
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <span className="w-5 h-5 rounded bg-muted/50 text-xs flex items-center justify-center">•</span>
                Industry Sectors (optional)
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <span className="w-5 h-5 rounded bg-muted/50 text-xs flex items-center justify-center">•</span>
                Client References (optional)
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center">5</span>
                Why NRRO
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center">6</span>
                Contact
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminCorporatePresentation;
