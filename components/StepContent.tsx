"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

type StepContentProps = {
  content: string;
  label: string;
  language?: string | null;
};

function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

function formatJSON(str: string): string {
  try {
    const parsed = JSON.parse(str);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return str;
  }
}

export function StepContent({ content, label, language }: StepContentProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Detect if content is JSON
  const isJSON = isValidJSON(content);
  const formattedContent = isJSON ? formatJSON(content) : content;

  // If it's JSON, render as code block
  if (isJSON) {
    return (
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <Badge variant="outline" className="text-xs">
            {label}
          </Badge>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 px-2 text-xs"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
        <div className="relative group">
          <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto border border-slate-700">
            <code>{formattedContent}</code>
          </pre>
        </div>
      </div>
    );
  }

  // Otherwise, render as Markdown
  return (
    <div className="mb-3">
      <Badge variant="outline" className="mb-1 text-xs">
        {label}
      </Badge>
      <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-3 rounded-lg">
        <ReactMarkdown
          components={{
            code({ children, ...props }) {
              const content = String(children).replace(/\n$/, "");
              const hasNewlines = content.includes("\n");

              // Block code
              if (hasNewlines) {
                return (
                  <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto text-xs my-2">
                    <code {...props}>{content}</code>
                  </pre>
                );
              }

              // Inline code
              return (
                <code
                  className="bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded text-xs"
                  {...props}
                >
                  {content}
                </code>
              );
            },
            p: ({ children }) => (
              <p className="text-sm mb-2 last:mb-0">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-sm mb-2 space-y-1">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-sm mb-2 space-y-1">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="text-sm">{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-blue-500 hover:text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
