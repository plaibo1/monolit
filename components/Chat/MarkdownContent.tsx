"use client";

import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { CopyButton } from "./MessageBubble/components/CopyButton";
import { FeedbackButtons } from "./MessageBubble/components/FeedbackButtons";

type MarkdownVariant = "default" | "sm";

type MarkdownContentProps = {
  content: string;
  isAgentMessage?: boolean;
  variant?: MarkdownVariant;
};

const styles = {
  default: {
    h1: "text-2xl font-bold mt-4 mb-4 pb-2",
    h2: "text-xl font-semibold mt-5 mb-3 pb-1",
    h3: "text-lg font-semibold mt-4 mb-2",
    p: "leading-relaxed mb-4 last:mb-0",
    ul: "list-disc list-inside space-y-1 my-3",
    ol: "list-inside space-y-1 my-3",
    li: "leading-relaxed",
    blockquote:
      "border-l-4 border-primary/50 pl-4 py-2 my-3 italic bg-muted/50 rounded-r",
    codeInline: "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
    table: "overflow-x-auto my-4",
    th: "bg-muted px-4 py-2 text-left font-semibold",
    td: "px-4 py-2",
    hr: "my-6 border-border",
  },
  sm: {
    h1: "text-lg font-bold mt-2 mb-2 pb-1",
    h2: "text-base font-semibold mt-2 mb-1 pb-1",
    h3: "text-base font-semibold mt-1.5 mb-1",
    p: "leading-relaxed mb-2 last:mb-0 text-xs",
    ul: "list-disc list-inside space-y-0.5 my-1.5 text-xs",
    ol: "list-inside space-y-0.5 my-1.5 text-xs",
    li: "leading-relaxed",
    blockquote:
      "border-l-2 border-primary/50 pl-3 py-1 my-1.5 italic bg-muted/50 rounded-r text-xs",
    codeInline: "bg-muted px-1 py-0.5 rounded text-[10px] font-mono",
    table: "overflow-x-auto my-2",
    th: "bg-muted px-2 py-1 text-left font-semibold text-xs",
    td: "px-2 py-1 text-xs",
    hr: "my-3 border-border",
  },
};

const MarkdownMessageActions = ({ content }: { content: string }) => {
  const { copied, copyToClipboard } = useCopyToClipboard();

  return (
    <div className="my-2 flex items-center gap-1">
      <CopyButton copied={copied} onCopy={() => copyToClipboard(content)} />
      <FeedbackButtons />
    </div>
  );
};

export function MarkdownContent({
  content,
  isAgentMessage,
  variant = "default",
}: MarkdownContentProps) {
  const currentStyles = styles[variant];

  return (
    <div className={cn("markdown-content", variant === "sm" && "text-xs")}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const value = String(children).replace(/\n$/, "");
            const isInline = !className && !value.includes("\n");

            return !isInline ? (
              <CodeBlock language={match?.[1]} value={value} />
            ) : (
              <code className={currentStyles.codeInline} {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className={currentStyles.h1}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={currentStyles.h2}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={currentStyles.h3}>{children}</h3>
          ),
          p: ({ children }) => <p className={currentStyles.p}>{children}</p>,
          ul: ({ children }) => (
            <ul className={currentStyles.ul}>{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className={currentStyles.ol}>{children}</ol>
          ),
          li: ({ children }) => (
            <li className={currentStyles.li}>{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className={currentStyles.blockquote}>
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className={currentStyles.table}>
              <table className="border-collapse rounded-lg overflow-hidden w-full min-w-[600px]">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className={currentStyles.th}>{children}</th>
          ),
          td: ({ children }) => (
            <td className={currentStyles.td}>{children}</td>
          ),
          hr: () => <hr className={currentStyles.hr} />,
        }}
      >
        {content}
      </ReactMarkdown>

      {isAgentMessage && <MarkdownMessageActions content={content} />}
    </div>
  );
}
