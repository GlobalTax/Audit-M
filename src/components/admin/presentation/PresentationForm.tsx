import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PresentationData, DEFAULT_SECTIONS, SECTION_LABELS } from '@/types/corporatePresentation';
import { FileDown, Monitor, FileText, Globe } from 'lucide-react';

interface PresentationFormProps {
  onGenerate: (data: PresentationData) => void;
  isGenerating: boolean;
}

export const PresentationForm = ({ onGenerate, isGenerating }: PresentationFormProps) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientCompany, setRecipientCompany] = useState('');
  const [format, setFormat] = useState<'landscape' | 'portrait'>('landscape');
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [presentationDate, setPresentationDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [sections, setSections] = useState(DEFAULT_SECTIONS);

  const handleSectionToggle = (key: keyof typeof sections) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    const data: PresentationData = {
      recipientName: recipientName || undefined,
      recipientCompany: recipientCompany || undefined,
      format,
      language,
      presentationDate,
      sections,
    };
    onGenerate(data);
  };

  const sectionLabels = SECTION_LABELS[language];

  return (
    <div className="space-y-6">
      {/* Format & Language */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-normal">Format & Language</CardTitle>
          <CardDescription>Choose the presentation format and language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Format */}
          <div className="space-y-3">
            <Label className="font-medium">Format</Label>
            <RadioGroup
              value={format}
              onValueChange={(val) => setFormat(val as 'landscape' | 'portrait')}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <RadioGroupItem
                  value="landscape"
                  id="landscape"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="landscape"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Monitor className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Landscape</span>
                  <span className="text-xs text-muted-foreground">Slide deck style</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem
                  value="portrait"
                  id="portrait"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="portrait"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <FileText className="h-8 w-8 mb-2" />
                  <span className="text-sm font-medium">Portrait</span>
                  <span className="text-xs text-muted-foreground">Document style</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Language */}
          <div className="space-y-3">
            <Label className="font-medium">Language</Label>
            <RadioGroup
              value={language}
              onValueChange={(val) => setLanguage(val as 'en' | 'es')}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <RadioGroupItem value="en" id="lang-en" className="peer sr-only" />
                <Label
                  htmlFor="lang-en"
                  className="flex items-center justify-center gap-2 rounded-lg border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">English</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="es" id="lang-es" className="peer sr-only" />
                <Label
                  htmlFor="lang-es"
                  className="flex items-center justify-center gap-2 rounded-lg border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">Español</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Recipient (Optional) */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-normal">Recipient (Optional)</CardTitle>
          <CardDescription>Personalize the presentation for a specific recipient</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-medium">Company Name</Label>
              <Input
                placeholder="Acme Corporation"
                value={recipientCompany}
                onChange={(e) => setRecipientCompany(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-medium">Contact Name</Label>
              <Input
                placeholder="John Smith"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="font-medium">Presentation Date</Label>
            <Input
              type="date"
              value={presentationDate}
              onChange={(e) => setPresentationDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sections */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-normal">Sections to Include</CardTitle>
          <CardDescription>Toggle sections on/off to customize the presentation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {(Object.keys(sections) as Array<keyof typeof sections>).map((key) => (
            <div
              key={key}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <Label className="font-medium cursor-pointer" htmlFor={`section-${key}`}>
                {sectionLabels[key]}
              </Label>
              <Switch
                id={`section-${key}`}
                checked={sections[key]}
                onCheckedChange={() => handleSectionToggle(key)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full h-12 text-base bg-amber-500 hover:bg-amber-600 text-black"
        size="lg"
      >
        <FileDown className="mr-2 h-5 w-5" />
        {isGenerating ? 'Generating...' : 'Generate & Download PDF'}
      </Button>
    </div>
  );
};
