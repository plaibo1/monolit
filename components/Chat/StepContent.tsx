"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Database } from "lucide-react";
import { MarkdownContent } from "./MarkdownContent";
import { CodeBlock } from "./CodeBlock";

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

function extractSQLQuery(str: string): string | null {
  try {
    const parsed = JSON.parse(str);
    if (
      parsed &&
      typeof parsed === "object" &&
      "query" in parsed &&
      typeof parsed.query === "string"
    ) {
      return parsed.query;
    }
    return null;
  } catch {
    return null;
  }
}

export function StepContent({ content, label, language }: StepContentProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sqlQuery = isValidJSON(content) ? extractSQLQuery(content) : null;

  if (sqlQuery) {
    return (
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {label}
            </Badge>
            <Badge
              variant="secondary"
              className="text-xs flex items-center gap-1"
            >
              <Database className="w-3 h-3" />
              SQL Query
            </Badge>
          </div>
        </div>
        <CodeBlock language="sql" value={sqlQuery} showLanguage={false} />
      </div>
    );
  }

  // Detect if content is JSON
  const isJSON = isValidJSON(content);
  const formattedContent = isJSON ? formatJSON(content) : content;

  if (isJSON) {
    return (
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
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
        <CodeBlock
          language="json"
          value={formattedContent}
          showLanguage={false}
        />
      </div>
    );
  }

  return (
    <div className="mb-3">
      <Badge variant="outline" className="mb-2 text-xs">
        {label}
      </Badge>
      <div className="bg-muted/50 p-3 rounded-lg">
        <MarkdownContent content={content} />
      </div>
    </div>
  );
}
