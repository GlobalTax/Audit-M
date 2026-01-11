import { useState, useEffect } from 'react';
import { useDefaultBrandKit, useUpdateBrandKit, BrandTokens } from '@/hooks/useBrandKits';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Type, Layout, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const defaultTokens: BrandTokens = {
  fonts: { heading: 'General Sans', body: 'General Sans' },
  colors: {
    bg: '#FFFFFF',
    surface: '#F7F7F8',
    text: '#0C1E21',
    mutedText: '#5B5B5B',
    primary: '#0C1E21',
    accent: '#C9A962',
    border: '#E6E6E6',
  },
  typography: {
    h1: { size: 44, weight: 400, lineHeight: 1.1 },
    h2: { size: 30, weight: 400, lineHeight: 1.15 },
    body: { size: 16, weight: 400, lineHeight: 1.45 },
  },
  spacing: { slidePadding: 56, gap: 18 },
  radius: { card: 12, button: 8 },
  shadow: { card: '0 10px 30px rgba(0,0,0,0.08)' },
};

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs text-slate-600">{label}</Label>
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded border border-slate-200 cursor-pointer" 
          style={{ backgroundColor: value }}
          onClick={() => document.getElementById(`color-${label}`)?.click()}
        />
        <Input
          id={`color-${label}`}
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="sr-only"
        />
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          className="font-mono text-xs h-8"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange, unit = '' }: { label: string; value: number; onChange: (v: number) => void; unit?: string }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs text-slate-600">{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="h-8"
        />
        {unit && <span className="text-xs text-slate-500">{unit}</span>}
      </div>
    </div>
  );
}

