import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";

interface ChatMarkdownRendererProps {
  content: string;
}

export function ChatMarkdownRenderer({ content }: ChatMarkdownRendererProps) {
  return (
    <div className="prose prose-sm max-w-none text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Tables
          table: ({ children }) => (
            <div className="my-2 overflow-x-auto">
              <table className="min-w-full text-xs border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-2 py-1 text-left font-medium border-b border-border">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-2 py-1 border-b border-border/50">{children}</td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-muted/30">{children}</tr>
          ),
          
          // Lists
          ul: ({ children }) => (
            <ul className="my-1 ml-4 list-disc space-y-0.5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-1 ml-4 list-decimal space-y-0.5">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm">{children}</li>
          ),
          
          // Emphasis
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          
          // Links - handle internal vs external
          a: ({ href, children }) => {
            if (href?.startsWith("/")) {
              return (
                <Link
                  to={href}
                  className="text-primary underline hover:text-primary/80"
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary/80"
              >
                {children}
              </a>
            );
          },
          
          // Paragraphs
          p: ({ children }) => (
            <p className="my-1 leading-relaxed">{children}</p>
          ),
          
          // Headings (scaled down for chat)
          h1: ({ children }) => (
            <h4 className="font-medium text-sm mt-2 mb-1">{children}</h4>
          ),
          h2: ({ children }) => (
            <h5 className="font-medium text-sm mt-2 mb-1">{children}</h5>
          ),
          h3: ({ children }) => (
            <h6 className="font-medium text-sm mt-1 mb-0.5">{children}</h6>
          ),
          
          // Code blocks
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1 py-0.5 bg-muted rounded text-xs font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block p-2 bg-muted rounded text-xs font-mono overflow-x-auto">
                {children}
              </code>
            );
          },
          
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary/30 pl-2 my-1 text-muted-foreground italic">
              {children}
            </blockquote>
          ),
          
          // Horizontal rule
          hr: () => <hr className="my-2 border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
