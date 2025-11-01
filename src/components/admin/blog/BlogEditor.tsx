import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Link, List, ListOrdered, Image, Quote } from "lucide-react";
import DOMPurify from "dompurify";

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const BlogEditor = ({ value, onChange, label = "Contenido" }: BlogEditorProps) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const insertAtCursor = (before: string, after: string = "") => {
    const textarea = document.getElementById("blog-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, label: "Negrita", before: "<strong>", after: "</strong>" },
    { icon: Italic, label: "Cursiva", before: "<em>", after: "</em>" },
    { icon: Link, label: "Enlace", before: '<a href="URL">', after: "</a>" },
    { icon: List, label: "Lista", before: "<ul>\n<li>", after: "</li>\n</ul>" },
    { icon: ListOrdered, label: "Lista numerada", before: "<ol>\n<li>", after: "</li>\n</ol>" },
    { icon: Image, label: "Imagen", before: '<img src="URL" alt="Descripción">', after: "" },
    { icon: Quote, label: "Cita", before: "<blockquote>", after: "</blockquote>" },
  ];

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "edit" | "preview")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Editar</TabsTrigger>
          <TabsTrigger value="preview">Vista Previa</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-2">
          <div className="flex flex-wrap gap-1 p-2 border rounded-md bg-muted/50">
            {toolbarButtons.map((btn) => (
              <Button
                key={btn.label}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertAtCursor(btn.before, btn.after)}
                title={btn.label}
              >
                <btn.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
          <Textarea
            id="blog-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Escribe tu contenido HTML aquí..."
            className="min-h-[400px] font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Puedes usar HTML. Etiquetas permitidas: p, br, strong, em, u, h1-h6, ul, ol, li, a, img, blockquote, code, pre
          </p>
        </TabsContent>

        <TabsContent value="preview">
          <div
            className="min-h-[400px] p-4 border rounded-md prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(value, {
                ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre'],
                ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
                ALLOW_DATA_ATTR: false,
              }),
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
