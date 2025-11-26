import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Target, Copy, Save, X } from "lucide-react";
import { generateLandingPrompt, PromptInputs } from "@/lib/landingPromptUtils";
import { toast } from "sonner";

const CATEGORIES = [
  "Tax",
  "Legal",
  "Payroll",
  "M&A",
  "Corporate",
  "International",
  "Family Business",
  "Contact",
  "Other",
];

interface LandingPromptGeneratorProps {
  onSaveToNotes?: (prompt: string) => void;
  initialData?: Partial<PromptInputs>;
}

export const LandingPromptGenerator = ({ 
  onSaveToNotes,
  initialData 
}: LandingPromptGeneratorProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [targetAudience, setTargetAudience] = useState(initialData?.targetAudience || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || []);
  const [ctaInput, setCtaInput] = useState("");
  const [requiredCTAs, setRequiredCTAs] = useState<string[]>(initialData?.requiredCTAs || []);
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const addCTA = () => {
    const trimmed = ctaInput.trim();
    if (trimmed && !requiredCTAs.includes(trimmed)) {
      setRequiredCTAs([...requiredCTAs, trimmed]);
      setCtaInput("");
    }
  };

  const removeCTA = (cta: string) => {
    setRequiredCTAs(requiredCTAs.filter(c => c !== cta));
  };

  const handleGeneratePrompt = () => {
    if (!title.trim()) {
      toast.error("Por favor, introduce un título para la landing");
      return;
    }

    const inputs: PromptInputs = {
      title,
      targetAudience,
      category,
      keywords,
      requiredCTAs,
      notes,
    };

    const prompt = generateLandingPrompt(inputs);
    setGeneratedPrompt(prompt);
    toast.success("Prompt generado con éxito");
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      toast.success("Prompt copiado al portapapeles");
    } catch (error) {
      toast.error("Error al copiar el prompt");
    }
  };

  const handleSaveToNotes = () => {
    if (onSaveToNotes) {
      onSaveToNotes(generatedPrompt);
      toast.success("Prompt guardado en las notas");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm border-gray-100">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>Generador de Prompts para Landings</CardTitle>
          </div>
          <CardDescription>
            Crea prompts estandarizados para nuevas landing pages siguiendo el estilo Navarro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Título de la Landing <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Ej: Abogados de Herencias en Barcelona"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">
              Audiencia Objetivo <span className="text-destructive">*</span>
            </Label>
            <Input
              id="audience"
              placeholder="Ej: Herederos españoles, expatriados, no residentes"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecciona categoría" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords Principales</Label>
            <div className="flex gap-2">
              <Input
                id="keywords"
                placeholder="Añade keyword y presiona Enter"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addKeyword();
                  }
                }}
              />
              <Button type="button" onClick={addKeyword} variant="outline">
                Añadir
              </Button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="gap-1">
                    {keyword}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeKeyword(keyword)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctas">CTAs Requeridos</Label>
            <div className="flex gap-2">
              <Input
                id="ctas"
                placeholder="Ej: Solicitar Consulta Gratuita"
                value={ctaInput}
                onChange={(e) => setCtaInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCTA();
                  }
                }}
              />
              <Button type="button" onClick={addCTA} variant="outline">
                Añadir
              </Button>
            </div>
            {requiredCTAs.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {requiredCTAs.map((cta) => (
                  <Badge key={cta} variant="secondary" className="gap-1">
                    {cta}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeCTA(cta)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Incluir FAQ con 5-7 preguntas, destacar experiencia internacional..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button 
            onClick={handleGeneratePrompt} 
            className="w-full"
            size="lg"
          >
            <Target className="mr-2 h-4 w-4" />
            Generar Prompt para Landing
          </Button>
        </CardContent>
      </Card>

      {generatedPrompt && (
        <Card className="bg-white shadow-sm border-gray-100">
          <CardHeader>
            <CardTitle>Prompt Generado</CardTitle>
            <CardDescription>
              Usa este prompt para crear la landing page con tu herramienta preferida
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <pre className="whitespace-pre-wrap text-sm font-mono text-foreground">
                {generatedPrompt}
              </pre>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopyPrompt} variant="outline" className="flex-1">
                <Copy className="mr-2 h-4 w-4" />
                Copiar Prompt
              </Button>
              {onSaveToNotes && (
                <Button onClick={handleSaveToNotes} variant="outline" className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar en Notas
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
