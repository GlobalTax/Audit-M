import { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProposalForm } from '@/components/admin/proposal/ProposalForm';
import { ProposalData } from '@/types/proposal';
import { downloadProposalPDF, generateProposalPDF } from '@/lib/proposalPdfGenerator';
import { toast } from 'sonner';

export const AdminProposalGenerator = () => {
  const [lastGeneratedProposal, setLastGeneratedProposal] = useState<ProposalData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (data: ProposalData) => {
    setIsGenerating(true);
    try {
      downloadProposalPDF(data);
      setLastGeneratedProposal(data);
      toast.success('Proposal PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreview = () => {
    if (!lastGeneratedProposal) return;
    
    try {
      const doc = generateProposalPDF(lastGeneratedProposal);
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error previewing PDF:', error);
      toast.error('Failed to preview PDF');
    }
  };

  const handleRedownload = () => {
    if (!lastGeneratedProposal) return;
    downloadProposalPDF(lastGeneratedProposal);
    toast.success('PDF downloaded again');
  };

  // Calculate totals for the summary
  const calculateTotals = (data: ProposalData) => {
    const monthly = data.selectedServices
      .filter(s => !s.isOneTime)
      .reduce((sum, s) => sum + s.monthlyFee, 0);
    const annual = data.selectedServices
      .reduce((sum, s) => sum + (s.annualFee || s.monthlyFee * (s.isOneTime ? 1 : 12)), 0);
    return { monthly, annual };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal text-foreground flex items-center gap-3">
            <FileText className="h-6 w-6 text-amber-500" />
            Proposal Generator
          </h1>
          <p className="text-muted-foreground mt-1">
            Create professional PDF proposals for clients
          </p>
        </div>
        {lastGeneratedProposal && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={handleRedownload}>
              <Download className="h-4 w-4 mr-2" />
              Download Again
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <ProposalForm onGenerate={handleGenerate} />
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Select services and set monthly fees</p>
              <p>• Annual fees are calculated automatically (12x monthly)</p>
              <p>• Use "One-time" for setup or project fees</p>
              <p>• The PDF will be generated in A4 vertical format</p>
              <p>• Proposal number is auto-generated</p>
            </CardContent>
          </Card>

          {lastGeneratedProposal && (
            <Card className="border-amber-500/50 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-lg">Last Generated</CardTitle>
                <CardDescription>
                  {lastGeneratedProposal.proposalNumber}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Client:</strong> {lastGeneratedProposal.companyName}</p>
                <p><strong>Contact:</strong> {lastGeneratedProposal.clientName}</p>
                <p><strong>Services:</strong> {lastGeneratedProposal.selectedServices.length}</p>
                <div className="pt-2 border-t">
                  <p className="font-medium">
                    Monthly: €{calculateTotals(lastGeneratedProposal).monthly.toLocaleString()}
                  </p>
                  <p className="font-medium text-amber-600">
                    Annual: €{calculateTotals(lastGeneratedProposal).annual.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PDF Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>1. Cover Page</p>
              <p>2. About NRRO</p>
              <p>3. Services Detail</p>
              <p>4. Economic Proposal</p>
              <p>5. Why NRRO</p>
              <p>6. Next Steps & Contact</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProposalGenerator;
