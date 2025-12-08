"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Database } from "lucide-react";
import { MarkdownContent } from "@/components/Chat/MarkdownContent";
import { CodeBlock } from "@/components/Chat/CodeBlock";

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
            typeof parsed.query === "string" &&
            parsed.query.toUpperCase().startsWith("SELECT")
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

    // If content is just a string message without newlines/complexity, render simply
    const isSimpleText = !content.includes("\n") && content.length < 100 && !isValidJSON(content);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sqlQuery = isValidJSON(content) ? extractSQLQuery(content) : null;

    if (sqlQuery) {
        return (
            <div className="mb-2 last:mb-0">
                <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                            {label}
                        </span>
                        <Badge
                            variant="secondary"
                            className="text-[10px] h-5 px-1.5 flex items-center gap-1"
                        >
                            <Database className="w-3 h-3" />
                            SQL
                        </Badge>
                    </div>
                </div>
                <div className="text-xs">
                    <CodeBlock language="sql" value={sqlQuery} showLanguage={false} />
                </div>
            </div>
        );
    }

    // Detect if content is JSON
    const isJSON = isValidJSON(content);
    const formattedContent = isJSON ? formatJSON(content) : content;

    if (isJSON) {
        return (
            <div className="mb-2 last:mb-0">
                {/* <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                        {label}
                    </span>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 px-1.5 text-[10px]"
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
                </div> */}
                <div className="text-xs">
                    <CodeBlock
                        language="json"
                        value={formattedContent}
                        showLanguage={false}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="mb-2 last:mb-0">
            <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {label}
                </span>
                {!isSimpleText && (
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 px-1.5 text-[10px]"
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
                )}
            </div>
            <div className="bg-muted/30 p-2.5 rounded-md text-xs">
                <MarkdownContent content={content} />
            </div>
        </div>
    );
}
