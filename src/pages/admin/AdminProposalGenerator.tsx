import { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProposalForm } from '@/components/admin/proposal/ProposalForm';
import { ProposalData } from '@/types/proposal';
import { downloadProposalPDF, generateProposalPDF } from '@/lib/proposalPdfGenerator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { getCurrentSiteConfig } from '@/config/site';

const siteConfig = getCurrentSiteConfig();

export const AdminProposalGenerator = () => {
  const { adminUser } = useAuth();
  const [lastGeneratedProposal, setLastGeneratedProposal] = useState<ProposalData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const saveProposalToDb = async (data: ProposalData, totalAmount: number) => {
    try {
      await supabase.from('proposals').insert({
        proposal_number: data.proposalNumber,
        client_name: data.clientName,
        client_company: data.companyName,
        client_email: data.clientEmail,
        services: data.selectedServices.map(s => ({
          id: s.id,
          name: s.name,
          nameEs: s.nameEs,
          monthlyFee: s.monthlyFee,
          annualFee: s.annualFee,
          isOneTime: s.isOneTime,
        })),
        fees: {
          monthly: data.selectedServices.filter(s => !s.isOneTime).reduce((sum, s) => sum + s.monthlyFee, 0),
          annual: totalAmount,
        },
        total_amount: totalAmount,
        valid_until: data.validUntil,
        notes: data.additionalNotes || null,
        status: 'new',
        created_by: adminUser?.id || null,
      });
    } catch (error) {
      console.error('Error saving proposal to DB:', error);
    }
  };

  const handleGenerate = async (data: ProposalData) => {
    setIsGenerating(true);
    try {
      downloadProposalPDF(data);
      setLastGeneratedProposal(data);

      const totalAnnual = data.selectedServices
        .reduce((sum, s) => sum + (s.annualFee || s.monthlyFee * (s.isOneTime ? 1 : 12)), 0);
      await saveProposalToDb(data, totalAnnual);

      toast.success('Propuesta PDF generada correctamente');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error al generar el PDF. Inténtalo de nuevo.');
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
      toast.error('Error al previsualizar el PDF');
    }
  };

  const handleRedownload = () => {
    if (!lastGeneratedProposal) return;
    downloadProposalPDF(lastGeneratedProposal);
    toast.success('PDF descargado');
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal text-foreground flex items-center gap-3">
            <FileText className="h-6 w-6 text-amber-500" />
            Generador de Propuestas
          </h1>
          <p className="text-muted-foreground mt-1">
            Crea propuestas PDF profesionales para clientes de {siteConfig.name}
          </p>
        </div>
        {lastGeneratedProposal && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Previsualizar
            </Button>
            <Button variant="outline" onClick={handleRedownload}>
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProposalForm onGenerate={handleGenerate} />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instrucciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>1. Selecciona los servicios de auditoría</p>
              <p>2. Configura los honorarios mensuales o por encargo</p>
              <p>3. Los honorarios anuales se calculan automáticamente</p>
              <p>4. El PDF se genera en formato A4 vertical</p>
              <p>5. La propuesta se guarda automáticamente en el sistema</p>
            </CardContent>
          </Card>

          {lastGeneratedProposal && (
            <Card className="border-amber-500/50 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-lg">Última Propuesta</CardTitle>
                <CardDescription>
                  {lastGeneratedProposal.proposalNumber}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Cliente:</strong> {lastGeneratedProposal.companyName}</p>
                <p><strong>Contacto:</strong> {lastGeneratedProposal.clientName}</p>
                <p><strong>Servicios:</strong> {lastGeneratedProposal.selectedServices.length}</p>
                <div className="pt-2 border-t">
                  <p className="font-medium">
                    Mensual: {calculateTotals(lastGeneratedProposal).monthly.toLocaleString('es-ES')} EUR
                  </p>
                  <p className="font-medium text-amber-600">
                    Anual: {calculateTotals(lastGeneratedProposal).annual.toLocaleString('es-ES')} EUR
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estructura del PDF</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>1. Portada</p>
              <p>2. Sobre {siteConfig.name}</p>
              <p>3. Detalle de Servicios</p>
              <p>4. Propuesta Económica</p>
              <p>5. Por Qué {siteConfig.name}</p>
              <p>6. Próximos Pasos y Contacto</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProposalGenerator;