export default function DeckStudioBrand() {
  const { data: brandKit, isLoading } = useDefaultBrandKit();
  const updateBrandKit = useUpdateBrandKit();
  const [tokens, setTokens] = useState<BrandTokens>(defaultTokens);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (brandKit?.tokens_json) {
      setTokens(brandKit.tokens_json);
    }
  }, [brandKit]);

  const handleUpdateTokens = (path: string[], value: any) => {
    setTokens(prev => {
      const newTokens = JSON.parse(JSON.stringify(prev));
      let current = newTokens;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newTokens;
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!brandKit) return;
    
    try {
      await updateBrandKit.mutateAsync({
        id: brandKit.id,
        tokens_json: tokens as any,
      });
      toast.success('Brand kit saved');
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to save brand kit');
    }
  };

  const handleReset = () => {
    setTokens(defaultTokens);
    setHasChanges(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 animate-pulse rounded" />
        <div className="h-96 bg-slate-100 animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-normal text-slate-900">Brand Kit</h1>
          <p className="text-slate-500 mt-1">
            Customize design tokens for your presentations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || updateBrandKit.isPending}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="colors">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="colors" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Typography
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    Layout
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <ColorInput 
                      label="Background" 
                      value={tokens.colors.bg} 
                      onChange={v => handleUpdateTokens(['colors', 'bg'], v)} 
                    />
                    <ColorInput 
                      label="Surface" 
                      value={tokens.colors.surface} 
                      onChange={v => handleUpdateTokens(['colors', 'surface'], v)} 
                    />
                    <ColorInput 
                      label="Text" 
                      value={tokens.colors.text} 
                      onChange={v => handleUpdateTokens(['colors', 'text'], v)} 
                    />
                    <ColorInput 
                      label="Muted Text" 
                      value={tokens.colors.mutedText} 
                      onChange={v => handleUpdateTokens(['colors', 'mutedText'], v)} 
                    />
                    <ColorInput 
                      label="Primary" 
                      value={tokens.colors.primary} 
                      onChange={v => handleUpdateTokens(['colors', 'primary'], v)} 
                    />
                    <ColorInput 
                      label="Accent" 
                      value={tokens.colors.accent} 
                      onChange={v => handleUpdateTokens(['colors', 'accent'], v)} 
                    />
                    <ColorInput 
                      label="Border" 
                      value={tokens.colors.border} 
                      onChange={v => handleUpdateTokens(['colors', 'border'], v)} 
                    />
                  </div>
                </TabsContent>

                <TabsContent value="typography" className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Fonts</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-xs text-slate-600">Heading Font</Label>
                        <Input
                          value={tokens.fonts.heading}
                          onChange={e => handleUpdateTokens(['fonts', 'heading'], e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-slate-600">Body Font</Label>
                        <Input
                          value={tokens.fonts.body}
                          onChange={e => handleUpdateTokens(['fonts', 'body'], e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">H1 Style</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <NumberInput 
                        label="Size" 
                        value={tokens.typography.h1.size} 
                        onChange={v => handleUpdateTokens(['typography', 'h1', 'size'], v)}
                        unit="px"
                      />
                      <NumberInput 
                        label="Weight" 
                        value={tokens.typography.h1.weight} 
                        onChange={v => handleUpdateTokens(['typography', 'h1', 'weight'], v)}
                      />
                      <NumberInput 
                        label="Line Height" 
                        value={tokens.typography.h1.lineHeight} 
                        onChange={v => handleUpdateTokens(['typography', 'h1', 'lineHeight'], v)}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">H2 Style</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <NumberInput 
                        label="Size" 
                        value={tokens.typography.h2.size} 
                        onChange={v => handleUpdateTokens(['typography', 'h2', 'size'], v)}
                        unit="px"
                      />
                      <NumberInput 
                        label="Weight" 
                        value={tokens.typography.h2.weight} 
                        onChange={v => handleUpdateTokens(['typography', 'h2', 'weight'], v)}
                      />
                      <NumberInput 
                        label="Line Height" 
                        value={tokens.typography.h2.lineHeight} 
                        onChange={v => handleUpdateTokens(['typography', 'h2', 'lineHeight'], v)}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">Body Style</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <NumberInput 
                        label="Size" 
                        value={tokens.typography.body.size} 
                        onChange={v => handleUpdateTokens(['typography', 'body', 'size'], v)}
                        unit="px"
                      />
                      <NumberInput 
                        label="Weight" 
                        value={tokens.typography.body.weight} 
                        onChange={v => handleUpdateTokens(['typography', 'body', 'weight'], v)}
                      />
                      <NumberInput 
                        label="Line Height" 
                        value={tokens.typography.body.lineHeight} 
                        onChange={v => handleUpdateTokens(['typography', 'body', 'lineHeight'], v)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-4">Spacing</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <NumberInput 
                        label="Slide Padding" 
                        value={tokens.spacing.slidePadding} 
                        onChange={v => handleUpdateTokens(['spacing', 'slidePadding'], v)}
                        unit="px"
                      />
                      <NumberInput 
                        label="Gap" 
                        value={tokens.spacing.gap} 
                        onChange={v => handleUpdateTokens(['spacing', 'gap'], v)}
                        unit="px"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">Border Radius</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <NumberInput 
                        label="Card Radius" 
                        value={tokens.radius.card} 
                        onChange={v => handleUpdateTokens(['radius', 'card'], v)}
                        unit="px"
                      />
                      <NumberInput 
                        label="Button Radius" 
                        value={tokens.radius.button} 
                        onChange={v => handleUpdateTokens(['radius', 'button'], v)}
                        unit="px"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-4">Shadow</h3>
                    <div className="space-y-2">
                      <Label className="text-xs text-slate-600">Card Shadow</Label>
                      <Input
                        value={tokens.shadow.card}
                        onChange={e => handleUpdateTokens(['shadow', 'card'], e.target.value)}
                        className="font-mono text-xs"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Live Preview</CardTitle>
              <CardDescription>See how your tokens look</CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="aspect-[16/9] rounded-lg overflow-hidden"
                style={{ 
                  backgroundColor: tokens.colors.bg,
                  padding: tokens.spacing.slidePadding / 4,
                  boxShadow: tokens.shadow.card,
                }}
              >
                <div style={{ 
                  backgroundColor: tokens.colors.surface,
                  borderRadius: tokens.radius.card,
                  padding: tokens.spacing.gap,
                  height: '100%',
                }}>
                  <h1 style={{
                    fontFamily: tokens.fonts.heading,
                    fontSize: tokens.typography.h1.size / 3,
                    fontWeight: tokens.typography.h1.weight,
                    lineHeight: tokens.typography.h1.lineHeight,
                    color: tokens.colors.text,
                    marginBottom: tokens.spacing.gap / 2,
                  }}>
                    NRRO International
                  </h1>
                  <h2 style={{
                    fontFamily: tokens.fonts.heading,
                    fontSize: tokens.typography.h2.size / 3,
                    fontWeight: tokens.typography.h2.weight,
                    lineHeight: tokens.typography.h2.lineHeight,
                    color: tokens.colors.primary,
                    marginBottom: tokens.spacing.gap / 2,
                  }}>
                    Global Advisory
                  </h2>
                  <p style={{
                    fontFamily: tokens.fonts.body,
                    fontSize: tokens.typography.body.size / 3,
                    fontWeight: tokens.typography.body.weight,
                    lineHeight: tokens.typography.body.lineHeight,
                    color: tokens.colors.mutedText,
                  }}>
                    Legal, tax, accounting and payroll services
                  </p>
                  <div 
                    style={{
                      marginTop: tokens.spacing.gap / 2,
                      padding: `${tokens.spacing.gap / 4}px ${tokens.spacing.gap / 2}px`,
                      backgroundColor: tokens.colors.accent,
                      color: tokens.colors.bg,
                      borderRadius: tokens.radius.button,
                      display: 'inline-block',
                      fontSize: 8,
                      fontWeight: 500,
                    }}
                  >
                    Contact Us
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
