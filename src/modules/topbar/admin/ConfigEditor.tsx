import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Switch } from '../ui/Switch';
import { Select } from '../ui/Select';
import { TopBarConfig } from '../types';
import { COLOR_PRESETS, ColorPresetKey, FONT_OPTIONS, FONT_SIZE_OPTIONS } from '../utils/defaults';

interface ConfigEditorProps {
  config: TopBarConfig;
  onChange: (config: TopBarConfig) => void;
  onSave: () => Promise<void>;
  isSaving?: boolean;
}

export function ConfigEditor({ config, onChange, onSave, isSaving }: ConfigEditorProps) {
  const handleChange = <K extends keyof TopBarConfig>(field: K, value: TopBarConfig[K]) => {
    onChange({ ...config, [field]: value });
  };

  const applyPreset = (presetKey: ColorPresetKey) => {
    const preset = COLOR_PRESETS[presetKey];
    onChange({
      ...config,
      ...preset,
    });
  };

  return (
    <div className="space-y-6">
      {/* Contact Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone Number</Label>
              <Input
                value={config.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                placeholder="+34 93 000 00 00"
              />
            </div>
            <div>
              <Label>Phone Link</Label>
              <Input
                value={config.phoneLink}
                onChange={(e) => handleChange('phoneLink', e.target.value)}
                placeholder="tel:+34930000000"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={config.showLanguageSelector}
                onCheckedChange={(checked) => handleChange('showLanguageSelector', checked)}
              />
              <Label>Show Language Selector</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={config.showSearch}
                onCheckedChange={(checked) => handleChange('showSearch', checked)}
              />
              <Label>Show Search</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Color Presets */}
          <div>
            <Label className="mb-2 block">Quick Presets</Label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(COLOR_PRESETS).map(([key, preset]) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  style={{
                    backgroundColor: preset.backgroundColor,
                    color: preset.textColor,
                    borderColor: preset.backgroundColor,
                  }}
                  onClick={() => applyPreset(key as ColorPresetKey)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Background Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={config.backgroundColor}
                  onChange={(e) => handleChange('backgroundColor', e.target.value)}
                  placeholder="#0f172a"
                />
              </div>
            </div>
            <div>
              <Label>Text Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={config.textColor.startsWith('rgba') ? '#ffffff' : config.textColor}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={config.textColor}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                  placeholder="rgba(255,255,255,0.7)"
                />
              </div>
            </div>
            <div>
              <Label>Hover Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={config.hoverColor}
                  onChange={(e) => handleChange('hoverColor', e.target.value)}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={config.hoverColor}
                  onChange={(e) => handleChange('hoverColor', e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Font Family</Label>
              <Select
                value={config.fontFamily}
                onValueChange={(value) => handleChange('fontFamily', value)}
                options={FONT_OPTIONS}
                placeholder="Select font..."
              />
            </div>
            <div>
              <Label>Font Size</Label>
              <Select
                value={config.fontSize}
                onValueChange={(value) => handleChange('fontSize', value)}
                options={FONT_SIZE_OPTIONS}
                placeholder="Select size..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={onSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>
    </div>
  );
}
