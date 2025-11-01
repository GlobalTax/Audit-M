import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';

interface MarkdownEditorProps {
  value?: string;
  onChange: (value?: string) => void;
  height?: number;
  placeholder?: string;
}

export const MarkdownEditor = ({ 
  value, 
  onChange, 
  height = 300,
  placeholder = "Escribe aquí... (soporta Markdown)"
}: MarkdownEditorProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="border rounded-md p-4 min-h-[300px] bg-muted/20 animate-pulse">
        <p className="text-sm text-muted-foreground">Cargando editor...</p>
      </div>
    );
  }

  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={onChange}
        height={height}
        preview="edit"
        hideToolbar={false}
        enableScroll={true}
        textareaProps={{
          placeholder: placeholder,
        }}
        previewOptions={{
          rehypePlugins: [],
        }}
      />
      <p className="text-xs text-muted-foreground mt-2">
        💡 Tip: Usa <strong>**negritas**</strong>, <em>*cursivas*</em>, listas (- item), y saltos de línea para formatear el texto
      </p>
    </div>
  );
};
