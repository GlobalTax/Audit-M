import { useState } from 'react';
import { toast } from 'sonner';
import { PresentationForm } from '@/components/admin/presentation/PresentationForm';
import { PresentationData } from '@/types/corporatePresentation';
import { downloadCorporatePresentationPDF, generateCorporatePresentationPDF } from '@/lib/corporatePresentationPdf';
import { getCurrentSiteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Download, Monitor, FileText, Info } from 'lucide-react';

const AdminCorporatePresentation = () => {
  const siteConfig = getCurrentSiteConfig();
  const brandName = siteConfig.footer.brandName;
  const [lastGeneratedPresentation, setLastGeneratedPresentation] = useState<PresentationData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (data: PresentationData) => {
    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      downloadCorporatePresentationPDF(data);
      setLastGeneratedPresentation(data);
      toast.success('Presentación generada correctamente');
    } catch (error) {
      console.error('Error generating presentation:', error);
      toast.error('Error al generar la presentación. Inténtalo de nuevo.');
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
      toast.error('Error al previsualizar la presentación');
    }
  };

  const handleRedownload = () => {
    if (!lastGeneratedPresentation) return;
    downloadCorporatePresentationPDF(lastGeneratedPresentation);
    toast.success('Presentación descargada de nuevo');
  };

  const countSelectedSections = (data: PresentationData) => {
    return Object.values(data.sections).filter(Boolean).length + 1; // +1 for cover
  };

  const langLabel = (lang: string) => {
    if (lang === 'es') return 'Español';
    if (lang === 'en') return 'English';
    return 'Català';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal text-foreground flex items-center gap-3">
            <Monitor className="h-6 w-6 text-primary" />
            Presentación Corporativa
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Genera presentaciones corporativas profesionales para clientes potenciales
          </p>
        </div>
        {lastGeneratedPresentation && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Previsualizar
            </Button>
            <Button variant="outline" size="sm" onClick={handleRedownload}>
              <Download className="h-4 w-4 mr-2" />
              Descargar de nuevo
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
              <CardTitle className="text-lg font-normal flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                Consejos
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• El formato <strong>Horizontal</strong> es ideal para presentaciones en pantalla</p>
              <p>• El formato <strong>Vertical</strong> funciona mejor para adjuntos por email</p>
              <p>• Deja el destinatario vacío para una presentación genérica</p>
              <p>• Desactiva secciones para crear una presentación más breve y enfocada</p>
            </CardContent>
          </Card>

          {/* Last Generated */}
          {lastGeneratedPresentation && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-normal">Última Generada</CardTitle>
                <CardDescription>Creada correctamente</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  {lastGeneratedPresentation.format === 'landscape' ? (
                    <Monitor className="h-4 w-4" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                  <span>{lastGeneratedPresentation.format === 'landscape' ? 'Horizontal' : 'Vertical'}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>{langLabel(lastGeneratedPresentation.language)}</span>
                </div>
                {lastGeneratedPresentation.recipientCompany && (
                  <p className="text-muted-foreground">
                    Para: {lastGeneratedPresentation.recipientCompany}
                  </p>
                )}
                <p className="text-muted-foreground">
                  {countSelectedSections(lastGeneratedPresentation)} páginas
                </p>
              </CardContent>
            </Card>
          )}

          {/* PDF Structure */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-normal">Estructura del PDF</CardTitle>
              <CardDescription>Secciones posibles en la presentación</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
                Portada
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center">2</span>
                Sobre {brandName}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center">3</span>
                Cifras Clave
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center">4</span>
                Áreas de Servicio
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <span className="w-5 h-5 rounded bg-muted/50 text-xs flex items-center justify-center">•</span>
                Equipo Directivo (opcional)
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <span className="w-5 h-5 rounded bg-muted/50 text-xs flex items-center justify-center">•</span>
                Sectores de Actividad (opcional)
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <span className="w-5 h-5 rounded bg-muted/50 text-xs flex items-center justify-center">•</span>
                Referencias de Clientes (opcional)
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center">5</span>
                Por Qué {brandName}
              </p>
              <p className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-muted text-xs flex items-center justify-center">6</span>
                Contacto
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminCorporatePresentation;
